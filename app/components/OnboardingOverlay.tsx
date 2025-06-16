// components/OnboardingOverlay.tsx
"use client";
import { useState, useEffect } from "react";

const slides = [
  { title: "What is Medicare?", content: "Medicare is health insurance for people 65+ or with certain disabilities." },
  { title: "Parts of Medicare", content: "Part A (Hospital), Part B (Medical), Part C (Advantage), Part D (Drugs)." },
  { title: "Coverage Details", content: "Original Medicare covers 80% of allowed amounts; Advantage plans bundle extra benefits." },
  { title: "Choosing a Plan", content: "Compare premiums, deductibles, and out-of-pocket limits to find the right plan." },
];

export default function OnboardingOverlay({ isOpen, onClose }: { isOpen: boolean; onClose(): void }) {
  const [current, setCurrent] = useState(0);
  useEffect(() => { if (isOpen) setCurrent(0); }, [isOpen]);
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white/90 backdrop-blur flex items-center justify-center z-50 transition-transform duration-500 ease-in-out">
      <div className="bg-gray-50 border p-6 rounded-lg max-w-lg w-full">
        <h2 className="text-xl font-semibold mb-4">{slides[current].title}</h2>
        <p className="mb-6">{slides[current].content}</p>
        <div className="flex justify-between items-center">
          <button onClick={() => setCurrent((c) => Math.max(c-1,0))} disabled={current===0} className="px-4 py-2 border rounded disabled:opacity-50">Back</button>
          <div className="space-x-1">
            {slides.map((_,i)=><span key={i} className={`inline-block w-2 h-2 rounded-full ${i===current?'bg-gray-900':'bg-gray-300'}`}/>)}
          </div>
          {current<slides.length-1
            ? <button onClick={() => setCurrent((c)=>c+1)} className="px-4 py-2 bg-gray-900 text-gray-50 rounded">Next</button>
            : <button onClick={onClose} className="px-4 py-2 bg-gray-900 text-gray-50 rounded">Done</button>
          }
        </div>
      </div>
    </div>
  );
}
