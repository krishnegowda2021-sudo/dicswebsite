import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Cable, Cpu, Gauge, MonitorSmartphone, Settings2, Workflow, Wrench, Building2, FlaskConical, Headset, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CategoryCard, EnquiryBand, ProductCard, SectionHeading } from "@/components/site/Blocks";
import { CountUp, Reveal } from "@/components/site/Reveal";
import { brands, featuredCategorySlugs, images, industries, services, company } from "@/lib/site";
import { getCategory, getProduct, productsIn, type Product } from "@/lib/catalog";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: seo(
      "DICS — Industrial Automation Products & Engineering Services, Bangalore",
      "Digital Instruments & Control Systems (DICS), est. 1996: PLCs, HMIs, AC drives, servo systems, sensors, instrumentation and automation engineering services across India.",
    ),
  }),
  component: Home,
});

const featuredProductSlugs = [
  "omron-nx-series-nx1p2-cpu-units-nx1p2",
  "fuji-frenic-mini",
  "omron-smart-camera-fq2",
  "omron-collaborative-robots-tm-series-collaborative-robot-for-assembly-packaging-inspection-and-logistics",
  "autonics-tm-seriesmodular-multi-channel-pid-temperature-controllers",
  "omron-standard-proximity-sensor-e2e-next",
  "omron-multi-function-compact-inverter-3g3mx2-v1",
  "lr6-usb",
];

const solutions = [
  { icon: Cpu, title: "PLC & Controllers", text: "Control logic for machines and process lines — new programs, migrations from obsolete controllers and I/O expansion.", to: "plc-services" },
  { icon: MonitorSmartphone, title: "HMI & SCADA", text: "Operator screens, alarms and supervisory visibility so teams can see and act on process conditions.", to: "hmi-services" },
  { icon: Gauge, title: "VFD & AC Drives", text: "Motor speed control, soft starting and drive commissioning to reduce mechanical stress and support energy-efficient operation.", to: "vfd-services" },
  { icon: Settings2, title: "Motion Control", text: "Servo, stepper and multi-axis systems for positioning, indexing and synchronised motion.", to: "servo-drive-services" },
  { icon: Workflow, title: "System Integration", text: "Electrical design, panel fabrication, software and commissioning delivered as one project.", to: "factory-automation" },
  { icon: Cable, title: "Robotics & Vision", text: "Robot cells and machine vision for handling, assembly and inspection tasks.", to: "robotics" },
];

const stats: { value: number | null; label: string; suffix?: string }[] = [
  { value: null, label: "Established in Bangalore", suffix: "1996" },
  { value: 858, label: "Products in our online catalogue", suffix: "+" },
  { value: 8, label: "Global automation brand associations" },
  { value: 11, label: "Office locations listed across India" },
];

function Home() {
  const featured = featuredProductSlugs.map(getProduct).filter(Boolean) as Product[];
  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-navy-deep">
        <img src={images.heroPlant} alt="Automated production line with robotic arms and a control cabinet" width={1376} height={768} fetchPriority="high" className="animate-kenburns absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-hero-overlay" aria-hidden />
        <div className="container-site py-24 md:py-32 lg:py-40">
          <div className="max-w-2xl">
            <p className="animate-rise font-mono text-xs uppercase tracking-[0.18em] text-brand">Digital Instruments & Control Systems · Since {company.founded}</p>
            <h1 className="animate-rise mt-5 text-4xl font-extrabold leading-[1.05] text-navy-foreground md:text-6xl" style={{ animationDelay: "120ms" }}>
              Intelligent Automation.<br />
              <span className="text-brand">Reliable Industrial Performance.</span>
            </h1>
            <p className="animate-rise mt-6 max-w-xl text-lg leading-relaxed text-navy-muted" style={{ animationDelay: "240ms" }}>
              Discover industrial automation products, control technologies and engineering services that help manufacturers connect processes, improve operational visibility and build dependable production systems.
            </p>
            <div className="animate-rise mt-9 flex flex-wrap gap-3" style={{ animationDelay: "360ms" }}>
              <Button asChild variant="hero" size="xl"><Link to="/products">Explore Our Products <ArrowRight /></Link></Button>
              <Button asChild variant="heroOutline" size="xl"><Link to="/contact-us">Discuss Your Application</Link></Button>
            </div>
          </div>
        </div>
        <div className="border-t border-navy-foreground/10 bg-navy-deep/70 backdrop-blur">
          <div className="container-site grid grid-cols-2 gap-px text-navy-foreground md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="py-6 pr-4">
                <p className="font-display text-2xl font-bold text-brand md:text-3xl">
                  {s.value === null ? s.suffix : <><CountUp value={s.value} />{s.suffix}</>}
                </p>
                <p className="mt-1 text-xs text-navy-muted md:text-sm">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-20 lg:py-28">
        <div className="container-site grid items-center gap-12 lg:grid-cols-2">
          <Reveal className="relative">
            <img src={images.controlPanel} alt="Engineer commissioning a PLC control panel with a laptop" width={1200} height={896} loading="lazy" className="aspect-[4/3] w-full rounded-lg object-cover shadow-lift" />
            <div className="animate-float absolute -bottom-6 -right-4 hidden rounded-lg bg-navy p-6 text-navy-foreground shadow-lift md:block">
              <p className="font-display text-4xl font-bold text-brand">30</p>
              <p className="text-sm text-navy-muted">years in industrial automation</p>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <SectionHeading eyebrow="About DICS" title="An industrial automation partner built on three decades of field experience" />
            <div className="mt-6 space-y-4 leading-relaxed text-muted-foreground">
              <p>Founded in 1996 in Bangalore, Digital Instruments & Control Systems (DICS) was established to meet growing demand for robust automation and control solutions in manufacturing and process industries. The company initially represented Toshiba in India before associating with OMRON, Fuji Electric, Pro-face, Autonics, CKD, IDEC, Wöhner and PATLITE.</p>
              <p>Our head office operates from a 20,000 sq ft facility in Peenya, Bangalore, with manufacturing and testing capability. Alongside product supply, our engineers support PLC, HMI, SCADA, motion control and instrumentation projects — from retrofits to greenfield installations.</p>
            </div>
            <Button asChild variant="navy" size="lg" className="mt-8"><Link to="/about-us">More about DICS <ArrowRight /></Link></Button>
          </Reveal>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-tech py-20 lg:py-28">
        <div className="container-site">
          <Reveal>
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <SectionHeading eyebrow="Product portfolio" title="Product categories" intro="Automation, drives, sensing, power and signalling products from established manufacturers." />
              <Button asChild variant="outline"><Link to="/products">View full catalogue</Link></Button>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {featuredCategorySlugs.map((s, i) => {
              const c = getCategory(s);
              return c ? (
                <Reveal key={s} delay={(i % 4) * 90}>
                  <CategoryCard c={c} image={c.image ?? productsIn(c)[0]?.images[0]} />
                </Reveal>
              ) : null;
            })}
          </div>
        </div>
      </section>

      {/* Solutions */}
      <section className="py-20 lg:py-28">
        <div className="container-site">
          <Reveal>
            <SectionHeading eyebrow="Automation solutions" title="Engineering capabilities for connected, dependable production" intro="Each capability is delivered by DICS engineers and supported by products we supply — so specification, programming and commissioning stay in one place." />
          </Reveal>
          <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
            {solutions.map((s, i) => (
              <Reveal key={s.title} delay={(i % 3) * 90}>
                <Link to="/services/$slug" params={{ slug: s.to }} className="group block h-full bg-card p-8 transition-colors hover:bg-tech">
                  <s.icon className="h-8 w-8 text-primary transition-transform duration-300 group-hover:-translate-y-1" aria-hidden />
                  <h3 className="mt-5 text-xl font-semibold">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary">Learn more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Brands — scrolling strip */}
      <section className="border-y border-border bg-card py-16">
        <div className="container-site">
          <Reveal>
            <SectionHeading center eyebrow="Technology brands" title="Associated with leading automation manufacturers" />
          </Reveal>
        </div>
        <div className="mt-10 overflow-hidden" style={{ maskImage: "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)", WebkitMaskImage: "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)" }}>
          <div className="animate-marquee flex w-max">
            {[...brands, ...brands].map((b, i) => (
              <Link
                key={`${b.slug}-${i}`}
                to="/our-brands/$slug"
                params={{ slug: b.slug }}
                className="group flex h-28 w-64 shrink-0 flex-col items-center justify-center border-r border-border bg-card transition-colors hover:bg-tech"
                aria-hidden={i >= brands.length}
                tabIndex={i >= brands.length ? -1 : undefined}
              >
                <span className="font-display text-2xl font-extrabold tracking-tight text-navy/80 transition-colors group-hover:text-primary">{b.name}</span>
                <span className="mt-1 text-[0.7rem] uppercase tracking-wider text-muted-foreground">{b.origin}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-20 lg:py-28">
        <div className="container-site">
          <Reveal>
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <SectionHeading eyebrow="Industries served" title="Sectors that rely on DICS" />
              <Button asChild variant="outline"><Link to="/industries">All industries</Link></Button>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {industries.filter((i) => i.image).slice(0, 4).map((i, idx) => (
              <Reveal key={i.slug} delay={idx * 90}>
                <Link to="/industries" hash={i.slug} className="group relative block aspect-[3/4] overflow-hidden rounded-lg">
                  <img src={i.image} alt={`${i.name} production environment`} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/40 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <h3 className="text-xl font-semibold text-navy-foreground">{i.name}</h3>
                    <p className="mt-2 text-sm text-navy-muted">{i.text}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="bg-navy-deep py-20 text-navy-foreground lg:py-28">
        <div className="container-site grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-brand">Engineering & service</p>
            <h2 className="mt-3 text-3xl font-bold text-navy-foreground md:text-4xl">From specification to lifecycle support</h2>
            <p className="mt-5 leading-relaxed text-navy-muted">DICS provides end-to-end project execution — electrical design, panel fabrication, software development, field commissioning and lifecycle support — backed by testing stations at our Bangalore facility for investigating product-related issues.</p>
            <Button asChild variant="hero" size="lg" className="mt-8"><Link to="/services">Explore services</Link></Button>
          </Reveal>
          <ol className="grid gap-px overflow-hidden rounded-lg bg-navy-foreground/10 sm:grid-cols-2">
            {services.map((s, i) => (
              <li key={s.slug} className="bg-navy-deep">
                <Link to="/services/$slug" params={{ slug: s.slug }} className="group flex h-full gap-4 p-6 transition-colors hover:bg-navy">
                  <span className="font-mono text-xs text-brand">{String(i + 1).padStart(2, "0")}</span>
                  <span>
                    <span className="block font-semibold">{s.title}</span>
                    <span className="mt-1 block text-sm text-navy-muted">{s.short}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Featured products */}
      <section className="py-20 lg:py-28">
        <div className="container-site">
          <Reveal>
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <SectionHeading eyebrow="From the catalogue" title="Featured products" intro="A selection of products listed in the DICS catalogue. Request a quote for pricing and availability." />
              <Button asChild variant="outline"><Link to="/products">Search all products</Link></Button>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 4) * 90}>
                <ProductCard p={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why DICS */}
      <section className="bg-tech py-20 lg:py-28">
        <div className="container-site">
          <Reveal>
            <SectionHeading center eyebrow="Why DICS" title="What customers can expect from us" />
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Building2, t: "Established since 1996", d: "Three decades supplying and supporting automation in Indian industry." },
              { icon: FlaskConical, t: "Own test facility", d: "Testing stations at our Bangalore head office help diagnose product-related issues." },
              { icon: ShieldCheck, t: "Recognised manufacturers", d: "Products from OMRON, Fuji Electric, Pro-face, Autonics, CKD, IDEC, Wöhner and PATLITE." },
              { icon: Headset, t: "Engineering support", d: "Product service support and application engineering from offices across India." },
            ].map((x, i) => (
              <Reveal key={x.t} delay={i * 90}>
                <div className="h-full rounded-lg border border-border bg-card p-7 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
                  <x.icon className="h-7 w-7 text-primary" aria-hidden />
                  <h3 className="mt-5 text-lg font-semibold">{x.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{x.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-10 flex justify-center">
            <Link to="/about-us" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"><Wrench className="h-4 w-4" /> Read our story</Link>
          </Reveal>
        </div>
      </section>

      <EnquiryBand />
    </>
  );
}
