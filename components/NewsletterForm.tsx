"use client";

import { useState } from "react";

const GOOGLE_FORM_ACTION =
  "https://docs.google.com/forms/d/e/REPLACE_WITH_FORM_ID/formResponse";
const EMAIL_FIELD_NAME = "entry.REPLACE_WITH_ENTRY_ID";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      const body = new FormData();
      body.append(EMAIL_FIELD_NAME, email);
      await fetch(GOOGLE_FORM_ACTION, { method: "POST", mode: "no-cors", body });
    } catch {
      // no-cors means we always get an opaque response; treat as success
    }
    setSubmitted(true);
    setLoading(false);
  }

  if (submitted) {
    return (
      <div className="text-center py-4">
        <p className="text-[#7c3aed] font-semibold text-lg">You&apos;re in!</p>
        <p className="text-[#666666] text-sm mt-1">
          We&apos;ll ping you when the next drop lands.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        required
        className="flex-1 bg-[#111111] border border-[#222222] rounded-lg px-4 py-2.5 text-sm text-white placeholder-[#444444] focus:outline-none focus:border-[#7c3aed] transition-colors"
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-[#7c3aed] hover:bg-[#6d28d9] disabled:opacity-50 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors whitespace-nowrap"
      >
        {loading ? "Joining..." : "Notify me"}
      </button>
    </form>
  );
}
