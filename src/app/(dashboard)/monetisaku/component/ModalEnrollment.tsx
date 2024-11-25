import CoverImage from "@/components/CoverImage";
import {
  getColorMonetisaku,
  IEnrollmentActionType,
  ProccessStatusEnum,
  ProccessStatusEnumLabel,
} from "@/features/monetisaku/data/enums/monetisaku.enums";
import { Enrollment } from "@/features/monetisaku/domain/entities/Enrollment";
import useEnrollment from "@/features/monetisaku/hooks/useEnrollment";
import { dateTimeFormat } from "@/utils/commonUtils";
import {
  Badge,
  Box,
  Button,
  Grid,
  Group,
  Modal,
  Text,
  Textarea,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { Bookmark, Eye, Heart, Share2, User } from "lucide-react";
import { zodResolver } from "mantine-form-zod-resolver";
import React from "react";
import { z } from "zod";

interface IModalEnrollmentProps {
  isOpenModal: boolean;
  closeModal: () => void;
  loading: boolean;
  enrollment: Enrollment;
}

enum ReasonValues {
  REJECT = `Sayang sekali, karya kamu belum memenuhi syarat untuk monetisasi. Pastikan karyamu sudah sesuai dengan semua ketentuan monetisasi kami, ya! Semangat terus!`,
  APPROVE = `Wah, selamat banget! Karya kamu udah resmi dimonetisasi di Wacaku. Ini bukti kalau tulisan kamu emang keren banget! Ayo, jangan berhenti sampai di sini. Lanjutkan dengan karya baru yang lebih seru dan menarik. Ide-ide keren kamu pasti bakal bikin pembaca terus penasaran.  Wacaku selalu dukung kamu, jadi semangat terus ya! Keep writing and keep inspiring!`,
}

const ModalEnrollment = ({
  isOpenModal,
  closeModal,
  loading,
  enrollment,
}: IModalEnrollmentProps) => {
  const [type, setType] = React.useState<IEnrollmentActionType>(
    IEnrollmentActionType.INITIAL
  );
  const { handleDecideEnrollment, loading: enrollmentLoading } =
    useEnrollment();
  const schema = z.object({
    reason: z.string().nonempty("Reason is required"),
  });

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      reason: enrollment.reason,
    },
    validate: zodResolver(schema),
  });

  const handleSubmit = async (
    values: z.infer<typeof schema>,
    type: IEnrollmentActionType,
    handleCloseModal: () => void
  ) => {
    handleDecideEnrollment(
      enrollment._id,
      type,
      values.reason,
      handleCloseModal
    );
  };

  const handleCloseModal = () => {
    closeModal();
    form.reset();
    setType(IEnrollmentActionType.INITIAL);
  };

  const isProcessed =
    enrollment.status === ProccessStatusEnum.APPROVED ||
    enrollment.status === ProccessStatusEnum.REJECTED;

  React.useEffect(() => {
    if (isOpenModal) {
      form.setValues({ reason: enrollment.reason });
    }
  }, [isOpenModal]);
  return (
    <Modal
      opened={isOpenModal}
      onClose={handleCloseModal}
      withCloseButton={false}
      centered
      size="55rem"
    >
      <Box className="space-y-4">
        <Group align="start">
          <CoverImage
            data={{
              coverImage: enrollment.post?.coverImage,
              title: enrollment.post?.title,
              coverCustom: enrollment.post?.coverCustom as any,
            }}
          />
          <Box className="space-y-4 flex-1">
            <Box>
              <Text fw={600} size="lg">
                {enrollment.post?.title}
              </Text>
              <Group gap="xs">
                <User size={16} color="gray" />
                <Text c="dimmed" fw={500} size="sm">
                  {enrollment.user?.fullName}
                </Text>
              </Group>
            </Box>
            <Grid>
              <Grid.Col span={6} className="space-y-2">
                <Box>
                  <Text fw={600} size="sm">
                    Status:
                  </Text>
                  <Badge
                    variant="light"
                    color={getColorMonetisaku(enrollment.status)}
                    size="md"
                    radius="sm"
                  >
                    {
                      ProccessStatusEnumLabel[
                        (enrollment.status as ProccessStatusEnum) ??
                          ProccessStatusEnum.PENDING
                      ]
                    }
                  </Badge>
                </Box>
                <Box>
                  <Text fw={600} size="sm">
                    Applied at:
                  </Text>
                  <Text size="sm">{dateTimeFormat(enrollment.createdAt)}</Text>
                </Box>
                {isProcessed && (
                  <>
                    <Box>
                      <Text fw={600} size="sm">
                        Processed at:
                      </Text>
                      <Text size="sm">
                        {dateTimeFormat(enrollment.updatedAt)}
                      </Text>
                    </Box>
                    <Box>
                      <Text fw={600} size="sm">
                        Processed by:
                      </Text>
                      <Text>{enrollment.approverEmail ?? "-"}</Text>
                    </Box>
                  </>
                )}
              </Grid.Col>
              <Grid.Col span={6} className="space-y-2">
                <Box className="space-y-1">
                  <Text fw={600} size="sm">
                    Points:
                  </Text>
                  <Group gap="xs">
                    <Heart size={18} color="red" />
                    <Text size="sm">{enrollment.post?.likes} Likes</Text>
                  </Group>
                  <Group gap="xs">
                    <Eye size={18} />
                    <Text size="sm">{enrollment.post?.views} Views</Text>
                  </Group>
                  <Group gap="xs">
                    <Share2 size={18} color="orange" />
                    <Text size="sm">{enrollment.post?.share} Shares</Text>
                  </Group>
                  <Group gap="xs">
                    <Bookmark size={18} color="green" />
                    <Text size="sm">
                      {enrollment.post?.bookmarks} Bookmarks
                    </Text>
                  </Group>
                </Box>
              </Grid.Col>
            </Grid>
          </Box>
        </Group>
        {(isProcessed || type !== IEnrollmentActionType.INITIAL) && (
          <Textarea
            label="Reason"
            placeholder="Your reason here"
            rows={5}
            disabled={isProcessed || enrollmentLoading}
            key={form.key("reason")}
            {...form.getInputProps("reason")}
          />
        )}
        <Group justify="flex-end" align="center" gap="xs">
          <Button
            variant="outline"
            color="rgb(11, 25, 44)"
            radius="xl"
            loading={loading || enrollmentLoading}
            disabled={loading || enrollmentLoading}
            onClick={handleCloseModal}
          >
            Close
          </Button>
          {!isProcessed && (
            <>
              {type === IEnrollmentActionType.INITIAL ? (
                <>
                  <Button
                    variant="filled"
                    color="red"
                    radius="xl"
                    loading={loading || enrollmentLoading}
                    disabled={loading || enrollmentLoading}
                    type="button"
                    onClick={() => {
                      setType(IEnrollmentActionType.REJECT);
                      form.setValues({ reason: ReasonValues.REJECT });
                    }}
                  >
                    Reject
                  </Button>
                  <Button
                    variant="filled"
                    color="indigo"
                    radius="xl"
                    loading={loading || enrollmentLoading}
                    disabled={loading || enrollmentLoading}
                    type="button"
                    onClick={() => {
                      setType(IEnrollmentActionType.APPROVE);
                      form.setValues({ reason: ReasonValues.APPROVE });
                    }}
                  >
                    Approve
                  </Button>
                </>
              ) : (
                <Button
                  variant="filled"
                  color="#0B192C"
                  radius="xl"
                  loading={loading || enrollmentLoading}
                  disabled={loading || enrollmentLoading}
                  type="button"
                  onClick={() =>
                    form.onSubmit((values) =>
                      handleSubmit(values, type, handleCloseModal)
                    )()
                  }
                >
                  Confirm
                </Button>
              )}
            </>
          )}
        </Group>
      </Box>
    </Modal>
  );
};

export default ModalEnrollment;
