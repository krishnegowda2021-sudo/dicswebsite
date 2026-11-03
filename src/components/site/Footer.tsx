import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import logo from "@/assets/dics-logo.png";
import { brands, company, featuredCategorySlugs, services } from "@/lib/site";
import { categoryPath, getCategory } from "@/lib/catalog";

export function Footer() {
  return (
    <footer className="bg-navy-deep text-navy-muted">
      <div className="container-site grid gap-10 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <div className="inline-block rounded-md bg-card p-3">
            <img src={logo} alt="DICS — Digital Instruments & Control Systems" width={488} height={248} loading="lazy" className="h-12 w-auto" />
          </div>
          <p className="mt-5 max-w-sm text-sm leading-relaxed">
            Digital Instruments & Control Systems has supplied industrial automation products and engineering services from Bangalore since {company.founded}, with offices across India.
          </p>
          <ul className="mt-6 grid gap-3 text-sm">
            <li className="flex gap-3"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden /><a href={company.mapUrl} target="_blank" rel="noopener noreferrer" className="hover:text-navy-foreground">{company.address}</a></li>
            <li className="flex gap-3"><Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden /><span>{company.phones.map((p, i) => <a key={p.href} href={p.href} className="hover:text-navy-foreground">{i > 0 && ", "}{p.label}</a>)}</span></li>
            <li className="flex gap-3"><Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden /><a href={`mailto:${company.email}`} className="hover:text-navy-foreground">{company.email}</a></li>
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-navy-foreground">Products</h2>
          <ul className="mt-4 grid gap-2 text-sm">
            {featuredCategorySlugs.map((s) => {
              const c = getCategory(s);
              return c ? <li key={s}><Link to="/product-category/$" params={{ _splat: categoryPath(c) }} className="hover:text-navy-foreground">{c.name}</Link></li> : null;
            })}
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-navy-foreground">Services</h2>
          <ul className="mt-4 grid gap-2 text-sm">
            {services.map((s) => <li key={s.slug}><Link to="/services/$slug" params={{ slug: s.slug }} className="hover:text-navy-foreground">{s.title}</Link></li>)}
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-navy-foreground">Brands</h2>
          <ul className="mt-4 grid grid-cols-2 gap-2 text-sm">
            {brands.map((b) => <li key={b.slug}><Link to="/our-brands/$slug" params={{ slug: b.slug }} className="hover:text-navy-foreground">{b.name}</Link></li>)}
          </ul>
          <h2 className="mt-8 text-sm font-semibold uppercase tracking-wider text-navy-foreground">Company</h2>
          <ul className="mt-4 grid gap-2 text-sm">
            <li><Link to="/about-us" className="hover:text-navy-foreground">About Us</Link></li>
            <li><Link to="/careers" className="hover:text-navy-foreground">Careers</Link></li>
            <li><Link to="/industries" className="hover:text-navy-foreground">Industries</Link></li>
            <li><Link to="/contact-us" className="hover:text-navy-foreground">Contact & Offices</Link></li>
            <li><Link to="/request-a-quote" className="hover:text-navy-foreground">Request a Quote</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-navy-foreground/10">
        <div className="container-site flex flex-col gap-3 py-6 text-xs md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Digital Instruments & Control Systems. All rights reserved.</p>
          <div className="flex flex-wrap gap-4">
            {company.socials.map((s) => <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-navy-foreground">{s.name}</a>)}
            <Link to="/privacy-policy" className="hover:text-navy-foreground">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
