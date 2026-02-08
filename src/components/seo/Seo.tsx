import { useEffect } from "react";
import { SITE_META } from "@/config/seo";

export type SeoProps = {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
  noIndex?: boolean;
};

const ensureMeta = (attribute: "name" | "property", key: string, content: string) => {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
};

const ensureLink = (rel: string, href: string) => {
  let element = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", rel);
    document.head.appendChild(element);
  }
  element.setAttribute("href", href);
};

export const Seo = ({
  title,
  description = SITE_META.description,
  path = "/",
  image,
  type = "website",
  noIndex = false,
}: SeoProps) => {
  useEffect(() => {
    const resolvedTitle =
      !title || title === SITE_META.title
        ? SITE_META.title
        : SITE_META.titleTemplate.replace("%s", title);

    const resolvedUrl = new URL(path, SITE_META.url).toString();
    const resolvedImage = image ? new URL(image, SITE_META.url).toString() : undefined;

    document.title = resolvedTitle;

    ensureMeta("name", "description", description);
    ensureMeta("property", "og:title", resolvedTitle);
    ensureMeta("property", "og:description", description);
    ensureMeta("property", "og:url", resolvedUrl);
    ensureMeta("property", "og:type", type);
    ensureMeta("property", "og:site_name", SITE_META.title);

    if (resolvedImage) {
      ensureMeta("property", "og:image", resolvedImage);
      ensureMeta("name", "twitter:image", resolvedImage);
    }

    ensureMeta("name", "twitter:card", "summary_large_image");
    ensureMeta("name", "twitter:title", resolvedTitle);
    ensureMeta("name", "twitter:description", description);

    ensureLink("canonical", resolvedUrl);
    ensureMeta("name", "robots", noIndex ? "noindex, nofollow" : "index, follow");
  }, [title, description, path, image, type, noIndex]);

  return null;
};

export default Seo;
