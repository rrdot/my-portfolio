"use client";
import { useState } from "react";
import { ArrowUpRight, LoaderCircle, CheckCircle2 } from "lucide-react";
import { validateContact } from "@/lib/contact-validation";
export function ContactForm() {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [feedback, setFeedback] = useState("");
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const input = Object.fromEntries(new FormData(form));
    const validation = validateContact(input);
    if (!validation.data) {
      setStatus("error");
      setFeedback(validation.error || "Check your details.");
      return;
    }
    setStatus("loading");
    setFeedback("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validation.data),
        signal: AbortSignal.timeout(15000),
      });
      const result: { error?: string; message?: string } =
        await response.json();
      if (!response.ok)
        throw new Error(
          result.error || "Something went wrong. Please try again.",
        );
      setStatus("success");
      setFeedback(result.message || "Your message has been sent.");
      form.reset();
    } catch (error) {
      setStatus("error");
      setFeedback(
        error instanceof Error && error.name !== "TimeoutError"
          ? error.message
          : "The request timed out. Please try again or email me directly.",
      );
    }
  }
  return (
    <form className="contact-form" onSubmit={submit}>
      <div className="form-row">
        <label>
          Your name
          <input
            name="name"
            placeholder="Alex Smith"
            autoComplete="name"
            required
            maxLength={100}
          />
        </label>
        <label>
          Email address
          <input
            name="email"
            type="email"
            placeholder="alex@company.com"
            autoComplete="email"
            required
            maxLength={254}
          />
        </label>
      </div>
      <label>
        Subject
        <input
          name="subject"
          placeholder="Let’s talk about an opportunity"
          required
          maxLength={150}
        />
      </label>
      <label>
        Message
        <textarea
          name="message"
          placeholder="Tell me a little about what you have in mind…"
          rows={4}
          required
          maxLength={5000}
        />
      </label>
      <div className="honeypot" aria-hidden="true">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <div className="form-bottom">
        <span>Let’s start a conversation.</span>
        <button
          className="button primary"
          disabled={status === "loading"}
          type="submit"
        >
          {status === "loading" ? "Sending…" : "Send message"}
          {status === "loading" ? (
            <LoaderCircle className="spin" size={17} />
          ) : (
            <ArrowUpRight size={17} />
          )}
        </button>
      </div>
      <div aria-live="polite" aria-atomic="true">
        {feedback && (
          <p
            className={`form-feedback ${status}`}
            role={status === "error" ? "alert" : "status"}
          >
            {status === "success" && <CheckCircle2 size={18} />} {feedback}
          </p>
        )}
      </div>
    </form>
  );
}
