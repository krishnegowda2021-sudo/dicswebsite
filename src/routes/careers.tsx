import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowDown, ArrowRight, Cpu, MonitorSmartphone, Wrench, MapPin, BriefcaseBusiness, GraduationCap } from "lucide-react";
import { Breadcrumbs, SectionHeading } from "@/components/site/Blocks";
import { Button } from "@/components/ui/button";
import { CareerApplication } from "@/components/site/CareerApplication";
import { jobOpenings, type JobOpening } from "@/lib/careers";
import { images } from "@/lib/site";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/careers")({
   head: () => ({ meta: seo("Careers at DICS — Industrial Automation & Engineering", "Explore PLC programming, application engineering and technical support opportunities at DICS. Submit your application details and email your résumé to our team.") }),
  component: Careers,
});

function JobCard({ job, onApply }: { job: JobOpening; onApply: () => void }) {
  return <article className="mt-8 rounded-lg border border-border bg-card p-6 shadow-card md:p-9">
    <p className="eyebrow">{job.department}</p>
    <h3 className="mt-4 max-w-3xl text-2xl font-bold leading-snug tracking-normal">{job.title}</h3>
    <p className="mt-4 max-w-3xl text-muted-foreground">{job.description}</p>
    <dl className="mt-6 grid gap-6 md:grid-cols-2">
      <div><dt className="flex items-center gap-2 font-semibold"><BriefcaseBusiness className="h-4 w-4 text-primary" aria-hidden />Experience</dt><dd className="mt-2 text-sm text-muted-foreground">{job.experience}</dd></div>
      <div><dt className="flex items-center gap-2 font-semibold"><MapPin className="h-4 w-4 text-primary" aria-hidden />Job locations</dt><dd className="mt-2 text-sm leading-relaxed text-muted-foreground">{job.location}</dd></div>
      <div><dt className="flex items-center gap-2 font-semibold"><GraduationCap className="h-4 w-4 text-primary" aria-hidden />Education</dt><dd className="mt-2 text-sm leading-relaxed text-muted-foreground">{job.education}</dd></div>
      <div><dt className="font-semibold">Employment type</dt><dd className="mt-2 text-sm text-muted-foreground">{job.employmentType ?? "Please enquire with our team"}</dd></div>
    </dl>
    <Button size="lg" className="mt-8" onClick={onApply}>Apply Now <ArrowRight aria-hidden /></Button>
  </article>;
}

function Careers() {
  const [position, setPosition] = useState("");
  const apply = (title: string) => {
    setPosition(title);
    document.getElementById("application")?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
    window.setTimeout(() => document.getElementById("fullName")?.focus({ preventScroll: true }), 300);
  };
  return <>
    <section className="relative isolate overflow-hidden bg-navy-deep text-navy-foreground">
      <img src={images.controlPanel} alt="Engineer working on a PLC control cabinet with a laptop" width={1376} height={1024} fetchPriority="high" className="absolute inset-0 -z-10 h-full w-full object-cover object-center" />
      <div className="absolute inset-0 -z-10 bg-hero-overlay" aria-hidden />
      <div className="container-site py-10 md:py-14">
        <Breadcrumbs crumbs={[{ label: "Careers" }]} />
        <p className="mt-8 font-mono text-xs uppercase text-brand">Careers · Digital Instruments & Control Systems</p>
        <h1 className="mt-4 max-w-xl text-4xl font-bold leading-tight tracking-normal text-navy-foreground md:text-5xl">Build Your Future with DICS</h1>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-navy-muted">Be part of a team working with industrial automation, control systems and engineering technologies that power modern industries.</p>
        <Button asChild variant="hero" size="lg" className="mt-7"><a href="#openings">View openings <ArrowDown aria-hidden /></a></Button>
      </div>
    </section>
    <section className="container-site py-14 md:py-16">
      <SectionHeading eyebrow="Why work with us" title="Practical engineering. Shared expertise." intro="Contribute to industrial automation projects, collaborate on engineering challenges and build your knowledge of control technologies." />
      <div className="mt-9 grid gap-8 md:grid-cols-3">
        {[{ icon: Cpu, title: "Learn through real applications", text: "Explore how controllers, sensors and software work together in industrial systems." }, { icon: MonitorSmartphone, title: "Collaborate on solutions", text: "Bring your technical perspective to programming, application design and troubleshooting." }, { icon: Wrench, title: "Contribute to industry", text: "Apply your skills to the engineering and support needs of machines and production processes." }].map(({ icon: Icon, title, text }) => <div key={title} className="border-t border-border pt-6"><Icon className="h-6 w-6 text-primary" aria-hidden /><h3 className="mt-4 text-lg tracking-normal">{title}</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{text}</p></div>)}
      </div>
    </section>
    <section className="border-y border-border bg-tech py-12">
      <div className="container-site grid gap-8 lg:grid-cols-2">
        <SectionHeading eyebrow="Our work" title="Connected controls. Real-world applications." />
        <div><p className="leading-relaxed text-muted-foreground">DICS works across PLC programming, HMI and SCADA applications, industrial controls, instrumentation and system integration. Engineering work includes application development, commissioning and technical troubleshooting.</p><ul className="mt-5 grid grid-cols-2 gap-3 text-sm font-semibold text-navy">{["PLC programming", "HMI & SCADA", "Industrial controls", "Instrumentation", "Motion & drives", "Automation engineering"].map(area => <li key={area} className="border-l-2 border-primary pl-3">{area}</li>)}</ul></div>
      </div>
    </section>
    <section id="openings" className="container-site scroll-mt-52 py-14 md:py-16">
      <SectionHeading eyebrow="Current openings" title="Find your next engineering role" />
      {jobOpenings.length ? jobOpenings.map(job => <JobCard key={job.title} job={job} onApply={() => apply(job.title)} />) : <p className="mt-8 text-muted-foreground">No current openings are listed. You are welcome to submit your CV for future opportunities.</p>}
    </section>
    <section className="bg-tech py-14">
      <div className="container-site">
        <SectionHeading eyebrow="How to apply" title="Share your experience with us" />
        <ol className="mt-8 grid gap-8 md:grid-cols-3">{[{ title: "Choose your role", text: "Review the role, locations and qualifications, or express interest in future opportunities." }, { title: "Submit your details", text: "Include your contact details, years of experience and relevant technical skills." }, { title: "Email your résumé", text: "Attach your résumé and send it to bangalore@dicsglobal.com and dicsblr@gmail.com." }].map((step, i) => <li key={step.title}><span className="font-mono text-sm text-primary">0{i + 1}</span><h3 className="mt-3 text-lg tracking-normal">{step.title}</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{step.text}</p></li>)}</ol>
      </div>
    </section>
    <section id="application" className="container-site scroll-mt-52 py-14 md:py-16">
      <div className="max-w-3xl">
        <SectionHeading eyebrow="Careers enquiry" title="Your next chapter starts here" intro="Apply for a listed role or send your résumé for future opportunities." />
        <CareerApplication position={position} />
      </div>
    </section>
  </>;
}
