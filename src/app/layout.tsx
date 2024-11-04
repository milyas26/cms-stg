import type { Metadata } from "next";
import "./globals.css";
import "@mantine/core/styles.css";
import "ckeditor5/ckeditor5.css";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { getUserLocale } from "@/helper/locale";

export const metadata: Metadata = {
  title: "Wacaku CMS",
  description: "Its a content management system for wacaku.com",
  keywords:
    "Wacaku CMS, Writing Platform, Share Stories, Monetize Stories, Creative Writing, Story Creation",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = getUserLocale();
  const messages = await getMessages();
  return (
    <html lang={locale as any}>
      <head>
        <ColorSchemeScript />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <MantineProvider>
          <NextIntlClientProvider messages={messages}>
            {children}
          </NextIntlClientProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
