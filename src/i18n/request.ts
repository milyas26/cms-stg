import { getUserLocale } from "@/helper/locale";
import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async () => {
  // Provide a static locale, fetch a user setting,
  // read from `cookies()`, `headers()`, etc.
  const locale = await getUserLocale();
  // const locale = "id";

  return {
    locale,
    messages: {
      ...(await import(`../locales/${locale}/common.json`)).default,
      ...(await import(`../locales/${locale}/post.json`)).default,
      ...(await import(`../locales/${locale}/aini.json`)).default,
      ...(await import(`../locales/${locale}/auth.json`)).default,
      ...(await import(`../locales/${locale}/ebook.json`)).default,
      ...(await import(`../locales/${locale}/acquisition.json`)).default,
    },
  };
});
