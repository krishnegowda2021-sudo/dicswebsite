import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/site/Blocks";
import { events } from "@/lib/events";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/events")({
  head: () => ({ meta: seo("Events & Exhibitions", "Milestones, exhibitions and technical events from DICS — Digital Instruments & Control Systems.") }),
  component: Events,
});

function Events() {
  return (
    <>
      <PageHeader title="Events & exhibitions" eyebrow="Events" crumbs={[{ label: "Events" }]} intro="Milestones, trade shows and technical sessions where you can meet the DICS team." />
      <section className="container-site py-16 lg:py-20">
        <div className="grid gap-8 md:grid-cols-2">
          {events.map((e) => (
            <Link
              key={e.slug}
              to="/events/$slug"
              params={{ slug: e.slug }}
              className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card shadow-card transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lift"
            >
              <div className="aspect-[16/10] overflow-hidden bg-tech">
                <img src={e.cover} alt={e.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <p className="font-mono text-xs uppercase tracking-[0.16em] text-primary">{e.eyebrow}</p>
                <h2 className="mt-2 text-2xl font-bold group-hover:text-primary">{e.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{e.summary}</p>
                <span className="mt-auto flex items-center gap-1 pt-5 text-sm font-semibold text-primary">
                  Read more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
