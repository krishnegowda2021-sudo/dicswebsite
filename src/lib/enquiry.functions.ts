import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const enquirySchema = z.object({
  kind: z.enum(["general", "quote", "product"]),
  fullName: z.string().trim().min(2, "Please enter your full name").max(120),
  company: z.string().trim().max(160).optional().default(""),
  email: z.string().trim().email("Please enter a valid email address").max(200),
  phone: z
    .string()
    .trim()
    .min(6, "Please enter a phone number")
    .max(30)
    .regex(/^[+0-9()\-\s]+$/, "Use digits, spaces, + or - only"),
  interest: z.string().trim().max(160).optional().default(""),
  productSlug: z.string().trim().max(300).optional().default(""),
  productName: z.string().trim().max(300).optional().default(""),
  message: z.string().trim().min(10, "Please describe your requirement (at least 10 characters)").max(3000),
  pageUrl: z.string().trim().max(500).optional().default(""),
  // spam protection
  website: z.string().max(0).optional().default(""),
  startedAt: z.number(),
});

export type EnquiryInput = z.input<typeof enquirySchema>;

export const submitEnquiry = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => enquirySchema.parse(data))
  .handler(async ({ data }) => {
    // Honeypot filled or form submitted implausibly fast: treat as spam.
    if (data.website || Date.now() - data.startedAt < 2500) {
      return { ok: false as const, error: "Your submission could not be verified. Please try again." };
    }
    const { createClient } = await import("@supabase/supabase-js");
    const url = process.env["SUPABASE_URL"];
    const key = process.env["SUPABASE_PUBLISHABLE_KEY"];
    if (!url || !key) return { ok: false as const, error: "Enquiries are temporarily unavailable. Please call or email us instead." };
    const supabase = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
      global: { fetch: (input, init) => {
        const headers = new Headers(init?.headers);
        if (key.startsWith("sb_") && headers.get("Authorization") === `Bearer ${key}`) headers.delete("Authorization");
        headers.set("apikey", key);
        return fetch(input, { ...init, headers });
      } },
    });
    const { error } = await supabase.from("enquiries").insert({
      kind: data.kind,
      full_name: data.fullName,
      company: data.company || null,
      email: data.email,
      phone: data.phone,
      interest: data.interest || null,
      product_slug: data.productSlug || null,
      product_name: data.productName || null,
      message: data.message,
      page_url: data.pageUrl || null,
    });
    if (error) {
      console.error("enquiry insert failed", error.message);
      return { ok: false as const, error: "We couldn't send your enquiry right now. Please call or email us instead." };
    }
    return { ok: true as const };
  });
