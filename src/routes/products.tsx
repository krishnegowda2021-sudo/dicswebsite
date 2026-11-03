import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState, useEffect } from "react";
import { Search, SearchX } from "lucide-react";
import { z } from "zod";
import { PageHeader, ProductCard } from "@/components/site/Blocks";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { brandNames, searchProducts, topCategories } from "@/lib/catalog";
import { seo } from "@/lib/seo";

const searchSchema = z.object({
  q: z.string().optional().catch(undefined),
  brand: z.string().optional().catch(undefined),
  category: z.string().optional().catch(undefined),
  page: z.number().int().min(1).optional().catch(undefined),
});

export const Route = createFileRoute("/products")({
  validateSearch: searchSchema,
  head: () => ({
    meta: seo("Industrial Automation Product Catalogue", "Search 858 automation products by model, series, category or manufacturer — PLCs, drives, sensors, controllers, robotics and more."),
  }),
  component: Products,
});

const PER_PAGE = 24;
const selectCls = "h-10 w-full rounded-md border border-input bg-card px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

function Products() {
  const { q, brand, category, page = 1 } = Route.useSearch();
  const navigate = useNavigate({ from: "/products" });
  const [text, setText] = useState(q ?? "");
  useEffect(() => setText(q ?? ""), [q]);

  const results = useMemo(() => searchProducts({ q, brand, category }), [q, brand, category]);
  const pages = Math.max(1, Math.ceil(results.length / PER_PAGE));
  const current = Math.min(page, pages);
  const shown = results.slice((current - 1) * PER_PAGE, current * PER_PAGE);
  const set = (patch: Partial<z.infer<typeof searchSchema>>) =>
    navigate({ search: (s) => ({ ...s, page: undefined, ...patch }), resetScroll: false });

  return (
    <>
      <PageHeader title="Product catalogue" eyebrow="858 products" crumbs={[{ label: "Products" }]} intro="Search by model or series, or filter by category and manufacturer. Every product page has a Request a Quote option." />
      <section className="container-site py-12">
        <form
          role="search"
          onSubmit={(e) => { e.preventDefault(); set({ q: text.trim() || undefined }); }}
          className="grid gap-3 rounded-lg border border-border bg-card p-4 shadow-card md:grid-cols-[1fr_14rem_14rem_auto]"
        >
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
            <label htmlFor="q" className="sr-only">Search products</label>
            <Input id="q" value={text} onChange={(e) => setText(e.target.value)} placeholder="Search model, series or keyword (e.g. E3Z, FRENIC, timer)" className="h-10 pl-9" />
          </div>
          <div>
            <label htmlFor="cat" className="sr-only">Category</label>
            <select id="cat" className={selectCls} value={category ?? ""} onChange={(e) => set({ category: e.target.value || undefined })}>
              <option value="">All categories</option>
              {topCategories.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="brand" className="sr-only">Manufacturer</label>
            <select id="brand" className={selectCls} value={brand ?? ""} onChange={(e) => set({ brand: e.target.value || undefined })}>
              <option value="">All manufacturers</option>
              {brandNames.map((b) => <option key={b} value={b}>{b}</option>)}
            </select>
          </div>
          <Button type="submit" size="lg" className="h-10">Search</Button>
        </form>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-sm text-muted-foreground">
          <p aria-live="polite"><span className="font-semibold text-navy">{results.length}</span> products{q && <> matching “{q}”</>}</p>
          {(q || brand || category) && (
            <button type="button" onClick={() => navigate({ search: {} })} className="font-semibold text-primary hover:underline">Clear filters</button>
          )}
        </div>

        {shown.length === 0 ? (
          <div className="mt-10 rounded-lg border border-dashed border-border bg-tech p-12 text-center">
            <SearchX className="mx-auto h-10 w-10 text-muted-foreground" aria-hidden />
            <h2 className="mt-4 text-xl font-semibold">No products found</h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">Try a shorter model number, remove a filter, or send us your requirement — many parts are available on request even if they aren't listed.</p>
            <div className="mt-6 flex justify-center gap-3">
              <Button variant="outline" onClick={() => navigate({ search: {} })}>Clear filters</Button>
              <Button asChild><Link to="/request-a-quote">Send a requirement</Link></Button>
            </div>
          </div>
        ) : (
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {shown.map((p) => <ProductCard key={p.slug} p={p} />)}
          </div>
        )}

        {pages > 1 && (
          <nav aria-label="Pagination" className="mt-10 flex flex-wrap items-center justify-center gap-2">
            <Button variant="outline" size="sm" disabled={current <= 1} onClick={() => navigate({ search: (s) => ({ ...s, page: current - 1 }) })}>Previous</Button>
            <span className="px-3 text-sm text-muted-foreground">Page {current} of {pages}</span>
            <Button variant="outline" size="sm" disabled={current >= pages} onClick={() => navigate({ search: (s) => ({ ...s, page: current + 1 }) })}>Next</Button>
          </nav>
        )}
      </section>
    </>
  );
}
