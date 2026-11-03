export const enquiryRecipient = "dicsblr@gmail.com";
export const enquiryEmailEndpoint = `https://formsubmit.co/ajax/${enquiryRecipient}`;

export function enquiryEmailAccepted(result: unknown): boolean {
  if (!result || typeof result !== "object" || !("success" in result)) return false;
  return result.success === true || result.success === "true";
}