import { useRef, useState, type FormEvent } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Link } from "@tanstack/react-router";
import { CheckCircle2, Loader2, Mail, Paperclip } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { careerApplicationSchema, careerEmailUrl, careerRecipients } from "@/lib/careers";
import { submitCareerApplication } from "@/lib/careers.functions";

export function CareerApplication({ position }: { position: string }) {
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [emailUrl, setEmailUrl] = useState("");
  const startedAt = useRef(Date.now());
  const send = useServerFn(submitCareerApplication);
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [serverError, setServerError] = useState("");
  async function prepare(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const values = Object.fromEntries(new FormData(event.currentTarget));
    const parsed = careerApplicationSchema.safeParse({ ...values, consent, experience: values["experience"] === "" ? -1 : values["experience"] });
    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) next[String(issue.path[0])] = issue.message;
      setErrors(next);
      setEmailUrl("");
      return;
    }
    setErrors({});
    setServerError("");
    setStatus("sending");
    try {
      const result = await send({ data: { ...parsed.data, website: String(values["website"] ?? ""), startedAt: startedAt.current } });
      if (!result.ok) {
        setServerError(result.error);
        setStatus("idle");
        return;
      }
      setEmailUrl(careerEmailUrl(careerRecipients.join(","), parsed.data));
      setStatus("done");
    } catch {
      setServerError("We couldn't save your application. Please try again or email us directly.");
      setStatus("idle");
    }
  }
  const error = (name: string) => errors[name] ? <p id={`${name}-error`} className="mt-1 text-sm text-destructive">{errors[name]}</p> : null;
  const field = (name: string, label: string, type = "text", maxLength = 200) => (
    <div>
      <Label htmlFor={name}>{label} <span aria-hidden className="text-primary">*</span></Label>
      <Input id={name} name={name} type={type} maxLength={maxLength} required className="mt-2" aria-invalid={Boolean(errors[name])} aria-describedby={errors[name] ? `${name}-error` : undefined} autoComplete={name === "fullName" ? "name" : name === "phone" ? "tel" : name === "email" ? "email" : undefined} />
      {error(name)}
    </div>
  );
  if (status === "done") return <div role="status" className="mt-8 border-l-2 border-success bg-tech p-6">
    <CheckCircle2 className="h-7 w-7 text-success" aria-hidden />
    <h3 className="mt-4 text-xl">Your application details have been received</h3>
    <p className="mt-3 text-sm text-muted-foreground">Your details are saved. Automatic email notifications are not active yet. To send your résumé to our team, open the email below, attach your résumé and send it.</p>
    <Button asChild className="mt-5"><a href={emailUrl}><Mail aria-hidden /> Email details and résumé</a></Button>
  </div>;
  return (
    <form noValidate onSubmit={prepare} onChange={() => setEmailUrl("")} className="mt-8" aria-label="Careers application">
      <div className="grid gap-6 sm:grid-cols-2">
        {field("fullName", "Full name", "text", 120)}
        {field("email", "Email address", "email")}
        {field("phone", "Phone number", "tel", 30)}
        <div>
          <Label htmlFor="experience">Years of experience <span aria-hidden className="text-primary">*</span></Label>
          <Input id="experience" name="experience" type="number" min={0} max={60} step={0.5} required className="mt-2" aria-invalid={Boolean(errors["experience"])} aria-describedby={errors["experience"] ? "experience-error" : undefined} />
          {error("experience")}
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="position">Position applied for <span aria-hidden className="text-primary">*</span></Label>
          <Input key={position} id="position" name="position" defaultValue={position} maxLength={200} required className="mt-2" aria-invalid={Boolean(errors["position"])} aria-describedby={errors["position"] ? "position-error" : undefined} />
          {error("position")}
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="skills">Relevant skills <span aria-hidden className="text-primary">*</span></Label>
          <Textarea id="skills" name="skills" maxLength={1000} required placeholder="PLC programming, HMI development, commissioning…" className="mt-2" aria-invalid={Boolean(errors["skills"])} aria-describedby={errors["skills"] ? "skills-error" : undefined} />
          {error("skills")}
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="message">Cover letter or message <span className="font-normal text-muted-foreground">(optional)</span></Label>
          <Textarea id="message" name="message" maxLength={2000} rows={4} className="mt-2" />
        </div>
      </div>
      <p className="mt-6 flex items-start gap-2 text-sm text-muted-foreground"><Paperclip className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />Attach your résumé in your email before sending. No files are uploaded to this website.</p>
      <div className="mt-6 flex items-start gap-3">
        <Checkbox id="consent" checked={consent} onCheckedChange={(value) => { setConsent(value === true); setEmailUrl(""); }} aria-invalid={Boolean(errors["consent"])} aria-describedby={errors["consent"] ? "consent-error" : undefined} />
        <Label htmlFor="consent" className="text-sm font-normal leading-relaxed">I consent to DICS processing my details and résumé for recruitment. <Link to="/privacy-policy" className="text-primary underline">Privacy Policy</Link></Label>
      </div>
      {error("consent")}
      <div hidden aria-hidden><input name="website" tabIndex={-1} autoComplete="off" /></div>
      {serverError && <p role="alert" className="mt-5 text-sm text-destructive">{serverError}</p>}
      <Button type="submit" size="lg" disabled={status === "sending"} className="mt-6">{status === "sending" ? <Loader2 className="animate-spin" aria-hidden /> : <Mail aria-hidden />} {status === "sending" ? "Submitting…" : "Submit application"}</Button>
      <p className="mt-4 text-sm text-muted-foreground">Prefer to email directly? Send your details and résumé to <a href={`mailto:${careerRecipients.join(",")}?subject=Career%20Application`} className="break-all font-medium text-primary underline">{careerRecipients.join(" and ")}</a>.</p>
    </form>
  );
}