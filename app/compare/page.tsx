"use client";

import { useState } from "react";
import { FaBalanceScale, FaChevronDown, FaComments } from "react-icons/fa";
import { useRouter } from "next/navigation";

const medicarePlans = {
  "AARP": {
    overview: {
      "Star rating": "★★★★☆",
      "Health deductible": "$0",
      "Drug plan deductible": "$0",
      "Maximum you pay for health services": "$800",
      "Health premium": "$0 (no separate monthly plan premium)"
    },
    details: {
      "Primary doctor visit": "$0 copay",
      "Specialist visit": "$25 copay",
      "Diagnostic tests & procedures": "Varies by service",
      "Lab services": "$0 copay",
      "Diagnostic radiology services (like MRI)": "$0–$175 copay",
      "Outpatient x-rays": "$0 copay",
      "Emergency care": "$75 copay per visit",
      "Urgent care": "$65 copay per visit",
      "Inpatient hospital coverage": "$0 copay per stay",
      "Outpatient hospital coverage": "$0 copay per visit",
      "Preventive services": "$0 copay",
      "Prescription hearing aids": "$0 copay",
      "Over-the-counter hearing aids": "Not covered",
      "Oral exams": "$0 copay",
      "Dental X-rays": "$0 copay",
      "Cleaning": "$0 copay",
      "Restorative services": "$0 copay",
      "Periodontics": "$0 copay",
      "Oral and maxillofacial surgery": "$0 copay",
      "Eyeglasses (frames & lenses)": "Up to $300 credit",
      "Transportation": "$90 copay per one-way trip",
      "Skilled nursing facility": "Covered up to 100 days; $0 copay",
      "Durable medical equipment": "20% coinsurance",
      "Diabetes supplies": "$0 copay"
    }
  },
  "Blue Cross Medicare Advantage Classic (PPO)": {
    overview: {
      "Star rating": "★★★★☆",
      "Health deductible": "$0",
      "Drug plan deductible": "$200 (Tiers 3-5)",
      "Maximum you pay for health services": "$4,900 In-network annual maximum",
      "Health premium": "$0 (no separate monthly plan premium)"
    },
    details: {
      "Primary doctor visit": "$0 copay in-network; $35 copay out-of-network",
      "Specialist visit": "$30 copay in-network; $75 copay out-of-network",
      "Diagnostic tests & procedures": "$0 copay in-network; 20% coinsurance out-of-network",
      "Lab services": "$0 copay in-network; $0 copay out-of-network",
      "Diagnostic radiology services (like MRI)": "$0–$200 copay",
      "Outpatient x-rays": "$0 copay in-network; $20 copay out-of-network",
      "Emergency care": "Covered at same rate in/out-of-network",
      "Urgent care": "$65 copay in-network; covered out-of-network",
      "Inpatient hospital coverage": "$320/day days 1-6; $0 thereafter",
      "Outpatient hospital coverage": "$0–$175 copay in-network; $250 out-of-network",
      "Preventive services": "$0 copay",
      "Transportation": "Optional supplemental benefit",
      "Skilled nursing facility": "Covered per Medicare guidelines",
      "Durable medical equipment": "20% coinsurance",
      "Diabetes supplies": "$0 copay"
    }
  },
  "Medica": {
    overview: {
      "Star rating": "★★★★☆☆",
      "Health deductible": "$0",
      "Drug plan deductible": "$0.00",
      "Maximum you pay for health services": "$2,000 combined out-of-pocket maximum (in-network only)",
      "Health premium": "See Section 1.4 of EOC"
    },
    details: {
      "Primary doctor visit": "$0 copay",
      "Specialist visit": "$25 copay per visit",
      "Diagnostic tests & procedures": "$0–$25 copay",
      "Lab services": "$0–$50 copay",
      "Diagnostic radiology services (like MRI)": "$0–$175 copay",
      "Outpatient x-rays": "$0–$25 copay",
      "Emergency care": "$140 copay per visit (always covered)",
      "Urgent care": "$65 copay per visit (always covered)",
      "Inpatient hospital coverage": "$150/day for days 1–7; $0/day for days 8–90",
      "Outpatient hospital coverage": "$0–$175 copay per visit",
      "Preventive services": "$0 copay",
      "Prescription hearing aids": "In-network: $399–$1,800 copay",
      "Over-the-counter hearing aids": "Not covered",
      "Oral exams": "In-network: $0 copay",
      "Dental X-rays": "In-network: $0 copay",
      "Cleaning": "In-network: $0 copay",
      "Restorative services": "In-network: $0–$550 copay",
      "Periodontics": "In-network: $0–$595 copay",
      "Oral and maxillofacial surgery": "In-network: $0 copay",
      "Eyeglasses (frames & lenses)": "$0 copay",
      "Transportation": "$0 copay",
      "Skilled nursing facility": "$20/day for days 1–20; $214/day for days 21–100",
      "Durable medical equipment": "20% coinsurance per item",
      "Diabetes supplies": "$0 copay"
    }
  },
  "Wellcare Premium Ultra Open (PPO)": {
    overview: {
      "Star rating": "★★★★☆☆",
      "Health deductible": "$175",
      "Drug plan deductible": "$0 for Tier 1 & 2; $420 for Tier 3–5 drugs",
      "Maximum you pay for health services": "In-network: $4,000 | Combined: $6,200",
      "Health premium": "See Section 1.4 of EOC"
    },
    details: {
      "Primary doctor visit": "$0 copay",
      "Specialist visit": "$25 copay per visit",
      "Diagnostic tests & procedures": "$0–$25 copay",
      "Lab services": "$0 copay",
      "Diagnostic radiology services (like MRI)": "$0–$200 copay",
      "Outpatient x-rays": "$20 copay",
      "Emergency care": "$90 copay per visit (always covered)",
      "Urgent care": "$45 copay per visit (always covered)",
      "Inpatient hospital coverage": "$195/day for days 1–5; $0/day for days 6–90",
      "Outpatient hospital coverage": "$250 copay per visit",
      "Preventive services": "$0 copay",
      "Prescription hearing aids": "In-network: $0 copay",
      "Over-the-counter hearing aids": "Not covered",
      "Oral exams": "In-network: $0 copay",
      "Dental X-rays": "In-network: $0 copay",
      "Cleaning": "In-network: $0 copay",
      "Restorative services": "In-network: $0 copay",
      "Periodontics": "In-network: $0 copay",
      "Oral and maxillofacial surgery": "In-network: $0 copay",
      "Eyeglasses (frames & lenses)": "$0 copay",
      "Transportation": "Not covered",
      "Skilled nursing facility": "$0 per day for days 1–20; $214 per day for days 21–100",
      "Durable medical equipment": "20% coinsurance per item",
      "Diabetes supplies": "$0 copay"
    }
  },
  "Cigna Preferred Medicare (HMO)": {
    overview: {
      "Star rating": "★★★★☆☆",
      "Health deductible": "$0",
      "Drug plan deductible": "$0",
      "Maximum you pay for health services": "In-network MOOP: $4,200/year",
      "Health premium": "See Section 1.4 of EOC"
    },
    details: {
      "Primary doctor visit": "$0 copay at network PCP",
      "Specialist visit": "$20 copay per visit",
      "Diagnostic tests & procedures": "$0 or $35 copay",
      "Lab services": "$0 copay",
      "Diagnostic radiology services (like MRI)": "$0 or $175 copay",
      "Outpatient x-rays": "$0 or $25 copay",
      "Emergency care": "$90 copay per visit (always covered)",
      "Urgent care": "$45 copay per visit (always covered)",
      "Inpatient hospital coverage": "20% coinsurance after deductible (days 1–90)",
      "Outpatient hospital coverage": "$250 copay per visit",
      "Preventive services": "$0 copay",
      "Prescription hearing aids": "Cost-share varies by device",
      "Over-the-counter hearing aids": "Not covered",
      "Oral exams": "$0 copay",
      "Dental X-rays": "$0 copay",
      "Cleaning": "$0 copay",
      "Restorative services": "$0 copay",
      "Periodontics": "$0 copay",
      "Oral and maxillofacial surgery": "$0 copay",
      "Eyeglasses (frames & lenses)": "$0 copay",
      "Transportation": "Not covered",
      "Skilled nursing facility": "$0/day days 1–20; $214/day days 21–100",
      "Durable medical equipment": "20% coinsurance per item",
      "Diabetes supplies": "$0 copay"
    }
  },
  "Humana Group Medicare Advantage PPO Plan": {
    overview: {
      "Star rating": "★★★★☆",
      "Health deductible": "$150",
      "Drug plan deductible": "None",
      "Maximum you pay for health services": "In-network MOOP: $3,400",
      "Health premium": "See EOC Chapter 1, Section 4"
    },
    details: {
      "Primary doctor visit": "$0 copay",
      "Specialist visit": "$25 copay per visit",
      "Diagnostic tests & procedures": "$0–$25 copay",
      "Lab services": "$0 copay",
      "Diagnostic radiology services (like MRI)": "$0–$200 copay",
      "Outpatient x-rays": "$20 copay",
      "Emergency care": "$90 copay per visit",
      "Urgent care": "$45 copay per visit",
      "Inpatient hospital coverage": "$195/day days 1–5; $0/day days 6–90",
      "Outpatient hospital coverage": "$250 copay per visit",
      "Preventive services": "$0 copay",
      "Prescription hearing aids": "In-network: $0 copay",
      "Over-the-counter hearing aids": "Not covered",
      "Oral exams": "In-network: $0 copay",
      "Dental X-rays": "In-network: $0 copay",
      "Cleaning": "In-network: $0 copay",
      "Restorative services": "In-network: $0 copay",
      "Periodontics": "In-network: $0 copay",
      "Oral and maxillofacial surgery": "In-network: $0 copay",
      "Eyeglasses (frames & lenses)": "$0 copay",
      "Transportation": "Not covered",
      "Skilled nursing facility": "$0/day days 1–20; $214/day days 21–100",
      "Durable medical equipment": "20% coinsurance per item",
      "Diabetes supplies": "$0 copay"
    }
  },
  "AARP Medicare Advantage from UHC OR-0001 (PPO)": {
    overview: {
      "Star rating": "★★★★☆",
      "Health deductible": "$0",
      "Drug plan deductible": "$0",
      "Maximum you pay for health services": "In-network MOOP: $4,200",
      "Health premium": "See EOC Chapter 1, Section 4"
    },
    details: {
      "Primary doctor visit": "$0 copay",
      "Specialist visit": "$20 copay per visit",
      "Diagnostic tests & procedures": "$0 or $35 copay",
      "Lab services": "$0 copay",
      "Diagnostic radiology services (like MRI)": "$0 or $175 copay",
      "Outpatient x-rays": "$0 or $25 copay",
      "Emergency care": "$90 copay per visit",
      "Urgent care": "$45 copay per visit",
      "Inpatient hospital coverage": "20% coinsurance after deductible",
      "Outpatient hospital coverage": "$250 copay per visit",
      "Preventive services": "$0 copay",
      "Prescription hearing aids": "Cost-share varies by device",
      "Over-the-counter hearing aids": "Not covered",
      "Oral exams": "$0 copay",
      "Dental X-rays": "$0 copay",
      "Cleaning": "$0 copay",
      "Restorative services": "$0 copay",
      "Periodontics": "$0 copay",
      "Oral and maxillofacial surgery": "$0 copay",
      "Eyeglasses (frames & lenses)": "$0 copay",
      "Transportation": "Not covered",
      "Skilled nursing facility": "$0/day days 1–20; $214/day days 21–100",
      "Durable medical equipment": "20% coinsurance per item",
      "Diabetes supplies": "$0 copay"
    }
  },
  "Aetna Medicare Core (PPO)": {
    overview: {
      "Star rating": "★★★☆☆",
      "Health deductible": "$175",
      "Drug plan deductible": "$590 for Tier 3–5",
      "Maximum you pay for health services": "In-network MOOP: $4,200",
      "Health premium": "$0 (excl. Part B)"
    },
    details: {
      "Primary doctor visit": "$0 copay at PCP",
      "Specialist visit": "$20 copay per visit",
      "Diagnostic tests & procedures": "$0 or $35 copay",
      "Lab services": "$0 copay",
      "Diagnostic radiology services (like MRI)": "$0 or $175 copay",
      "Outpatient x-rays": "$0 or $25 copay",
      "Emergency care": "$90 copay per visit",
      "Urgent care": "$45 copay per visit",
      "Inpatient hospital coverage": "20% coinsurance after deductible",
      "Outpatient hospital coverage": "$250 copay per visit",
      "Preventive services": "$0 copay",
      "Prescription hearing aids": "Cost-share varies",
      "Over-the-counter hearing aids": "Not covered",
      "Oral exams": "$0 copay",
      "Dental X-rays": "$0 copay",
      "Cleaning": "$0 copay",
      "Restorative services": "$0 copay",
      "Periodontics": "$0 copay",
      "Oral and maxillofacial surgery": "$0 copay",
      "Eyeglasses (frames & lenses)": "$0 copay",
      "Transportation": "Not covered",
      "Skilled nursing facility": "$0/day days 1–20; $214/day days 21–100",
      "Durable medical equipment": "20% coinsurance per item",
      "Diabetes supplies": "$0 copay"
    }
  },
  "Mutual of Omaha Medicare Advantage Solution PPO": {
    overview: {
      "Star rating": "★★★★☆",
      "Health deductible": "$0",
      "Drug plan deductible": "$0",
      "Maximum you pay for health services": "Combined MOOP $2,000",
      "Health premium": "See Section 1.4 of EOC"
    },
    details: {
      "Primary doctor visit": "$0 copay",
      "Specialist visit": "$25 copay per visit",
      "Diagnostic tests & procedures": "$0–$25 copay",
      "Lab services": "$0–$50 copay",
      "Diagnostic radiology services (like MRI)": "$0–$175 copay",
      "Outpatient x-rays": "$0–$25 copay",
      "Emergency care": "$140 copay per visit",
      "Urgent care": "$65 copay per visit",
      "Inpatient hospital coverage": "$150/day days 1–7; $0/day days 8–90",
      "Outpatient hospital coverage": "$0–$175 copay per visit",
      "Preventive services": "$0 copay",
      "Prescription hearing aids": "$399–$1,800 copay",
      "Over-the-counter hearing aids": "Not covered",
      "Oral exams": "$0 copay",
      "Dental X-rays": "$0 copay",
      "Cleaning": "$0 copay",
      "Restorative services": "$0–$550 copay",
      "Periodontics": "$0–$595 copay",
      "Oral and maxillofacial surgery": "$0 copay",
      "Eyeglasses (frames & lenses)": "$0 copay",
      "Transportation": "$0 copay",
      "Skilled nursing facility": "$20/day days 1–20; $214/day days 21–100",
      "Durable medical equipment": "20% coinsurance per item",
      "Diabetes supplies": "$0 copay"
    }
  }
};

export default function ComparePage() {
  const router = useRouter();
  const [leftPlan, setLeftPlan] = useState("");
  const [rightPlan, setRightPlan] = useState("");
  const [showComparison, setShowComparison] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const comparePlans = () => {
    if (leftPlan && rightPlan) {
      setIsLoading(true);
      setTimeout(() => {
        setShowComparison(true);
        setIsLoading(false);
      }, 3000);
    }
  };

  const goToChatWithPlans = () => {
    if (leftPlan && rightPlan) {
      const encodedA = encodeURIComponent(leftPlan);
      const encodedB = encodeURIComponent(rightPlan);
      router.push(`/chat?plan=${encodedA}&planB=${encodedB}`);
    } else {
      alert("Please select two plans before chatting.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-2">
          <FaBalanceScale className="text-blue-500" /> Plan Comparison
        </h1>

        <div className="flex gap-4 mb-8 flex-col md:flex-row">
          {/* Plan selection inputs */}
          <div className="flex-1">
            <div className="relative">
              <select
                value={leftPlan}
                onChange={(e) => setLeftPlan(e.target.value)}
                className="w-full p-3 border-2 border-gray-300 rounded-lg bg-white text-gray-800 appearance-none focus:ring-4 focus:ring-blue-300"
                disabled={isLoading}
              >
                <option value="">Select First Plan</option>
                {Object.keys(medicarePlans).map((plan) => (
                  <option key={plan} value={plan}>{plan}</option>
                ))}
              </select>
              <FaChevronDown className="absolute right-3 top-4 text-gray-500" />
            </div>
          </div>

          <div className="flex-1">
            <div className="relative">
              <select
                value={rightPlan}
                onChange={(e) => setRightPlan(e.target.value)}
                className="w-full p-3 border-2 border-gray-300 rounded-lg bg-white text-gray-800 appearance-none focus:ring-4 focus:ring-blue-300"
                disabled={isLoading}
              >
                <option value="">Select Second Plan</option>
                {Object.keys(medicarePlans).map((plan) => (
                  <option key={plan} value={plan}>{plan}</option>
                ))}
              </select>
              <FaChevronDown className="absolute right-3 top-4 text-gray-500" />
            </div>
          </div>

          <button
            onClick={comparePlans}
            disabled={!leftPlan || !rightPlan || isLoading}
            className={`px-6 py-3 bg-gradient-to-r from-blue-400 to-purple-400 text-white rounded-lg transition-opacity flex items-center gap-2 h-fit ${
              isLoading ? "opacity-75 cursor-not-allowed" : "hover:opacity-90"
            }`}
          >
            {isLoading ? (
              <>
                <span className="animate-spin">⏳</span>
                Comparing...
              </>
            ) : (
              "Compare Plans"
            )}
          </button>
        </div>

        {showComparison && (
          <div className="bg-white rounded-xl shadow-lg p-6 animate-fade-in">
            {/* Overview Section */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-white mb-4 p-3 bg-gradient-to-r from-blue-400 to-purple-400 rounded-lg">
                Overview
              </h2>
              <div className="grid gap-4">
                {Object.entries(medicarePlans[leftPlan]?.overview || {}).map(([field, value]) => (
                  <div key={field} className="space-y-2">
                    <div className="text-gray-700 font-medium p-2 bg-blue-50 rounded-md">{field}</div>
                    <div className="flex gap-4 flex-col md:flex-row">
                      <div className="flex-1 p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border border-blue-100">
                        <span className="font-semibold text-blue-600">{leftPlan}:</span>
                        <p className="text-gray-700 mt-1">{value}</p>
                      </div>
                      <div className="flex-1 p-4 bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl border border-purple-100">
                        <span className="font-semibold text-purple-600">{rightPlan}:</span>
                        <p className="text-gray-700 mt-1">{medicarePlans[rightPlan]?.overview[field]}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Detailed Comparison */}
            <div>
              <h2 className="text-xl font-semibold text-white mb-4 p-3 bg-gradient-to-r from-purple-400 to-blue-400 rounded-lg">
                Detailed Benefits Comparison
              </h2>
              <div className="space-y-4">
                {Object.entries(medicarePlans[leftPlan]?.details || {}).map(([field, value]) => (
                  <div key={field} className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                    <div className="text-gray-700 p-3 font-medium bg-blue-50 rounded-md">{field}</div>
                    <div className="flex gap-4 flex-col md:flex-row">
                      <div className="flex-1 p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border border-blue-100">
                        <p className="text-gray-700">{value}</p>
                      </div>
                      <div className="flex-1 p-4 bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl border border-purple-100">
                        <p className="text-gray-700">{medicarePlans[rightPlan]?.details[field]}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Chatbot Redirection Section */}
        <div className="mt-12 text-center">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-2xl mx-auto">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Need Help Deciding?
            </h3>
            <button
              onClick={goToChatWithPlans}
              className="px-8 py-4 bg-gradient-to-r from-blue-400 to-purple-400 text-white rounded-xl hover:scale-[1.02] transition-transform shadow-lg flex items-center justify-center gap-2 mx-auto"
            >
              <FaComments className="w-6 h-6" />
              Chat with Insurance Expert
            </button>
            <p className="mt-4 text-gray-600 text-sm">
              Get personalized recommendations and answers to your questions
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}