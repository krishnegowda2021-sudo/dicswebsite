import { createFileRoute } from "@tanstack/react-router";
import { Factory } from "lucide-react";
import { EnquiryBand, PageHeader } from "@/components/site/Blocks";
import { industries } from "@/lib/site";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/industries")({
  head: () => ({ meta: seo("Industries Served", "DICS serves automobile, food & pharma, material handling, printing & packaging, hoist & crane, power, solar, textile, steel, semiconductor and elevator sectors.") }),
  component: IndustriesPage,
});

function IndustriesPage() {
  return (
    <>
      <PageHeader title="Industries served" eyebrow="Sectors" crumbs={[{ label: "Industries" }]} intro="Prominent sectors DICS continues to serve include automobile, food & pharma, material handling, printing & packaging, hoist & crane, power, solar, textile, steel, semiconductor and elevator." />
      <section className="container-site grid gap-6 py-16 md:grid-cols-2">
        {industries.map((i) => (
          <article id={i.slug} key={i.slug} className="flex scroll-mt-40 overflow-hidden rounded-lg border border-border bg-card shadow-card">
            {i.image ? (
              <img src={i.image} alt={`${i.name} production environment`} loading="lazy" className="w-2/5 shrink-0 object-cover" />
            ) : (
              <div className="grid w-2/5 shrink-0 place-items-center bg-navy-gradient"><Factory className="h-10 w-10 text-brand" aria-hidden /></div>
            )}
            <div className="p-6">
              <h2 className="text-xl font-semibold">{i.name}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{i.text}</p>
            </div>
          </article>
        ))}
      </section>
      <EnquiryBand />
    </>
  );
}
