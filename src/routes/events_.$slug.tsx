import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { EnquiryBand, PageHeader } from "@/components/site/Blocks";
import { Button } from "@/components/ui/button";
import { events, getEvent } from "@/lib/events";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/events_/$slug")({
  loader: ({ params }) => {
    const event = getEvent(params.slug);
    if (!event) throw notFound();
    return { event };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Event not found | DICS" }, { name: "robots", content: "noindex" }] };
    const e = loaderData.event;
    return {
      meta: [
        ...seo(e.title, e.summary, { type: "article" }),
        { property: "og:image", content: e.cover },
        { name: "twitter:image", content: e.cover },
      ],
    };
  },
  notFoundComponent: () => (
    <section className="container-site py-24 text-center">
      <h1 className="text-3xl font-bold">Event not found</h1>
      <Button asChild className="mt-6"><Link to="/events">Back to events</Link></Button>
    </section>
  ),
  component: EventPage,
});

function EventPage() {
  const { event: e } = Route.useLoaderData();
  const others = events.filter((x) => x.slug !== e.slug);

  return (
    <>
      <PageHeader title={e.title} eyebrow={e.eyebrow} crumbs={[{ label: "Events", to: "/events" }, { label: e.title }]} intro={e.tagline} />

      {/* Intro + cover */}
      <section className="container-site grid gap-10 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:py-20">
        <div>
          <p className="eyebrow">{e.eyebrow}</p>
          <h2 className="mt-3 text-3xl font-bold md:text-4xl">{e.tagline}</h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground">
            {e.intro.map((p, i) => <p key={i}>{p}</p>)}
          </div>
          {e.callout && (
            <div className="mt-8 rounded-lg border-l-4 border-primary bg-tech p-6">
              {e.callout.lines.map((l) => <p key={l} className="text-lg font-bold text-navy md:text-xl">{l}</p>)}
              {e.callout.signature && <p className="mt-3 font-mono text-xs uppercase tracking-[0.16em] text-primary">{e.callout.signature}</p>}
            </div>
          )}
        </div>
        <div className="overflow-hidden rounded-lg border border-border bg-card shadow-lift">
          <img src={e.cover} alt={e.title} className="h-full w-full object-cover" />
        </div>
      </section>

      {e.stats && (
        <section className="bg-navy-gradient text-navy-foreground">
          <div className="container-site grid gap-6 py-12 sm:grid-cols-3">
            {e.stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-4xl font-bold text-brand md:text-5xl">{s.value}</p>
                <p className="mt-2 text-sm uppercase tracking-wider text-navy-muted">{s.label}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Features */}
      <section className="bg-tech py-16 lg:py-20">
        <div className="container-site">
          <h2 className="text-3xl font-bold md:text-4xl">{e.featuresTitle}</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {e.features.map((f) => (
              <article key={f.title} className="flex flex-col overflow-hidden rounded-lg border border-border bg-card shadow-card">
                {f.image ? (
                  <div className="aspect-[4/3] overflow-hidden"><img src={f.image} alt={f.title} loading="lazy" className="h-full w-full object-cover" /></div>
                ) : (
                  <div className="px-6 pt-6"><CheckCircle2 className="h-8 w-8 text-primary" aria-hidden /></div>
                )}
                <div className="p-6">
                  <h3 className="text-lg font-semibold">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery + list */}
      <section className="container-site py-16 lg:py-20">
        <div className={`grid gap-4 ${e.gallery.length === 4 ? "sm:grid-cols-2" : "sm:grid-cols-3"}`}>
          {e.gallery.map((src, i) => (
            <div key={src} className="aspect-[4/3] overflow-hidden rounded-lg border border-border bg-tech">
              <img src={src} alt={`${e.title} photo ${i + 1}`} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" />
            </div>
          ))}
        </div>
        {e.listTitle && (
          <div className="mt-14 grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold md:text-4xl">{e.listTitle}</h2>
              {e.listIntro && <p className="mt-4 leading-relaxed text-muted-foreground">{e.listIntro}</p>}
              {e.list && (
                <ul className="mt-6 grid gap-3">
                  {e.list.map((item) => (
                    <li key={item} className="flex items-start gap-3"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden /><span>{item}</span></li>
                  ))}
                </ul>
              )}
            </div>
            <div className="space-y-4 self-center rounded-lg border border-border bg-card p-8 leading-relaxed text-muted-foreground shadow-card">
              {e.closing.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </div>
        )}
      </section>

      {others.length > 0 && (
        <section className="container-site pb-16">
          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border pt-8">
            <Button asChild variant="outline"><Link to="/events"><ArrowLeft className="h-4 w-4" aria-hidden /> All events</Link></Button>
            {others.map((o) => (
              <Link key={o.slug} to="/events/$slug" params={{ slug: o.slug }} className="text-sm font-semibold text-primary hover:underline">Next: {o.title} →</Link>
            ))}
          </div>
        </section>
      )}

      <EnquiryBand />
    </>
  );
}
