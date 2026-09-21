import { NextResponse } from "next/server";
import { validateContact } from "@/lib/contact-validation";
import { sendContactEmail } from "@/lib/mail";
import { allowContactSubmission } from "@/lib/contact-rate-limit";
import { siteUrl } from "@/lib/utils";
export const runtime = "nodejs";
export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  const expectedOrigin = new URL(siteUrl()).origin;
  if (!origin || origin !== expectedOrigin)
    return NextResponse.json(
      { error: "This request could not be verified." },
      { status: 403 },
    );
  if (!request.headers.get("content-type")?.includes("application/json"))
    return NextResponse.json(
      { error: "Unsupported request format." },
      { status: 415 },
    );
  try {
    // Bound streamed input as well as declared content length.
    const reader = request.body?.getReader();
    if (!reader)
      return NextResponse.json(
        { error: "An empty request was received." },
        { status: 400 },
      );
    const chunks: Uint8Array[] = [];
    let size = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 24000) {
        await reader.cancel();
        return NextResponse.json(
          { error: "Your message is too long." },
          { status: 413 },
        );
      }
      chunks.push(value);
    }
    const raw = JSON.parse(Buffer.concat(chunks).toString("utf8")) as unknown;
    const { data, error } = validateContact(raw);
    if (!data) return NextResponse.json({ error }, { status: 400 });
    if (data.website)
      return NextResponse.json(
        { error: "This request could not be verified." },
        { status: 400 },
      );
    if (!allowContactSubmission())
      return NextResponse.json(
        {
          error:
            "Too many messages right now. Please wait a minute or email me directly.",
        },
        { status: 429, headers: { "Retry-After": "60" } },
      );
    await sendContactEmail(data);
    return NextResponse.json({
      message: "Thanks for reaching out. Your message has been sent.",
    });
  } catch (error) {
    if (error instanceof SyntaxError)
      return NextResponse.json({ error: "Invalid request." }, { status: 400 });
    return NextResponse.json(
      {
        error:
          "Email delivery is currently unavailable. Please email me directly using the address beside this form.",
      },
      { status: 503 },
    );
  }
}
