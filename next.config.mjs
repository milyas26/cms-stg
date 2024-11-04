import { config } from "dotenv";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();
config();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "waca-prod-cdn.sgp1.cdn.digitaloceanspaces.com",
      "waca-dev-cdn.sgp1.cdn.digitaloceanspaces.com",
    ],
  },
};

export default withNextIntl(nextConfig);
