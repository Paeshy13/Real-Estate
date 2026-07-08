"use client";

import { useState } from "react";
import { sendInquiry } from "@/lib/api";

export default function InquiryForm({ listingId }: { listingId: string }) {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

    if (!token) {
      setStatus("error");
      return;
    }

    setStatus("sending");
    try {
      await sendInquiry(listingId, message, token);
      setStatus("sent");
      setMessage("");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return <p className="text-green-600 text-sm">Your inquiry has been sent!</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="I'm interested in this property..."
        className="border rounded-md p-2 text-sm h-24"
        required
      />
      <button
        type="submit"
        disabled={status === "sending"}
        className="bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium py-2 rounded-md disabled:opacity-50"
      >
        {status === "sending" ? "Sending..." : "Contact Agent"}
      </button>
      {status === "error" && (
        <p className="text-red-500 text-xs">
          Please log in first to send an inquiry.
        </p>
      )}
    </form>
  );
}
