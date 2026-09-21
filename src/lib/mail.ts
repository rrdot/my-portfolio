import type { ContactInput } from "./contact-validation";
// This module is imported only by the server route. Never import it in a client component.
export async function sendContactEmail(data: ContactInput) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM;
  const to = process.env.CONTACT_EMAIL;
  if (!apiKey || !from || !to) throw new Error("NOT_CONFIGURED");
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: data.email,
      subject: `Portfolio: ${data.subject}`,
      text: `From: ${data.name} <${data.email}>\n\n${data.message}`,
    }),
    signal: AbortSignal.timeout(10000),
  });
  if (!response.ok) throw new Error("DELIVERY_FAILED");
}
