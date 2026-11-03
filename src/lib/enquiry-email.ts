export const enquiryRecipient = "dicsblr@gmail.com";
export const enquiryEmailEndpoint = `https://formsubmit.co/ajax/${enquiryRecipient}`;
// FormSubmit activates delivery per website address. This address is already
// activated for dicsblr@gmail.com, so every copy of the site reports it.
export const enquiryActivatedOrigin = "https://pixel-perfect-check-16.krishnegowda2021.workers.dev";

export function enquiryEmailAccepted(result: unknown): boolean {
  if (!result || typeof result !== "object" || !("success" in result)) return false;
  return result.success === true || result.success === "true";
}
