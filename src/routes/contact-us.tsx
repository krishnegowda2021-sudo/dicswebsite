import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { PageHeader } from "@/components/site/Blocks";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { company, offices } from "@/lib/site";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/contact-us")({
  head: () => ({ meta: seo("Contact DICS — Offices Across India", "Contact Digital Instruments & Control Systems. Head office in Peenya, Bangalore, with offices in Chennai, Coimbatore, Lucknow, Belagavi, Mysore, Hyderabad, Mumbai, Pune and more.") }),
  component: Contact,
});

function Contact() {
  return (
    <>
      <PageHeader title="Contact us" eyebrow="Get in touch" crumbs={[{ label: "Contact Us" }]} intro="Discuss your automation requirement, request product information or ask for service support." />
      <section className="container-site grid gap-12 py-16 lg:grid-cols-[1.3fr_1fr]">
        <div className="rounded-lg border border-border bg-card p-6 shadow-card md:p-8">
          <h2 className="text-2xl font-bold">Send us an enquiry</h2>
          <p className="mt-1 text-sm text-muted-foreground">Fields marked * are required.</p>
          <div className="mt-6"><EnquiryForm /></div>
        </div>
        <div className="space-y-6">
          <div className="rounded-lg bg-navy-gradient p-7 text-navy-foreground">
            <h2 className="text-xl font-semibold text-navy-foreground">Head office — Bangalore</h2>
            <ul className="mt-5 grid gap-4 text-sm text-navy-muted">
              <li className="flex gap-3"><MapPin className="h-5 w-5 shrink-0 text-brand" aria-hidden /><a href={company.mapUrl} target="_blank" rel="noopener noreferrer" className="hover:text-navy-foreground">{company.address}</a></li>
              <li className="flex gap-3"><Phone className="h-5 w-5 shrink-0 text-brand" aria-hidden /><span>{company.phones.map((p, i) => <a key={p.href} href={p.href} className="hover:text-navy-foreground">{i > 0 && ", "}{p.label}</a>)}</span></li>
              <li className="flex gap-3"><Mail className="h-5 w-5 shrink-0 text-brand" aria-hidden /><a href={`mailto:${company.email}`} className="hover:text-navy-foreground">{company.email}</a></li>
            </ul>
          </div>
          <iframe title="Map of DICS head office in Peenya, Bangalore" src="https://www.google.com/maps?q=Digital+Instruments+%26+Control+Systems+Peenya+Bengaluru&output=embed" loading="lazy" className="h-64 w-full rounded-lg border border-border" />
        </div>
      </section>
      <section className="bg-tech py-16">
        <div className="container-site">
          <h2 className="text-2xl font-bold">Regional offices</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {offices.slice(1).map((o) => (
              <article key={o.city} className="rounded-lg border border-border bg-card p-6">
                <h3 className="text-lg font-semibold">{o.city}</h3>
                {o.note && <p className="mt-0.5 text-xs text-muted-foreground">{o.note}</p>}
                <p className="mt-3 text-sm text-muted-foreground">{o.address}</p>
                {o.phone && <a href={o.phoneHref} className="mt-3 flex items-center gap-2 text-sm text-navy hover:text-primary"><Phone className="h-4 w-4 text-primary" />{o.phone}</a>}
                <a href={`mailto:${o.email}`} className="mt-1 flex items-center gap-2 text-sm text-navy hover:text-primary"><Mail className="h-4 w-4 text-primary" />{o.email}</a>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
