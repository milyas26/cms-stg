import { BannerTypeEnum } from "@/features/banner/data/enums/banner.enum";
import { IRequestAddBanner } from "@/features/banner/data/interfaces/banner.interfaces";
import { Banner } from "@/features/banner/domain/entities/Banner";
import useBanner from "@/features/banner/hooks/useBanner";
import { Search } from "@/features/search/domain/entities/Search";
import useSearch from "@/features/search/hooks/useSearch";
import {
  Box,
  Button,
  Combobox,
  Group,
  Image,
  Loader,
  Modal,
  Select,
  TextInput,
  useCombobox,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDebouncedCallback } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { zodResolver } from "mantine-form-zod-resolver";
import React from "react";
import { z } from "zod";

interface IModalBannerProps {
  isOpenModal: boolean;
  closeModal: () => void;
  length?: number;
  selectedBanner: Banner | null;
  setSelectedBanner: (banner: Banner | null) => void;
}

const ModalBanner = ({
  isOpenModal,
  closeModal,
  length,
  selectedBanner,
  setSelectedBanner,
}: IModalBannerProps) => {
  const { handleSearch } = useSearch();
  const {
    getExtra,
    getTargetUrl,
    handleUploadBanner,
    handleCreateBanner,
    loading: loadingCreate,
  } = useBanner();
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState<Search | null>(null);
  const [value, setValue] = React.useState("");
  const [selectedType, setSelectedType] = React.useState<BannerTypeEnum>(
    BannerTypeEnum.BANNER_POST
  );
  const [selectedCombo, setSelectedCombo] = React.useState(null);
  const [urlBanner, setUrlBanner] = React.useState("");

  const schema = z.object({
    position: z.number().int().min(0, "Posisi waajib diisi"),
    targetType: z.string().nonempty("Tipe Banner wajib diisi"),
    bannerUrl: z.string().optional(),
    targetUrl: z.string().optional(),
  });

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      position: 0,
      targetType: BannerTypeEnum.BANNER_POST,
      bannerUrl: "",
      targetUrl: "",
    },
    validate: zodResolver(schema),
  });

  const handleSubmit = async (values: z.infer<typeof schema>) => {
    if (
      !selectedCombo &&
      (selectedType === BannerTypeEnum.BANNER_USER ||
        selectedType === BannerTypeEnum.BANNER_POST)
    ) {
      notifications.show({
        title: "Error",
        message: "Please select a post or user",
        color: "red",
      });
      return;
    }

    if (!values.bannerUrl) {
      notifications.show({
        title: "Error",
        message: "Please upload a banner",
        color: "red",
      });
      return;
    }

    const extra = getExtra(selectedType, selectedCombo, values);
    const targetUrl = getTargetUrl(selectedType, selectedCombo, values);

    const payload: IRequestAddBanner = {
      position: values.position,
      bannerUrl: values.bannerUrl || "",
      extra: extra,
      targetType: values.targetType,
      targetUrl: targetUrl,
    };

    handleCreateBanner(payload, handleCloseModal);
  };

  const bannerTypes = [
    {
      label: "Post",
      value: BannerTypeEnum.BANNER_POST,
    },
    {
      label: "User",
      value: BannerTypeEnum.BANNER_USER,
    },
    {
      label: "External Link",
      value: BannerTypeEnum.BANNER_EXTERNAL_LINK,
    },
    {
      label: "Top Up",
      value: BannerTypeEnum.BANNER_TOP_UP,
    },
  ];

  const fetchOptions = (query: string) => {
    setLoading(true);
    handleSearch(query)
      .then((result) => {
        setData(result as Search);
        setLoading(false);
      })
      .catch(() => {});
  };

  const optionPost = (data?.post || []).map((item) => (
    <Combobox.Option
      value={`${item.title} - ${item.author.username}`}
      key={item._id}
    >
      {item.title} - {item.author.username}
    </Combobox.Option>
  ));

  const optionUser = (data?.users || []).map((item) => (
    <Combobox.Option
      value={`${item.username} - ${item.fullName}`}
      key={item._id}
    >
      {item.username} - {item.fullName}
    </Combobox.Option>
  ));

  const handleSearchDebounce = useDebouncedCallback(async (query: string) => {
    await fetchOptions(query);
  }, 200);

  React.useEffect(() => {
    if (length && isOpenModal) {
      form.setFieldValue("position", length);
    }

    if (selectedBanner && isOpenModal) {
      form.setFieldValue("position", selectedBanner.position);
      form.setFieldValue(
        "targetType",
        selectedBanner.targetType as BannerTypeEnum
      );
      form.setFieldValue("bannerUrl", selectedBanner.bannerUrl);
      form.setFieldValue("targetUrl", selectedBanner.targetUrl);
      setSelectedType(selectedBanner.targetType as BannerTypeEnum);
      setUrlBanner(selectedBanner.bannerUrl);
    }
  }, [isOpenModal]);

  form.watch("targetType", (state) => {
    setSelectedType(state.value as BannerTypeEnum);
    setData(new Search([], []));
  });

  const handleCloseModal = () => {
    setSelectedBanner(null);
    setUrlBanner("");
    setData(null);
    setValue("");
    setSelectedType(BannerTypeEnum.BANNER_POST);
    form.reset();
    closeModal();
  };

  const uploadBanner = async (file: File) => {
    try {
      const response = await handleUploadBanner(file);
      if (!response) return;
      form.setFieldValue("bannerUrl", response.result);
      setUrlBanner(response.result);
    } catch (error) {
    }
  };

  return (
    <Modal
      opened={isOpenModal}
      onClose={handleCloseModal}
      withCloseButton={false}
      centered
      size="lg"
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Box className="space-y-4">
          <Image
            src={urlBanner}
            alt="banner"
            w="100%"
            fallbackSrc="https://placehold.co/300x120?text=Select+Banner+Image"
          />
          <input
            type="file"
            accept="image/*"
            disabled={loading || loadingCreate}
            onChange={(e) => {
              if (!e.target.files) return;
              const file = e.target.files[0];
              uploadBanner(file);
            }}
          />
          <TextInput
            placeholder="Masukkan Posisi Banner"
            label="Position"
            withAsterisk
            key={form.key("position")}
            disabled={loading || loadingCreate}
            {...form.getInputProps("position")}
          />
          <Select
            label="Type Target"
            placeholder="Pilih tipe banner"
            withAsterisk
            data={bannerTypes}
            disabled={loading || loadingCreate}
            key={form.key("targetType")}
            {...form.getInputProps("targetType")}
          />

          {(selectedType === BannerTypeEnum.BANNER_POST ||
            selectedType === BannerTypeEnum.BANNER_USER) && (
            <Combobox
              onOptionSubmit={(optionValue) => {
                setValue(optionValue);
                if (data && selectedType === BannerTypeEnum.BANNER_POST) {
                  setSelectedCombo(
                    data.post.find(
                      (item) => item.title === optionValue.split(" - ")[0]
                    ) as any
                  );
                } else if (
                  data &&
                  selectedType === BannerTypeEnum.BANNER_USER
                ) {
                  setSelectedCombo(
                    data.users.find(
                      (item) => item.username === optionValue.split(" - ")[0]
                    ) as any
                  );
                }
                combobox.resetSelectedOption();
                combobox.closeDropdown();
              }}
              withinPortal={true}
              store={combobox}
            >
              <Combobox.Target>
                <TextInput
                  label={
                    selectedType === BannerTypeEnum.BANNER_POST
                      ? "Post"
                      : "User"
                  }
                  withAsterisk
                  placeholder={
                    selectedType === BannerTypeEnum.BANNER_POST
                      ? "Cari Post"
                      : "Cari User"
                  }
                  value={value}
                  onChange={(event) => {
                    setValue(event.currentTarget.value);
                    handleSearchDebounce(event.currentTarget.value);
                  }}
                  onClick={() => combobox.openDropdown()}
                  onBlur={() => combobox.closeDropdown()}
                  rightSection={loading && <Loader size={18} />}
                />
              </Combobox.Target>

              <Combobox.Dropdown
                hidden={!data}
                mah={200}
                style={{ overflowY: "auto" }}
              >
                <Combobox.Options>
                  {selectedType === BannerTypeEnum.BANNER_POST
                    ? optionPost
                    : optionUser}
                  {((selectedType === BannerTypeEnum.BANNER_POST &&
                    !data?.post?.length) ||
                    (selectedType === BannerTypeEnum.BANNER_USER &&
                      !data?.users?.length)) && (
                    <Combobox.Empty>No results found</Combobox.Empty>
                  )}
                </Combobox.Options>
              </Combobox.Dropdown>
            </Combobox>
          )}

          {selectedType === BannerTypeEnum.BANNER_EXTERNAL_LINK && (
            <TextInput
              placeholder="Masukkan URL Banner"
              label="Banner URL"
              withAsterisk
              key={form.key("targetUrl")}
              disabled={loading || loadingCreate}
              {...form.getInputProps("targetUrl")}
            />
          )}

          <Group justify="flex-end" align="center" gap="sm">
            <Button
              variant="outline"
              color="rgb(11, 25, 44)"
              radius="xl"
              loading={loading || loadingCreate}
              disabled={loading || loadingCreate}
              onClick={handleCloseModal}
            >
              Cancel
            </Button>
            <Button
              variant="filled"
              color="rgb(11, 25, 44)"
              radius="xl"
              loading={loading || loadingCreate}
              disabled={loading || loadingCreate}
              type="submit"
            >
              Create
            </Button>
          </Group>
        </Box>
      </form>
    </Modal>
  );
};

export default ModalBanner;
