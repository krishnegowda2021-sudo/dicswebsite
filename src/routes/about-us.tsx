import { createFileRoute } from "@tanstack/react-router";
import { EnquiryBand, PageHeader, SectionHeading } from "@/components/site/Blocks";
import { brands, images, industries } from "@/lib/site";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/about-us")({
  head: () => ({ meta: seo("About DICS — Since 1996", "Founded in 1996 in Bangalore, Digital Instruments & Control Systems supplies automation products and engineering services with a pan-India presence.") }),
  component: About,
});

const milestones = [
  { y: "1996", t: "Founded in Bangalore", d: "DICS is established with its head office in Bangalore. In the same year the company joins hands with Toshiba and opens its Chennai office." },
  { y: "Growth", t: "Global automation brands", d: "DICS associates with OMRON Automation, Fuji Electric, Pro-face, Autonics, CKD, IDEC, Wöhner and PATLITE." },
  { y: "Expansion", t: "Pan-India presence", d: "Offices across major cities including Chennai, Mumbai, Hyderabad, Coimbatore, Pune, Noida, Lucknow and Vizag, with presence in Hubli, Mysore and Pondicherry." },
  { y: "Today", t: "Bangalore facility", d: "Head office in a 20,000 sq ft independently owned manufacturing and test facility in Bangalore." },
];

function About() {
  return (
    <>
      <PageHeader title="About Digital Instruments & Control Systems" eyebrow="About us" crumbs={[{ label: "About Us" }]} intro="For three decades DICS has offered information-driven, high-end products and innovative automation solutions to Indian industry." />
      <section className="container-site grid items-start gap-12 py-16 lg:grid-cols-2">
        <div className="space-y-4 leading-relaxed text-muted-foreground">
          <SectionHeading eyebrow="Our story" title="Engineering-led since 1996" />
          <p className="pt-2">Since its establishment in 1996, DICS has advanced through innovation-driven strategies and a strong commitment to customer satisfaction. Our ability to offer complete, end-to-end automation solutions has helped the company grow into a multidimensional organisation.</p>
          <p>Our head office is based in a 20,000 sq ft independently owned, state-of-the-art manufacturing and test facility in Bangalore. Well-equipped testing stations supported by technology-driven test equipment help us go deep into product-related issues and come out with working solutions.</p>
          <p>Our product service support team works to ensure customers stay connected with us long after commissioning.</p>
        </div>
        <img src={images.controlPanel} alt="Engineer working on an automation control panel" loading="lazy" className="aspect-[4/3] w-full rounded-lg object-cover shadow-lift" />
      </section>
      <section className="bg-tech py-16">
        <div className="container-site">
          <SectionHeading eyebrow="Milestones" title="How DICS grew" />
          <ol className="mt-10 grid gap-6 md:grid-cols-4">
            {milestones.map((m) => (
              <li key={m.t} className="border-t-2 border-primary bg-card p-6 shadow-card">
                <p className="font-mono text-sm text-primary">{m.y}</p>
                <h3 className="mt-2 text-lg font-semibold">{m.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{m.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section className="container-site grid gap-6 py-16 md:grid-cols-3">
        {[
          { t: "Our mission", d: "To build lasting partnerships by understanding each client's challenges and operational goals, and delivering exceptional service backed by high-quality, technologically advanced automation solutions." },
          { t: "Our vision", d: "To set the benchmark in the design, development and implementation of industrial automation systems, delivering innovative, energy-efficient solutions." },
          { t: "Our values", d: "Integrity, responsibility, excellence, pioneering spirit and unity — fair and transparent conduct, high standards and collaborative relationships built on trust." },
        ].map((x) => (
          <div key={x.t} className="rounded-lg border border-border bg-card p-7">
            <h2 className="text-xl font-semibold">{x.t}</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{x.d}</p>
          </div>
        ))}
      </section>
      <section className="container-site pb-16">
        <div className="grid gap-8 rounded-lg bg-navy-gradient p-8 text-navy-foreground md:grid-cols-2 md:p-12">
          <div>
            <h2 className="text-2xl font-bold text-navy-foreground">Brands we work with</h2>
            <p className="mt-3 text-navy-muted">{brands.map((b) => b.name).join(" · ")}</p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-navy-foreground">Sectors we serve</h2>
            <p className="mt-3 text-navy-muted">{industries.map((i) => i.name).join(" · ")}</p>
          </div>
        </div>
      </section>
      <EnquiryBand />
    </>
  );
}
