import { copyFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { distAssetsDir, sourceAssetsDir } from "./constants.mjs";
import { fileExists } from "./utils.mjs";

// Copies local OG image assets into dist and normalizes image URLs for metadata.
export const createOgAssetManager = ({ siteUrl, defaultOgImage }) => {
  const ogAssetRoutes = new Set();

  const prepareOgAssets = async (seoRoutes) => {
    const routeImages = seoRoutes
      .map((route) => route.image)
      .filter((image) => typeof image === "string" && image.startsWith("/assets/"));

    await Promise.all(
      [...new Set(routeImages)].map(async (imagePath) => {
        const filename = imagePath.replace(/^\/assets\//, "");
        const sourceFile = path.join(sourceAssetsDir, filename);
        const outputFile = path.join(distAssetsDir, filename);

        if (await fileExists(sourceFile)) {
          await mkdir(path.dirname(outputFile), { recursive: true });
          await copyFile(sourceFile, outputFile);
          ogAssetRoutes.add(imagePath);
          return;
        }

        if (await fileExists(outputFile)) {
          ogAssetRoutes.add(imagePath);
        }
      })
    );
  };

  const cleanImageUrl = (image) => {
    const imagePath =
      image && (!image.startsWith("/assets/") || ogAssetRoutes.has(image)) ? image : defaultOgImage;
    return imagePath.startsWith("http") ? imagePath : `${siteUrl}${imagePath}`;
  };

  return { prepareOgAssets, cleanImageUrl };
};
