import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { EnquiryBand, PageHeader } from "@/components/site/Blocks";
import { images, services } from "@/lib/site";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/services/")({
  head: () => ({ meta: seo("Automation Engineering Services", "PLC, HMI, VFD, servo, robotics, SMPS and factory automation services from DICS — design, programming, commissioning, retrofits and lifecycle support.") }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <>
      <PageHeader title="Engineering & service capabilities" eyebrow="Services" crumbs={[{ label: "Services" }]} intro="With over two decades of domain expertise, DICS designs, engineers and implements control architectures — PLC automation, SCADA, HMI, motion control and process instrumentation." />
      <section className="container-site grid gap-12 py-16 lg:grid-cols-[1fr_1.3fr]">
        <div className="space-y-4 leading-relaxed text-muted-foreground">
          <img src={images.controlPanel} alt="Engineer programming a control panel" loading="lazy" className="mb-6 aspect-[4/3] w-full rounded-lg object-cover" />
          <p>Founded in 1996 in Bangalore, DICS was established to address the increasing demand for robust automation and control solutions within manufacturing and process industries.</p>
          <p>From system retrofits to greenfield automation deployments, we provide end-to-end project execution — encompassing electrical design, panel fabrication, software development, field commissioning and lifecycle support.</p>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2">
          {services.map((s) => (
            <li key={s.slug}>
              <Link to="/services/$slug" params={{ slug: s.slug }} className="group flex h-full flex-col rounded-lg border border-border bg-card p-6 transition-shadow hover:shadow-lift">
                <h2 className="text-lg font-semibold group-hover:text-primary">{s.title}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{s.short}</p>
                <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-primary">Details <ArrowRight className="h-4 w-4" /></span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <EnquiryBand />
    </>
  );
}
