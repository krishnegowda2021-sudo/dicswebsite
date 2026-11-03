import { describe, expect, it } from "vitest";
import { catalogAssetUrl } from "@/lib/catalog-asset-url";
import { categoryPresentation } from "@/lib/catalog-presentation";
import { productImages } from "@/lib/catalog-product-images";

describe("Catalog images on external hosting", () => {
  it("resolves Lovable asset paths to their public image host instead of Vercel", () => {
    expect(catalogAssetUrl({ url: "/__l5e/assets-v1/example/photo.jpg" })).toBe(
      "https://pixel-perfect-check-16.lovable.app/__l5e/assets-v1/example/photo.jpg",
    );
  });

  it("keeps existing absolute image URLs unchanged", () => {
    expect(catalogAssetUrl({ url: "https://example.com/photo.jpg" })).toBe("https://example.com/photo.jpg");
  });

  it("uses externally reachable URLs for all corrected product and category photos", () => {
    const images = [...Object.values(productImages), ...Object.values(categoryPresentation).flatMap((c) => c.image ? [c.image] : [])];
    expect(images).toHaveLength(29);
    for (const image of images) {
      expect(new URL(image).origin).toBe("https://pixel-perfect-check-16.lovable.app");
      expect(new URL(image).pathname.startsWith("/__l5e/assets-v1/")).toBe(true);
    }
  });
});