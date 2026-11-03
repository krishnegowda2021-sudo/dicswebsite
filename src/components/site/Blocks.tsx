import { Link } from "@tanstack/react-router";
import { ArrowRight, ChevronRight, Package } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { categoryPath, getCategory, type Category, type Product } from "@/lib/catalog";

export type Crumb = { label: string; to?: string; params?: Record<string, string> };

export function PageHeader({ title, intro, crumbs, eyebrow }: { title: string; intro?: ReactNode | undefined; crumbs: Crumb[]; eyebrow?: string | undefined }) {
  return (
    <section className="relative overflow-hidden bg-navy-gradient text-navy-foreground">
      <div className="absolute inset-0 bg-grid opacity-40" aria-hidden />
      <div className="container-site relative py-12 lg:py-16">
        <Breadcrumbs crumbs={crumbs} />
        {eyebrow && <p className="mt-6 font-mono text-xs uppercase tracking-[0.16em] text-brand">{eyebrow}</p>}
        <h1 className="mt-3 max-w-4xl text-3xl font-bold text-navy-foreground md:text-5xl">{title}</h1>
        {intro && <div className="mt-4 max-w-3xl text-base leading-relaxed text-navy-muted md:text-lg">{intro}</div>}
      </div>
    </section>
  );
}

export function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  const all: Crumb[] = [{ label: "Home", to: "/" }, ...crumbs];
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1 text-xs text-navy-muted">
        {all.map((c, i) => (
          <li key={i} className="flex items-center gap-1">
            {i > 0 && <ChevronRight className="h-3 w-3" aria-hidden />}
            {c.to && i < all.length - 1 ? (
              <Link to={c.to} params={c.params as never} className="hover:text-navy-foreground">{c.label}</Link>
            ) : (
              <span aria-current={i === all.length - 1 ? "page" : undefined} className="text-navy-foreground">{c.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function ProductImage({ src, alt, className = "" }: { src?: string | undefined; alt: string; className?: string }) {
  if (!src) {
    return (
      <div className={`grid place-items-center bg-tech text-muted-foreground ${className}`}>
        <Package className="h-10 w-10" aria-hidden />
        <span className="sr-only">Image not available</span>
      </div>
    );
  }
  return <img src={src} alt={alt} loading="lazy" decoding="async" className={`object-contain ${className}`} />;
}

export function ProductCard({ p }: { p: Product }) {
  const cat = getCategory(p.categories[0] ?? "");
  return (
    <article className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-shadow hover:shadow-lift">
      <Link to="/product/$slug" params={{ slug: p.slug }} className="block aspect-square bg-card p-5">
        <ProductImage src={p.images[0]} alt={`${p.brand ?? ""} ${p.name}`.trim()} className="h-full w-full transition-transform duration-500 group-hover:scale-105" />
      </Link>
      <div className="flex flex-1 flex-col border-t border-border p-4">
        <p className="font-mono text-[0.68rem] uppercase tracking-wider text-primary">{p.brand ?? "Manufacturer on request"}</p>
        <h3 className="mt-1 text-base font-semibold leading-snug">
          <Link to="/product/$slug" params={{ slug: p.slug }} className="hover:text-primary">{p.name}</Link>
        </h3>
        {cat && <p className="mt-1 text-xs text-muted-foreground">{cat.name}</p>}
        <div className="mt-auto flex items-center justify-between pt-4">
          <Link to="/product/$slug" params={{ slug: p.slug }} className="text-xs font-semibold text-navy hover:text-primary">View details</Link>
          <Button asChild size="sm" variant="outline">
            <Link to="/request-a-quote" search={{ product: p.slug }}>Request a quote</Link>
          </Button>
        </div>
      </div>
    </article>
  );
}

export function CategoryCard({ c, image }: { c: Category; image?: string | undefined }) {
  return (
    <Link
      to="/product-category/$"
      params={{ _splat: categoryPath(c) }}
      className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lift"
    >
      <div className="aspect-[4/3] bg-card p-6">
        <ProductImage src={image ?? c.image ?? undefined} alt={c.name} className="h-full w-full transition-transform duration-500 group-hover:scale-105" />
      </div>
      <div className="flex flex-1 flex-col border-t border-border p-5">
        <h3 className="text-lg font-semibold group-hover:text-primary">{c.name}</h3>
        {c.description && <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{c.description}</p>}
        <span className="mt-auto flex items-center gap-1 pt-4 text-sm font-semibold text-primary">
          Explore range <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
        </span>
      </div>
    </Link>
  );
}

export function EnquiryBand() {
  return (
    <section className="bg-navy-gradient text-navy-foreground">
      <div className="container-site flex flex-col items-start justify-between gap-8 py-14 md:flex-row md:items-center">
        <div className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-brand">Talk to an engineer</p>
          <h2 className="mt-3 text-2xl font-bold text-navy-foreground md:text-4xl">Planning an automation upgrade or need a specific part?</h2>
          <p className="mt-3 text-navy-muted">Share your application, model numbers or drawings and our team will respond with product information or a quotation.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button asChild variant="hero" size="xl"><Link to="/request-a-quote">Request a quote</Link></Button>
          <Button asChild variant="heroOutline" size="xl"><Link to="/contact-us">Contact our offices</Link></Button>
        </div>
      </div>
    </section>
  );
}

export function SectionHeading({ eyebrow, title, intro, center }: { eyebrow: string; title: string; intro?: string; center?: boolean }) {
  return (
    <div className={center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-bold md:text-4xl">{title}</h2>
      {intro && <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">{intro}</p>}
    </div>
  );
}
