import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";
import { EnquiryBand, PageHeader, ProductCard } from "@/components/site/Blocks";
import { Button } from "@/components/ui/button";
import { brands } from "@/lib/site";
import { categoryPath, getCategory, lineage, products } from "@/lib/catalog";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/our-brands/$slug")({
  loader: ({ params }) => {
    const b = brands.find((x) => x.slug === params.slug);
    if (!b) throw notFound();
    return { slug: b.slug };
  },
  head: ({ loaderData }) => {
    const b = brands.find((x) => x.slug === loaderData?.slug);
    return { meta: b ? seo(`${b.name} Products`, `${b.name} automation products in the DICS catalogue. ${b.intro.split(".")[0]}.`) : [{ title: "Brand unavailable | DICS" }, { name: "robots", content: "noindex" }] };
  },
  component: BrandPage,
});

function BrandPage() {
  const { slug } = Route.useLoaderData();
  const b = brands.find((x) => x.slug === slug)!;
  const list = products.filter((p) => p.brand === b.catalogName);
  const tops = new Map<string, number>();
  for (const p of list) {
    const c = getCategory(p.categories[0] ?? "");
    if (c) { const t = lineage(c)[0]!; tops.set(t.slug, (tops.get(t.slug) ?? 0) + 1); }
  }
  return (
    <>
      <PageHeader title={b.name} eyebrow={`Manufacturer · ${b.origin}`} intro={b.intro} crumbs={[{ label: "Our Brands", to: "/our-brands" }, { label: b.name }]} />
      <section className="container-site py-12">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {[...tops.entries()].map(([s, n]) => {
              const c = getCategory(s)!;
              return <Link key={s} to="/product-category/$" params={{ _splat: categoryPath(c) }} className="rounded-full border border-border bg-card px-4 py-1.5 text-sm hover:border-primary hover:text-primary">{c.name} <span className="text-muted-foreground">({n})</span></Link>;
            })}
          </div>
          <Button asChild variant="outline"><a href={b.website} target="_blank" rel="noopener noreferrer">Official {b.name} website <ExternalLink /></a></Button>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {list.map((p) => <ProductCard key={p.slug} p={p} />)}
        </div>
        {list.length === 0 && <p className="mt-8 text-muted-foreground">No {b.name} products are listed online yet — please send us your requirement.</p>}
      </section>
      <EnquiryBand />
    </>
  );
}
