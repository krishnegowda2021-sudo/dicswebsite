import { useRef, useState, type FormEvent } from "react";
import { useServerFn } from "@tanstack/react-start";
import { CheckCircle2, Loader2 } from "lucide-react";
import { submitEnquiry, enquirySchema } from "@/lib/enquiry.functions";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { company } from "@/lib/site";

const interests = [
  "PLC / HMI / Factory Automation",
  "VFD / AC Drives / Servo Drives",
  "Control Panels / MCC",
  "Sensors / Temperature Controllers",
  "Temperature Measurement & Control",
  "Robotics / System Integration",
  "Industrial Products / Spare Parts",
  "Service / Repair / Technical Support",
  "Other",
];

type Props = {
  kind?: "general" | "quote" | "product";
  productSlug?: string | undefined;
  productName?: string | undefined;
  compact?: boolean;
};

export function EnquiryForm({ kind = "general", productSlug, productName, compact }: Props) {
  const send = useServerFn(submitEnquiry);
  const startedAt = useRef(Date.now());
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [serverError, setServerError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = {
      kind,
      fullName: String(fd.get("fullName") ?? ""),
      company: String(fd.get("company") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      interest: String(fd.get("interest") ?? ""),
      message: String(fd.get("message") ?? ""),
      website: String(fd.get("website") ?? ""),
      productSlug: productSlug ?? "",
      productName: productName ?? "",
      pageUrl: typeof window !== "undefined" ? window.location.pathname : "",
      startedAt: startedAt.current,
    };
    const parsed = enquirySchema.safeParse(payload);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      for (const i of parsed.error.issues) errs[String(i.path[0])] ??= i.message;
      setErrors(errs);
      return;
    }
    setErrors({});
    setStatus("sending");
    try {
      const res = await send({ data: payload });
      if (res.ok) setStatus("done");
      else { setServerError(res.error); setStatus("error"); }
    } catch {
      setServerError("We couldn't send your enquiry right now. Please call or email us instead.");
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div role="status" className="rounded-lg border border-success/30 bg-card p-8 text-center shadow-card">
        <CheckCircle2 className="mx-auto h-10 w-10 text-success" aria-hidden />
        <h3 className="mt-4 text-xl font-semibold">Thank you — your enquiry has been received</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Our team will contact you. For urgent requirements call{" "}
          <a className="font-medium text-primary hover:underline" href={company.phones[0]!.href}>{company.phones[0]!.label}</a>.
        </p>
      </div>
    );
  }

  const field = (name: string) => (errors[name] ? { "aria-invalid": true, "aria-describedby": `${name}-err` } : {});
  const err = (name: string) =>
    errors[name] ? <p id={`${name}-err`} className="mt-1 text-xs text-destructive">{errors[name]}</p> : null;

  return (
    <form noValidate onSubmit={onSubmit} className="grid gap-4">
      {productName && (
        <div className="rounded-md border border-border bg-tech px-4 py-3 text-sm">
          <span className="text-muted-foreground">Enquiry for:</span>{" "}
          <span className="font-semibold text-navy">{productName}</span>
        </div>
      )}
      <div className={compact ? "grid gap-4" : "grid gap-4 sm:grid-cols-2"}>
        <div>
          <Label htmlFor="fullName">Full name *</Label>
          <Input id="fullName" name="fullName" autoComplete="name" className="mt-1.5" {...field("fullName")} />
          {err("fullName")}
        </div>
        <div>
          <Label htmlFor="company">Company</Label>
          <Input id="company" name="company" autoComplete="organization" className="mt-1.5" />
        </div>
        <div>
          <Label htmlFor="email">Business email *</Label>
          <Input id="email" name="email" type="email" autoComplete="email" className="mt-1.5" {...field("email")} />
          {err("email")}
        </div>
        <div>
          <Label htmlFor="phone">Phone *</Label>
          <Input id="phone" name="phone" type="tel" autoComplete="tel" className="mt-1.5" {...field("phone")} />
          {err("phone")}
        </div>
      </div>
      {!productName && (
        <div>
          <Label htmlFor="interest">Product / service requirement</Label>
          <select
            id="interest"
            name="interest"
            defaultValue=""
            className="mt-1.5 flex h-9 w-full rounded-md border border-input bg-background px-3 text-sm shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <option value="">Select your requirement</option>
            {interests.map((i) => <option key={i}>{i}</option>)}
          </select>
        </div>
      )}
      <div>
        <Label htmlFor="message">{kind === "quote" || productName ? "Quantity, application and details *" : "Project details *"}</Label>
        <Textarea id="message" name="message" rows={compact ? 4 : 5} className="mt-1.5" {...field("message")} />
        {err("message")}
      </div>
      {/* Honeypot — hidden from people, filled by bots */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      {status === "error" && (
        <p role="alert" className="rounded-md border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">{serverError}</p>
      )}
      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" size="lg" disabled={status === "sending"}>
          {status === "sending" && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
          {kind === "general" ? "Send enquiry" : "Request a quote"}
        </Button>
        <p className="text-xs text-muted-foreground">We use your details only to respond to this enquiry.</p>
      </div>
    </form>
  );
}
