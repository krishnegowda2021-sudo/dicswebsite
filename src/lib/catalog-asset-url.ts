/** Keep CDN pointers untouched; external hosts do not serve Lovable's asset path. */
const catalogAssetOrigin = "https://pixel-perfect-check-16.lovable.app";

export function catalogAssetUrl(asset: { url: string }): string {
  return new URL(asset.url, catalogAssetOrigin).href;
}