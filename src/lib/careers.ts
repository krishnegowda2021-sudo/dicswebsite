import { z } from "zod";

export const careerRecipients = ["bangalore@dicsglobal.com", "dicsblr@gmail.com"] as const;

export type JobOpening = {
  title: string;
  department: string;
  location: string;
  experience: string;
  employmentType?: string;
  education: string;
  description: string;
};

export const jobOpenings: JobOpening[] = [{
  title: "PLC Programmer / Application Engineer / Technical Support Engineer",
  department: "Industrial Automation",
  location: "Bangalore, Coimbatore, Chennai, Mumbai, Hyderabad, Pune and Noida",
  experience: "1–5 years",
  education: "Diploma or B.E. in Electrical & Electronics, Electronics & Communication, or a related field.",
  description: "Engineering roles focused on industrial automation programming, application engineering and technical support.",
}];

export const careerApplicationSchema = z.object({
  fullName: z.string().trim().min(2, "Enter your full name.").max(120),
  email: z.string().trim().email("Enter a valid email address.").max(200),
  phone: z.string().trim().min(6, "Enter your phone number.").max(30).regex(/^[+0-9()\-\s]+$/, "Use digits, spaces, +, parentheses or - only."),
  position: z.string().trim().min(2, "Choose or enter a position.").max(200),
  experience: z.coerce.number().min(0, "Experience cannot be negative.").max(60, "Enter experience between 0 and 60 years."),
  skills: z.string().trim().min(2, "Enter your relevant skills.").max(1000),
  message: z.string().trim().max(2000),
  consent: z.literal(true, { errorMap: () => ({ message: "Please consent to processing your application." }) }),
});

export function careerEmailUrl(email: string, input: unknown) {
  const data = careerApplicationSchema.parse(input);
  const recipient = email.split(",").map(address => z.string().email().parse(address.trim())).join(",");
  const body = `Full name: ${data.fullName}\nEmail: ${data.email}\nPhone: ${data.phone}\nPosition: ${data.position}\nYears of experience: ${data.experience}\nRelevant skills: ${data.skills}\n\n${data.message}\n\nI consent to DICS processing these details and my résumé for recruitment.\n\nRésumé: attach before sending.`;
  return `mailto:${recipient}?subject=${encodeURIComponent(`Career Application — ${data.position}`)}&body=${encodeURIComponent(body)}`;
}