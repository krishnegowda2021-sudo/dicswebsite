import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { careerApplicationSchema, careerNotificationEndpoint } from "./careers";
import { enquiryActivatedOrigin, enquiryEmailAccepted } from "./enquiry-email";

const submissionSchema = careerApplicationSchema.extend({
  website: z.string().max(0).default(""),
  startedAt: z.number().finite(),
});

export const submitCareerApplication = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => submissionSchema.parse(input))
  .handler(async ({ data }) => {
    if (Date.now() - data.startedAt < 2500 || data.startedAt > Date.now()) {
      return { ok: false as const, error: "Please take a moment to review your details and try again." };
    }
    const { createClient } = await import("@supabase/supabase-js");
    const url = process.env["SUPABASE_URL"] || import.meta.env["VITE_SUPABASE_URL"];
    const key = process.env["SUPABASE_PUBLISHABLE_KEY"] || import.meta.env["VITE_SUPABASE_PUBLISHABLE_KEY"];
    if (!url || !key) return { ok: false as const, error: "Applications are temporarily unavailable. Please email your application instead." };
    // Insert-only public client: visitors cannot read candidate details.
    const client = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
      global: { fetch: (input, init) => {
        const headers = new Headers(init?.headers);
        if (key.startsWith("sb_") && headers.get("Authorization") === `Bearer ${key}`) headers.delete("Authorization");
        headers.set("apikey", key);
        return fetch(input, { ...init, headers });
      } },
    });
    const id = crypto.randomUUID();
    const { error } = await client.from("career_applications").insert({
      id, full_name: data.fullName, email: data.email, phone: data.phone,
      position: data.position, experience: data.experience, skills: data.skills,
      message: data.message, consent: data.consent,
    });
    if (error) return { ok: false as const, error: "We couldn't save your application. Please try again or email us directly." };
    // Notify HR through FormSubmit; the application stays saved even if this fails.
    let emailed = false;
    try {
      const response = await fetch(careerNotificationEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json", Referer: `${enquiryActivatedOrigin}/careers`, Origin: enquiryActivatedOrigin },
        body: JSON.stringify({
          _subject: `New Job Application - ${data.fullName} (${data.position})`,
          _template: "table",
          _captcha: "false",
          _replyto: data.email,
          Name: data.fullName,
          Email: data.email,
          Phone: data.phone,
          Position: data.position,
          "Years of experience": String(data.experience),
          Skills: data.skills,
          Message: data.message || "-",
          "Résumé": "Candidate was asked to email it separately",
        }),
        signal: AbortSignal.timeout(15000),
      });
      const result: unknown = await response.json().catch(() => null);
      emailed = response.ok && enquiryEmailAccepted(result);
      if (!emailed) console.error("FormSubmit career notification rejected", response.status, JSON.stringify(result));
    } catch {
      console.error("FormSubmit career notification unavailable");
    }
    return { ok: true as const, id, emailed };
  });