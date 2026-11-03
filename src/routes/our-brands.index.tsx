import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/Blocks";
import { brands } from "@/lib/site";
import { products } from "@/lib/catalog";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/our-brands/")({
  head: () => ({ meta: seo("Our Brands", "Automation manufacturers DICS is associated with: OMRON, Fuji Electric, Pro-face, Autonics, CKD, IDEC, Wöhner and PATLITE.") }),
  component: BrandsPage,
});

function BrandsPage() {
  return (
    <>
      <PageHeader title="Our brands" eyebrow="Technology brands" crumbs={[{ label: "Our Brands" }]} intro="Over the years DICS has associated with leading names in automation. Explore each manufacturer's products in our catalogue." />
      <section className="container-site grid gap-5 py-16 sm:grid-cols-2 lg:grid-cols-4">
        {brands.map((b) => {
          const count = products.filter((p) => p.brand === b.catalogName).length;
          return (
            <Link key={b.slug} to="/our-brands/$slug" params={{ slug: b.slug }} className="group flex flex-col rounded-lg border border-border bg-card p-7 transition-shadow hover:shadow-lift">
              <span className="font-display text-3xl font-extrabold tracking-tight text-navy group-hover:text-primary">{b.name}</span>
              <span className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{b.origin}</span>
              <p className="mt-4 line-clamp-3 text-sm text-muted-foreground">{b.intro}</p>
              <span className="mt-auto pt-5 text-sm font-semibold text-primary">{count} products →</span>
            </Link>
          );
        })}
      </section>
    </>
  );
}
