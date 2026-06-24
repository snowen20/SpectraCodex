import { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  // PRE-LAUNCH: site is private until go-live. Block all crawlers and do not
  // advertise the sitemap. At go-live, restore `allow: "/"` and the sitemap line.
  return {
    rules: {
      userAgent: "*",
      disallow: "/",
    },
  };
}
