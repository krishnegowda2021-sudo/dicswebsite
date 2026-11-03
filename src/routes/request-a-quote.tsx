import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import { PageHeader, ProductImage } from "@/components/site/Blocks";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { getProduct } from "@/lib/catalog";
import { company } from "@/lib/site";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/request-a-quote")({
  validateSearch: z.object({ product: z.string().optional().catch(undefined) }),
  head: () => ({ meta: seo("Request a Quote", "Request a quotation for industrial automation products or engineering services from DICS. Share model numbers, quantities and application details.") }),
  component: Quote,
});

function Quote() {
  const { product } = Route.useSearch();
  const p = product ? getProduct(product) : undefined;
  const name = p ? `${p.brand ?? ""} ${p.name}`.trim() : undefined;
  return (
    <>
      <PageHeader title="Request a quote" eyebrow="Enquiry" crumbs={[{ label: "Request a Quote" }]} intro="Tell us what you need — model numbers, quantities, application or drawings. Our team will respond with pricing and availability." />
      <section className="container-site grid gap-10 py-16 lg:grid-cols-[1.4fr_1fr]">
        <div className="rounded-lg border border-border bg-card p-6 shadow-card md:p-8">
          <EnquiryForm kind={p ? "product" : "quote"} productSlug={p?.slug} productName={name} />
        </div>
        <aside className="space-y-5">
          {p && (
            <div className="flex gap-4 rounded-lg border border-border bg-card p-4">
              <ProductImage src={p.images[0]} alt={name!} className="h-20 w-20 shrink-0" />
              <div>
                <p className="font-mono text-xs uppercase text-primary">{p.brand}</p>
                <Link to="/product/$slug" params={{ slug: p.slug }} className="font-semibold text-navy hover:text-primary">{p.name}</Link>
              </div>
            </div>
          )}
          <div className="rounded-lg bg-tech p-6 text-sm leading-relaxed text-muted-foreground">
            <h2 className="text-lg font-semibold">Prefer to call?</h2>
            <p className="mt-2">Bangalore head office: {company.phones.map((x, i) => <a key={x.href} href={x.href} className="font-medium text-primary">{i > 0 && ", "}{x.label}</a>)}</p>
            <p className="mt-1">Email: <a href={`mailto:${company.email}`} className="font-medium text-primary">{company.email}</a></p>
            <p className="mt-4">Regional office contacts are on the <Link to="/contact-us" className="font-medium text-primary hover:underline">contact page</Link>.</p>
          </div>
        </aside>
      </section>
    </>
  );
}
