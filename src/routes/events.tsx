import { createFileRoute, Link } from "@tanstack/react-router";
import { CalendarDays } from "lucide-react";
import { PageHeader } from "@/components/site/Blocks";
import { Button } from "@/components/ui/button";
import { company } from "@/lib/site";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/events")({
  head: () => ({ meta: seo("Events & Exhibitions", "Upcoming exhibitions, product demonstrations and technical events from DICS — Digital Instruments & Control Systems.") }),
  component: Events,
});

function Events() {
  return (
    <>
      <PageHeader title="Events & exhibitions" eyebrow="Events" crumbs={[{ label: "Events" }]} intro="Trade shows, product demonstrations and technical sessions where you can meet the DICS team." />
      <section className="container-site py-20">
        <div className="mx-auto max-w-2xl rounded-lg border border-dashed border-border bg-tech p-12 text-center">
          <CalendarDays className="mx-auto h-10 w-10 text-primary" aria-hidden />
          <h2 className="mt-4 text-2xl font-bold">No upcoming events are listed right now</h2>
          <p className="mt-3 text-muted-foreground">Follow DICS on social media for announcements, or contact us to arrange a product demonstration.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button asChild><Link to="/contact-us">Request a demonstration</Link></Button>
            <Button asChild variant="outline"><a href={company.socials[0]!.href} target="_blank" rel="noopener noreferrer">Follow on LinkedIn</a></Button>
          </div>
        </div>
      </section>
    </>
  );
}
