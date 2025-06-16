// components/EmailModal.tsx
"use client";

import { useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  chatTranscript: string;
}

export default function EmailModal({ isOpen, onClose, chatTranscript }: Props) {
  const [toEmail, setToEmail] = useState("");
  const [sending, setSending] = useState(false);

  // Use your Public Key env var here:
  const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;
  const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
  const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!;

  const handleSend = async () => {
    if (!/\S+@\S+\.\S+/.test(toEmail)) {
      alert("Please enter a valid email address.");
      return;
    }
    setSending(true);

    try {
      const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_id: SERVICE_ID,
          template_id: TEMPLATE_ID,
          user_id: PUBLIC_KEY,
          template_params: {
            to_email: toEmail,
            subject: "Your Medicare Chat Transcript",
            message: chatTranscript,
          },
        }),
      });

      const text = await res.text();
      if (!res.ok) {
        console.error("EmailJS REST error:", res.status, text);
        throw new Error(`Status ${res.status}: ${text}`);
      }

      console.log("EmailJS REST success:", text);
      alert("Email sent successfully!");
      onClose();
    } catch (err: any) {
      console.error("EmailJS REST failed:", err);
      alert(`Failed to send email: ${err.message}`);
    } finally {
      setSending(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 p-6 border border-gray-200">
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Email Chat Transcript
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Recipient Email
            </label>
            <input
              type="email"
              value={toEmail}
              onChange={(e) => setToEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg
                        focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                        placeholder-gray-400 text-gray-700 disabled:opacity-50"
              disabled={sending}
            />
          </div>

          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="text-sm font-semibold text-gray-600 mb-3">
              Chat Preview
            </h3>
            <div className="text-gray-700 text-sm leading-relaxed max-h-48 overflow-y-auto">
              {chatTranscript}
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-5 py-2.5 text-gray-600 hover:text-gray-800 
                        border border-gray-300 rounded-lg hover:bg-gray-50
                        disabled:opacity-50 transition-colors duration-200"
              disabled={sending}
            >
              Cancel
            </button>
            <button
              onClick={handleSend}
              className={`px-5 py-2.5 rounded-lg font-medium transition-colors duration-200
                ${sending 
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed" 
                  : "bg-blue-600 text-white hover:bg-blue-700"}`}
              disabled={sending}
            >
              {sending ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Sending...
                </span>
              ) : (
                "Send Email"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}