"use client";

import { useState } from "react";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [feedback, setFeedback] = useState("");

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setStatus("loading");
    setFeedback("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, website }),
      });
      const data = (await res.json()) as { error?: string; message?: string };
      if (!res.ok) {
        setStatus("error");
        setFeedback(data.error ?? "Could not send message.");
        return;
      }
      setStatus("success");
      setFeedback(data.message ?? "Thank you! Your message has been sent.");
      setName("");
      setEmail("");
      setMessage("");
      setWebsite("");
    } catch {
      setStatus("error");
      setFeedback("Something went wrong. Please try again.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-8 grid gap-4">
      <input
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="h-12 rounded-xl bg-white/60 px-4 text-sm ring-1 ring-black/10 placeholder:text-black/40 focus:outline-none focus:ring-2 focus:ring-[color:var(--lsi-terracotta)]"
        placeholder="Name"
        required
      />
      <input
        name="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="h-12 rounded-xl bg-white/60 px-4 text-sm ring-1 ring-black/10 placeholder:text-black/40 focus:outline-none focus:ring-2 focus:ring-[color:var(--lsi-terracotta)]"
        placeholder="Email"
        required
      />
      <textarea
        name="message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="min-h-32 rounded-xl bg-white/60 px-4 py-3 text-sm ring-1 ring-black/10 placeholder:text-black/40 focus:outline-none focus:ring-2 focus:ring-[color:var(--lsi-terracotta)]"
        placeholder="Message"
        required
      />
      <input
        name="website"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="h-12 rounded-xl bg-[color:var(--lsi-bronze)] px-6 text-sm font-semibold text-white ring-1 ring-white/10 transition hover:brightness-110 disabled:opacity-60"
      >
        {status === "loading" ? "Sending…" : "Send"}
      </button>
      {feedback ? (
        <p
          className={`text-sm ${status === "error" ? "text-red-600" : "text-[color:var(--lsi-slate)]"}`}
          role="status"
        >
          {feedback}
        </p>
      ) : null}
    </form>
  );
}
