// components/QuoteModal.tsx
"use client";

import { useState } from "react";

interface Props {
  isOpen: boolean;
  originalText: string;
  onCancel: () => void;
  onConfirm: (followUp: string) => void;
}

export default function QuoteModal({ isOpen, originalText, onCancel, onConfirm }: Props) {
  const [question, setQuestion] = useState("");

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="absolute inset-0 bg-black/40" onClick={onCancel} />
      <div className="relative m-auto w-80 bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-lg font-semibold mb-2">Ask more about:</h2>
        <blockquote className="border-l-4 border-gray-300 pl-3 italic text-gray-700 mb-4">
          {originalText}
        </blockquote>
        <textarea
          rows={3}
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Your follow-up question…"
          className="w-full border px-2 py-1 rounded mb-4"
        />
        <div className="flex justify-end gap-2">
          <button onClick={onCancel} className="px-4 py-2 border rounded">
            Cancel
          </button>
          <button
            onClick={() => {
              if (!question.trim()) return alert("Please type a question.");
              onConfirm(question.trim());
            }}
            className="px-4 py-2 bg-gray-900 text-white rounded"
          >
            Ask
          </button>
        </div>
      </div>
    </div>
  );
}
