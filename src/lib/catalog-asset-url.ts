/** Keep CDN pointers untouched; external hosts do not serve Lovable's asset path. */
const catalogAssetOrigin = "https://pixel-perfect-check-16.lovable.app";

export function catalogAssetUrl(asset: { url: string; project_id?: string }): string {
  const origin = asset.project_id === "1bcddb37-0963-4a5a-a225-2abfb0511f45"
    ? "https://id-preview--1bcddb37-0963-4a5a-a225-2abfb0511f45.lovable.app"
    : catalogAssetOrigin;
  return new URL(asset.url, origin).href;
}