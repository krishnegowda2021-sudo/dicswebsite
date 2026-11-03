import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/Blocks";
import { brands } from "@/lib/site";
import { seo } from "@/lib/seo";
import { BrandLogo } from "@/components/site/BrandLogo";

export const Route = createFileRoute("/our-brands/")({
  head: () => ({ meta: seo("Our Brands", "Automation manufacturers DICS is associated with: OMRON, Fuji Electric, Pro-face, Autonics, CKD, IDEC, Wöhner and PATLITE.") }),
  component: BrandsPage,
});

function BrandsPage() {
  return (
    <>
      <PageHeader title="Our brands" eyebrow="Technology brands" crumbs={[{ label: "Our Brands" }]} intro="Over the years DICS has associated with leading names in automation. Explore each manufacturer's products in our catalogue." />
      <section className="container-site grid gap-5 py-16 sm:grid-cols-2 lg:grid-cols-4">
        {brands.map((b) => (
            <Link key={b.slug} to="/our-brands/$slug" params={{ slug: b.slug }} className="group flex h-24 items-center justify-center rounded-lg border border-border bg-card p-4 transition-shadow hover:border-primary hover:shadow-lift">
              <BrandLogo brand={b} />
            </Link>
        ))}
      </section>
    </>
  );
}
