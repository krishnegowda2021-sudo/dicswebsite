import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { careerApplicationSchema } from "./careers";

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
    const url = process.env["SUPABASE_URL"];
    const key = process.env["SUPABASE_PUBLISHABLE_KEY"];
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
    // Owner notifications require a configured sender domain; never imply email delivery here.
    return { ok: true as const, id, emailed: false as const };
  });