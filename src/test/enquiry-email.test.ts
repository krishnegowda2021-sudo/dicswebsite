import { describe, expect, it } from "vitest";
import { enquiryEmailEndpoint, enquiryEmailAccepted } from "@/lib/enquiry-email";

describe("Enquiry notification", () => {
  it("uses the owner's requested FormSubmit destination", () => {
    expect(enquiryEmailEndpoint).toBe("https://formsubmit.co/ajax/dicsblr@gmail.com");
  });
  it("does not treat rejection as accepted delivery", () => {
    expect(enquiryEmailAccepted({ success: "false" })).toBe(false);
    expect(enquiryEmailAccepted({ success: "true" })).toBe(true);
    expect(enquiryEmailAccepted(null)).toBe(false);
  });
});