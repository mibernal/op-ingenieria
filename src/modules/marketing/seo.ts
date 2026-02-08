import { SITE_META } from "@/config/seo";

export const landingSeo = {
  title: SITE_META.title,
  description: SITE_META.description,
  path: "/",
  type: "website" as const,
};
