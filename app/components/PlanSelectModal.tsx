// components/PlanSelectModal.tsx
"use client";

import { useEffect, useState, useRef } from "react";

interface Props {
  isOpen: boolean;
  onClose: (selectedUrl: string) => void;
}

interface Plan {
  name: string;
  url: string;
}

export default function PlanSelectModal({ isOpen, onClose }: Props) {
  const [availablePlans, setAvailablePlans] = useState<Plan[]>([]);
  const [selectedUrl, setSelectedUrl] = useState("");
  const fileInput = useRef<HTMLInputElement>(null);

  // load savedPlans
  useEffect(() => {
    const saved: Plan[] =
      JSON.parse(localStorage.getItem("savedPlans") || "[]");
    setAvailablePlans(saved);
  }, [isOpen]);

  // persist any new plans
  useEffect(() => {
    localStorage.setItem("savedPlans", JSON.stringify(availablePlans));
  }, [availablePlans]);

  const handleAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (availablePlans.some((p) => p.name === file.name)) {
      alert(`"${file.name}" already exists.`);
      return;
    }
    const url = URL.createObjectURL(file);
    const plan = { name: file.name, url };
    setAvailablePlans((p) => [...p, plan]);
    setSelectedUrl(url);
    e.target.value = "";
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex">
      <div
        className="absolute inset-0 bg-black/40"
        onClick={() => onClose("")}
      />
      <div className="relative m-auto w-80 bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Select Your Plan</h2>
        <div className="mb-4">
          <label className="block mb-1">Choose a plan:</label>
          <div className="flex gap-2">
            <select
              className="flex-1 border px-2 py-1 rounded"
              value={selectedUrl}
              onChange={(e) => setSelectedUrl(e.target.value)}
            >
              <option value="">— select —</option>
              {availablePlans.map((p, i) => (
                <option key={i} value={p.url}>
                  {p.name}
                </option>
              ))}
            </select>
            <button
              onClick={() => fileInput.current?.click()}
              className="px-3 py-1 bg-gray-200 rounded"
            >
              + Add
            </button>
            <input
              ref={fileInput}
              type="file"
              accept="application/pdf"
              onChange={handleAdd}
              className="hidden"
            />
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <button
            onClick={() => onClose("")}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              if (!selectedUrl) {
                alert("Please select or add a plan first.");
                return;
              }
              // save chosen plan for chat
              localStorage.setItem("currentPlanUrl", selectedUrl);
              onClose(selectedUrl);
            }}
            className="px-4 py-2 bg-gray-900 text-white rounded"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
