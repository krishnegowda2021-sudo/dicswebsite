export function seo(title: string, description: string, extra: { type?: string } = {}) {
  const full = title.includes("DICS") ? title : `${title} | DICS`;
  return [
    { title: full },
    { name: "description", content: description },
    { property: "og:title", content: full },
    { property: "og:description", content: description },
    { property: "og:type", content: extra.type ?? "website" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: full },
    { name: "twitter:description", content: description },
  ];
}
