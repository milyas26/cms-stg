"use client";

import { setUserLocale } from "@/helper/locale";
import { Locale } from "@/i18n/config";
import { Image, Switch, Text } from "@mantine/core";
import { useLocale, useTranslations } from "next-intl";
import React, { useTransition } from "react";

const LanguageSwitcher = () => {
  const t = useTranslations("common");
  const locale = useLocale();
  const [isPending, startTransition] = useTransition();

  function onChange(value: any) {
    const locale = value as Locale;
    startTransition(() => {
      setUserLocale(locale);
    });
  }
  return (
    <Switch
      size="lg"
      color="dark"
      labelPosition="left"
      disabled={isPending}
      label={<Text size="md">{t("language")}</Text>}
      checked={locale === "id"}
      onLabel={<Image className="py-2" src={"/logo/english.png"} />}
      offLabel={<Image className="py-2" src={"/logo/indonesia.png"} />}
      onChange={() => onChange(locale === "id" ? "en" : "id")}
    />
  );
};

export default LanguageSwitcher;
