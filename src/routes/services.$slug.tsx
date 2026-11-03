import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { CategoryCard, PageHeader } from "@/components/site/Blocks";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { services } from "@/lib/site";
import { getCategory, productsIn } from "@/lib/catalog";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const s = services.find((x) => x.slug === params.slug);
    if (!s) throw notFound();
    return { slug: s.slug };
  },
  head: ({ loaderData }) => {
    const s = services.find((x) => x.slug === loaderData?.slug);
    return { meta: s ? seo(s.title, s.short + " " + s.body[0]) : [{ title: "Service unavailable | DICS" }, { name: "robots", content: "noindex" }] };
  },
  component: ServicePage,
});

function ServicePage() {
  const { slug } = Route.useLoaderData();
  const s = services.find((x) => x.slug === slug)!;
  const cats = s.related.map(getCategory).filter(Boolean);
  return (
    <>
      <PageHeader title={s.title} eyebrow="Service" intro={s.short} crumbs={[{ label: "Services", to: "/services" }, { label: s.title }]} />
      <section className="container-site grid gap-12 py-16 lg:grid-cols-[1.3fr_1fr]">
        <div>
          <div className="space-y-4 text-lg leading-relaxed text-muted-foreground">{s.body.map((b) => <p key={b}>{b}</p>)}</div>
          <h2 className="mt-12 text-2xl font-bold">Challenges we help solve</h2>
          <ul className="mt-5 grid gap-3">
            {s.challenges.map((c) => <li key={c} className="flex gap-3"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />{c}</li>)}
          </ul>
          {cats.length > 0 && (
            <>
              <h2 className="mt-12 text-2xl font-bold">Related products</h2>
              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                {cats.map((c) => <CategoryCard key={c!.slug} c={c!} image={c!.image ?? productsIn(c!)[0]?.images[0]} />)}
              </div>
            </>
          )}
        </div>
        <aside className="h-fit rounded-lg border border-border bg-card p-6 shadow-card lg:sticky lg:top-40">
          <h2 className="text-xl font-semibold">Enquire about {s.title}</h2>
          <p className="mt-1 text-sm text-muted-foreground">Tell us about your machine or process. See all <Link to="/services" className="text-primary hover:underline">services</Link>.</p>
          <div className="mt-5"><EnquiryForm compact /></div>
        </aside>
      </section>
    </>
  );
}
