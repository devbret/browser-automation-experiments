import { writeFileSync } from "fs";

export async function extractSEOMetadata(page) {
  const seoMeta = await page.evaluate(() => {
    return {
      title: document.title,
      description: document.querySelector("meta[name='description']")?.content,
      canonical: document.querySelector("link[rel='canonical']")?.href,
      robots: document.querySelector("meta[name='robots']")?.content,
    };
  });

  writeFileSync(
    "audit-results/seo-meta.json",
    JSON.stringify(seoMeta, null, 2)
  );
}
