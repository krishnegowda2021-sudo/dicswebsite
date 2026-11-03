import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Phone } from "lucide-react";
import { Breadcrumbs, ProductCard, ProductImage } from "@/components/site/Blocks";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { brands, company } from "@/lib/site";
import { categoryLabel, categoryPath, getCategory, getProduct, lineage, relatedProducts } from "@/lib/catalog";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/product/$slug")({
  loader: ({ params }) => {
    const p = getProduct(params.slug);
    if (!p) throw notFound();
    return { slug: p.slug };
  },
  head: ({ loaderData }) => {
    const p = loaderData ? getProduct(loaderData.slug) : undefined;
    if (!p) return { meta: [{ title: "Product unavailable | DICS" }, { name: "robots", content: "noindex" }] };
    const cat = getCategory(p.categories[0] ?? "");
    const title = `${p.brand ? p.brand + " " : ""}${p.name}${cat ? " — " + categoryLabel(cat) : ""}`;
    const desc = p.summary || `${p.brand ?? ""} ${p.name} ${cat ? categoryLabel(cat).toLowerCase() : ""} available from DICS, Bangalore. Request a quote for pricing, availability and technical details.`.replace(/\s+/g, " ").trim();
    const img = p.images[0];
    return {
      meta: [
        ...seo(title, desc, { type: "product" }),
        ...(img ? [{ property: "og:image", content: img }, { name: "twitter:image", content: img }] : []),
      ],
      links: [{ rel: "canonical", href: `https://dicsglobal.com/product/${p.slug}/` }],
      scripts: [{
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          name: p.name,
          ...(p.brand ? { brand: { "@type": "Brand", name: p.brand } } : {}),
          ...(img ? { image: p.images } : {}),
          ...(p.sku ? { sku: p.sku } : {}),
          category: cat?.name,
        }),
      }],
    };
  },
  component: ProductPage,
  notFoundComponent: () => (
    <div className="container-site py-24 text-center">
      <h1 className="text-3xl font-bold">Product not found</h1>
      <p className="mt-3 text-muted-foreground">It may have been renamed. Try searching the catalogue.</p>
      <Link to="/products" className="mt-6 inline-block font-semibold text-primary hover:underline">Search products</Link>
    </div>
  ),
});

function ProductPage() {
  const { slug } = Route.useLoaderData();
  const p = getProduct(slug)!;
  const cat = getCategory(p.categories[0] ?? "");
  const chain = cat ? lineage(cat) : [];
  const related = relatedProducts(p, 4);
  const brand = brands.find((b) => b.catalogName === p.brand);
  const [active, setActive] = useState(0);
  const alt = `${p.brand ?? ""} ${p.name}`.trim();

  return (
    <>
      <div className="border-b border-border bg-navy">
        <div className="container-site py-4"><Breadcrumbs crumbs={[{ label: "Products", to: "/products" }, ...chain.map((c) => ({ label: c.name, to: "/product-category/$", params: { _splat: categoryPath(c) } })), { label: p.name }]} /></div>
      </div>
      <section className="container-site grid gap-12 py-12 lg:grid-cols-2">
        <div>
          <div className="aspect-square rounded-lg border border-border bg-card p-8">
            <ProductImage src={p.images[active]} alt={alt} className="h-full w-full" />
          </div>
          {p.images.length > 1 && (
            <div className="mt-3 flex gap-3">
              {p.images.map((src, i) => (
                <button key={src} type="button" onClick={() => setActive(i)} aria-label={`Show image ${i + 1}`} aria-pressed={active === i} className="h-20 w-20 rounded-md border border-border bg-card p-1.5 aria-pressed:border-primary">
                  <img src={src} alt="" loading="lazy" className="h-full w-full object-contain" />
                </button>
              ))}
            </div>
          )}
        </div>
        <div>
          <p className="font-mono text-xs uppercase tracking-wider text-primary">{p.brand ?? "Manufacturer on request"}</p>
          <h1 className="mt-2 text-3xl font-bold md:text-4xl">{p.name}</h1>
          <dl className="mt-6 grid grid-cols-[9rem_1fr] gap-y-3 border-y border-border py-5 text-sm">
            <dt className="text-muted-foreground">Manufacturer</dt>
            <dd className="font-medium text-navy">{brand ? <Link to="/our-brands/$slug" params={{ slug: brand.slug }} className="hover:text-primary">{p.brand}</Link> : p.brand ?? "—"}</dd>
            <dt className="text-muted-foreground">Model / series</dt>
            <dd className="font-medium text-navy">{p.name}</dd>
            {cat && (<><dt className="text-muted-foreground">Category</dt><dd><Link to="/product-category/$" params={{ _splat: categoryPath(cat) }} className="font-medium text-navy hover:text-primary">{categoryLabel(cat)}</Link></dd></>)}
            {p.sku && (<><dt className="text-muted-foreground">SKU</dt><dd className="font-medium text-navy">{p.sku}</dd></>)}
          </dl>
          {p.description ? (
            <div className="mt-6 whitespace-pre-line text-sm leading-relaxed text-muted-foreground">{p.description}</div>
          ) : (
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              Detailed specifications and datasheets for this {cat ? categoryLabel(cat).toLowerCase() : "product"} are provided on request. Share your application and required variant, and our engineers will confirm the right model, technical data and availability.
            </p>
          )}
          <div className="mt-8 rounded-lg border border-border bg-tech p-6">
            <h2 className="text-lg font-semibold">Request a quote</h2>
            <p className="mt-1 text-sm text-muted-foreground">Prices and availability are confirmed per enquiry. Or call <a href={company.phones[0]!.href} className="inline-flex items-center gap-1 font-medium text-primary"><Phone className="h-3 w-3" />{company.phones[0]!.label}</a></p>
            <div className="mt-5"><EnquiryForm kind="product" productSlug={p.slug} productName={alt} compact /></div>
          </div>
        </div>
      </section>
      {related.length > 0 && (
        <section className="bg-tech py-16">
          <div className="container-site">
            <h2 className="text-2xl font-bold">Related products</h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{related.map((r) => <ProductCard key={r.slug} p={r} />)}</div>
          </div>
        </section>
      )}
    </>
  );
}
