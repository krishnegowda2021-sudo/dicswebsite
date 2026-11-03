import { describe, expect, it } from "vitest";
import { careerApplicationSchema, careerEmailUrl } from "@/lib/careers";

const application = { fullName: "Test Candidate", email: "candidate@example.com", phone: "+91 9876543210", position: "PLC Programmer", experience: "3", skills: "PLC & HMI programming", message: "Application for engineering", consent: true };
describe("Careers application email", () => {
  it("validates and encodes candidate details", () => {
    const url = careerEmailUrl("bangalore@dicsglobal.com", application);
    expect(url).toContain("mailto:bangalore@dicsglobal.com?");
    expect(decodeURIComponent(url)).toContain("PLC & HMI programming");
    expect(decodeURIComponent(url)).toContain("Years of experience: 3");
    expect(decodeURIComponent(url)).toContain("attach before sending");
  });
  it("rejects missing consent, invalid emails and negative experience", () => {
    for (const change of [{ consent: false }, { email: "invalid" }, { experience: -1 }, { phone: "<script>" }, { fullName: "" }]) {
      expect(careerApplicationSchema.safeParse({ ...application, ...change }).success).toBe(false);
    }
  });
  it("addresses both recruitment inboxes safely", () => {
    expect(careerEmailUrl("bangalore@dicsglobal.com,dicsblr@gmail.com", application)).toContain("mailto:bangalore@dicsglobal.com,dicsblr@gmail.com?");
    expect(() => careerEmailUrl("bangalore@dicsglobal.com,invalid", application)).toThrow();
  });
});