import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { CategoryCard, EnquiryBand, PageHeader, ProductCard } from "@/components/site/Blocks";
import { Button } from "@/components/ui/button";
import { categoryLabel, categoryPath, childrenOf, getCategory, lineage, productsIn } from "@/lib/catalog";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/product-category/$")({
  loader: ({ params }) => {
    const parts = (params._splat ?? "").split("/").filter(Boolean);
    const cat = getCategory(parts[parts.length - 1] ?? "");
    if (!cat) throw notFound();
    return { slug: cat.slug };
  },
  head: ({ loaderData }) => {
    const c = loaderData ? getCategory(loaderData.slug) : undefined;
    if (!c) return { meta: [{ title: "Category unavailable | DICS" }, { name: "robots", content: "noindex" }] };
    const name = categoryLabel(c);
    return {
      meta: seo(name, c.description || `Browse ${productsIn(c).length} ${name} products available from DICS. Request a quote for pricing and availability.`),
      links: [{ rel: "canonical", href: `https://dicsglobal.com/product-category/${categoryPath(c)}/` }],
    };
  },
  component: CategoryPage,
  notFoundComponent: () => (
    <div className="container-site py-24 text-center">
      <h1 className="text-3xl font-bold">Category not found</h1>
      <Button asChild className="mt-6"><Link to="/products">Browse all products</Link></Button>
    </div>
  ),
});

function CategoryPage() {
  const { slug } = Route.useLoaderData();
  const cat = getCategory(slug);
  if (!cat) throw notFound();
  const chain = lineage(cat);
  const subs = childrenOf(cat);
  const list = productsIn(cat);
  return (
    <>
      <PageHeader
        title={categoryLabel(cat)}
        eyebrow={`${list.length} products`}
        intro={cat.description || undefined}
        crumbs={[{ label: "Products", to: "/products" }, ...chain.map((c) => ({ label: c.name, to: "/product-category/$", params: { _splat: categoryPath(c) } }))]}
      />
      {subs.length > 0 && (
        <section className="container-site py-12">
          <h2 className="text-2xl font-bold">Subcategories</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {subs.map((s) => <CategoryCard key={s.slug} c={{ ...s, name: categoryLabel(s) }} image={s.image ?? productsIn(s)[0]?.images[0]} />)}
          </div>
        </section>
      )}
      <section className="container-site pb-16 pt-4">
        <div className="flex items-end justify-between gap-4 border-b border-border pb-4">
          <h2 className="text-2xl font-bold">Products in {categoryLabel(cat)}</h2>
          <Link to="/products" search={{ category: cat.slug }} className="text-sm font-semibold text-primary hover:underline">Search within this range</Link>
        </div>
        {list.length === 0 ? (
          <p className="mt-8 text-muted-foreground">No products are listed here yet. <Link to="/request-a-quote" className="text-primary hover:underline">Send your requirement</Link> and our team will help.</p>
        ) : (
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {list.map((p) => <ProductCard key={p.slug} p={p} />)}
          </div>
        )}
      </section>
      <EnquiryBand />
    </>
  );
}
