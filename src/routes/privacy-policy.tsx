import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/Blocks";
import { company } from "@/lib/site";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({ meta: seo("Privacy Policy", "How Digital Instruments & Control Systems collects and uses information submitted through this website.") }),
  component: Privacy,
});

function Privacy() {
  return (
    <>
      <PageHeader title="Privacy policy" crumbs={[{ label: "Privacy Policy" }]} />
      <section className="container-site max-w-3xl space-y-6 py-16 leading-relaxed text-muted-foreground">
        <p className="rounded-md border border-signal/50 bg-tech p-4 text-sm">Draft for review — please have this policy checked by DICS management or a legal advisor before publishing.</p>
        <h2 className="text-xl font-semibold">Information we collect</h2>
        <p>When you submit an enquiry or quotation request we collect the details you provide: name, company, email address, phone number, the product or service of interest and your message.</p>
        <h2 className="text-xl font-semibold">How we use it</h2>
        <p>We use this information only to respond to your enquiry, prepare quotations and provide technical support. We do not sell your information.</p>
        <h2 className="text-xl font-semibold">Storage and security</h2>
        <p>Enquiries are stored securely and accessed only by authorised DICS staff. Information is retained for as long as needed to handle your enquiry and related business records.</p>
        <h2 className="text-xl font-semibold">Third-party links</h2>
        <p>This website links to manufacturer websites and social media. Their privacy practices are governed by their own policies.</p>
        <h2 className="text-xl font-semibold">Contact</h2>
        <p>For questions about your data, contact <a href={`mailto:${company.email}`} className="text-primary">{company.email}</a> or write to {company.address}.</p>
      </section>
    </>
  );
}
