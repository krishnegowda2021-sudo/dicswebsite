import { useEffect, useRef, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronDown, Mail, MapPin, Menu, Phone, X } from "lucide-react";
import logo from "@/assets/dics-logo.png";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { brands, company, services } from "@/lib/site";
import { categoryPath, childrenOf, getCategory } from "@/lib/catalog";

const productGroups = [
  { title: "Control & Automation", slugs: ["automation-systems", "control-components", "motion-controller", "robotics"] },
  { title: "Drives & Power", slugs: ["ac-drives", "busbar", "ups-servo-stabilizers"] },
  { title: "Sensing & Signalling", slugs: ["sensors-switches", "instrumentation", "patlite", "switches"] },
];

type MenuKey = "products" | "services" | "brands" | null;

function CatLink({ slug, onNavigate }: { slug: string; onNavigate: () => void }) {
  const c = getCategory(slug);
  if (!c) return null;
  const children = childrenOf(c);
  const subs = (slug === "motion-controller"
    ? children.filter((s) => ["fuji-electric-servo-system", "omron-servomotors-servo-drivers"].includes(s.slug))
    : children).slice(0, 4);
  return (
    <li>
      <Link
        to="/product-category/$"
        params={{ _splat: categoryPath(c) }}
        onClick={onNavigate}
        className="group flex items-start gap-3 rounded-md p-2 hover:bg-tech"
      >
        {c.image && (
          <img src={c.image} alt="" loading="lazy" className="h-11 w-11 shrink-0 rounded border border-border bg-card object-contain p-0.5" />
        )}
        <span>
          <span className="block text-sm font-semibold text-navy group-hover:text-primary">{c.name}</span>
          <span className="block text-xs text-muted-foreground">{subs.map((s) => s.name).join(" · ") || `${c.count} products`}</span>
        </span>
      </Link>
    </li>
  );
}

export function Header() {
  const [open, setOpen] = useState<MenuKey>(null);
  const [mobile, setMobile] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navRef = useRef<HTMLDivElement>(null);
  const close = () => setOpen(null);

  useEffect(() => { setOpen(null); setMobile(false); }, [pathname]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    const onClick = (e: MouseEvent) => { if (navRef.current && !navRef.current.contains(e.target as Node)) setOpen(null); };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => { document.removeEventListener("keydown", onKey); document.removeEventListener("mousedown", onClick); };
  }, []);

  const trigger = (key: Exclude<MenuKey, null>, label: string) => (
    <button
      type="button"
      aria-expanded={open === key}
      aria-haspopup="true"
      onClick={() => setOpen(open === key ? null : key)}
      onMouseEnter={() => setOpen(key)}
      className="flex h-14 items-center gap-1 px-3 text-sm font-medium text-navy-foreground/90 hover:text-navy-foreground aria-expanded:text-brand"
    >
      {label} <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open === key ? "rotate-180" : ""}`} aria-hidden />
    </button>
  );

  const plain = (to: string, label: string) => (
    <Link to={to} className="flex h-14 items-center px-3 text-sm font-medium text-navy-foreground/90 hover:text-navy-foreground" activeProps={{ className: "text-brand" }} activeOptions={{ exact: to === "/" }}>
      {label}
    </Link>
  );

  return (
    <header className="sticky top-0 z-50">
      {/* Top info bar */}
      <div className="hidden bg-navy-deep text-navy-muted md:block">
        <div className="container-site flex h-9 items-center justify-between text-xs">
          <p>Industrial automation products & engineering services since {company.founded}</p>
          <ul className="flex items-center gap-4">
            {company.socials.map((s) => (
              <li key={s.name}><a href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-navy-foreground">{s.name}</a></li>
            ))}
          </ul>
        </div>
      </div>

      {/* Main header */}
      <div className="border-b border-border bg-card">
        <div className="container-site flex h-20 items-center justify-between gap-6">
          <Link to="/" aria-label="DICS — home" className="shrink-0">
            <img src={logo} alt="DICS — Digital Instruments & Control Systems" width={488} height={248} className="h-12 w-auto lg:h-14" />
          </Link>
          <div className="hidden items-center gap-8 lg:flex">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-tech text-primary"><Phone className="h-4 w-4" aria-hidden /></span>
              <div className="text-sm leading-tight">
                <span className="block text-xs text-muted-foreground">Call our head office</span>
                <a href={company.phones[0]!.href} className="font-semibold text-navy hover:text-primary">{company.phones[0]!.label}</a>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-tech text-primary"><Mail className="h-4 w-4" aria-hidden /></span>
              <div className="text-sm leading-tight">
                <span className="block text-xs text-muted-foreground">Email</span>
                <a href={`mailto:${company.email}`} className="font-semibold text-navy hover:text-primary">{company.email}</a>
              </div>
            </div>
            <div className="hidden items-center gap-3 xl:flex">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-tech text-primary"><MapPin className="h-4 w-4" aria-hidden /></span>
              <div className="max-w-56 text-sm leading-tight">
                <span className="block text-xs text-muted-foreground">Head office</span>
                <span className="font-semibold text-navy">Peenya Industrial Estate, Bangalore</span>
              </div>
            </div>
          </div>

          {/* Mobile trigger */}
          <Sheet open={mobile} onOpenChange={setMobile}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden" aria-label="Open menu"><Menu /></Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[88vw] max-w-sm overflow-y-auto p-0">
              <SheetTitle className="border-b border-border p-5 text-base">Menu</SheetTitle>
              <MobileNav onNavigate={() => setMobile(false)} />
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Nav bar */}
      <div ref={navRef} className="relative hidden bg-navy lg:block" onMouseLeave={close}>
        <div className="container-site flex items-center justify-between">
          <nav aria-label="Main" className="flex items-center">
            {plain("/", "Home")}
            {plain("/about-us", "About Us")}
            {trigger("products", "Products")}
            {trigger("services", "Services")}
            {plain("/industries", "Industries")}
            {plain("/events", "Events")}
            {trigger("brands", "Our Brands")}
            {plain("/careers", "Careers")}
            {plain("/contact-us", "Contact Us")}
          </nav>
          <Button asChild variant="hero" size="sm" className="h-9 px-5">
            <Link to="/request-a-quote">Enquiry</Link>
          </Button>
        </div>

        {open && (
          <div className="absolute inset-x-0 top-full border-b border-border bg-card shadow-lift animate-in fade-in-0 slide-in-from-top-1">
            <div className="container-site py-8">
              {open === "products" && (
                <div className="grid grid-cols-[1fr_1fr_1fr_16rem] gap-8">
                  {productGroups.map((g) => (
                    <div key={g.title}>
                      <p className="eyebrow mb-3">{g.title}</p>
                      <ul className="grid gap-1">{g.slugs.map((s) => <CatLink key={s} slug={s} onNavigate={close} />)}</ul>
                    </div>
                  ))}
                  <div className="rounded-lg bg-navy-gradient p-6 text-navy-foreground">
                    <p className="font-display text-lg font-semibold">858 catalogued products</p>
                    <p className="mt-2 text-sm text-navy-muted">Search by model, series or manufacturer across the full catalogue.</p>
                    <Link to="/products" onClick={close} className="mt-5 inline-block text-sm font-semibold text-brand hover:underline">Browse all products →</Link>
                  </div>
                </div>
              )}
              {open === "services" && (
                <div className="grid grid-cols-[1fr_16rem] gap-8">
                  <ul className="grid grid-cols-2 gap-x-8 gap-y-1">
                    {services.map((s) => (
                      <li key={s.slug}>
                        <Link to="/services/$slug" params={{ slug: s.slug }} onClick={close} className="group block rounded-md p-3 hover:bg-tech">
                          <span className="block text-sm font-semibold text-navy group-hover:text-primary">{s.title}</span>
                          <span className="block text-xs text-muted-foreground">{s.short}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <div className="rounded-lg bg-tech p-6">
                    <p className="font-display text-lg font-semibold text-navy">Engineering support</p>
                    <p className="mt-2 text-sm text-muted-foreground">Programming, commissioning, retrofits and lifecycle service.</p>
                    <Link to="/services" onClick={close} className="mt-5 inline-block text-sm font-semibold text-primary hover:underline">All services →</Link>
                  </div>
                </div>
              )}
              {open === "brands" && (
                <div>
                  <ul className="grid grid-cols-4 gap-3">
                    {brands.map((b) => (
                      <li key={b.slug}>
                        <Link to="/our-brands/$slug" params={{ slug: b.slug }} onClick={close} className="group flex h-full flex-col rounded-md border border-border p-4 hover:border-primary hover:shadow-card">
                          <span className="font-display text-lg font-bold tracking-tight text-navy group-hover:text-primary">{b.name}</span>
                          <span className="mt-1 text-xs text-muted-foreground">{b.origin}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link to="/our-brands" onClick={close} className="mt-5 inline-block text-sm font-semibold text-primary hover:underline">About our brand associations →</Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

function MobileNav({ onNavigate }: { onNavigate: () => void }) {
  const [sec, setSec] = useState<string | null>(null);
  const toggle = (k: string) => setSec(sec === k ? null : k);
  const row = "flex w-full items-center justify-between border-b border-border px-5 py-4 text-left font-medium text-navy";
  return (
    <nav aria-label="Mobile" className="pb-8">
      <Link to="/" className={row}>Home</Link>
      <Link to="/about-us" className={row}>About Us</Link>
      <button type="button" className={row} aria-expanded={sec === "p"} onClick={() => toggle("p")}>Products <ChevronDown className="h-4 w-4" /></button>
      {sec === "p" && (
        <ul className="bg-tech px-5 py-2">
          <li><Link to="/products" className="block py-2 text-sm font-semibold text-primary">All products</Link></li>
          {productGroups.flatMap((g) => g.slugs).map((s) => {
            const c = getCategory(s)!;
            return <li key={s}><Link to="/product-category/$" params={{ _splat: categoryPath(c) }} className="block py-2 text-sm">{c.name}</Link></li>;
          })}
        </ul>
      )}
      <button type="button" className={row} aria-expanded={sec === "s"} onClick={() => toggle("s")}>Services <ChevronDown className="h-4 w-4" /></button>
      {sec === "s" && (
        <ul className="bg-tech px-5 py-2">
          <li><Link to="/services" className="block py-2 text-sm font-semibold text-primary">All services</Link></li>
          {services.map((s) => <li key={s.slug}><Link to="/services/$slug" params={{ slug: s.slug }} className="block py-2 text-sm">{s.title}</Link></li>)}
        </ul>
      )}
      <Link to="/industries" className={row}>Industries</Link>
      <Link to="/events" className={row}>Events</Link>
      <button type="button" className={row} aria-expanded={sec === "b"} onClick={() => toggle("b")}>Our Brands <ChevronDown className="h-4 w-4" /></button>
      {sec === "b" && (
        <ul className="bg-tech px-5 py-2">
          <li><Link to="/our-brands" className="block py-2 text-sm font-semibold text-primary">All brands</Link></li>
          {brands.map((b) => <li key={b.slug}><Link to="/our-brands/$slug" params={{ slug: b.slug }} className="block py-2 text-sm">{b.name}</Link></li>)}
        </ul>
      )}
      <Link to="/careers" onClick={onNavigate} className={row}>Careers</Link>
      <Link to="/contact-us" className={row}>Contact Us</Link>
      <div className="grid gap-3 p-5">
        <Button asChild size="lg"><Link to="/request-a-quote">Send an enquiry</Link></Button>
        <a href={company.phones[0]!.href} className="flex items-center gap-2 text-sm text-navy"><Phone className="h-4 w-4 text-primary" /> {company.phones[0]!.label}</a>
        <a href={`mailto:${company.email}`} className="flex items-center gap-2 text-sm text-navy"><Mail className="h-4 w-4 text-primary" /> {company.email}</a>
      </div>
      <span className="sr-only"><X /></span>
    </nav>
  );
}
