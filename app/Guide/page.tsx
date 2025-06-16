"use client";

import { useState, useEffect } from "react";
import NavigationBar from "../components/NavigationBar";

const GuidePage = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const sections = ['sources', 'plans', 'terms', 'enrollment', 'usage'];

  const sectionData = {
    sources: [
      {
        title: "Employer-Sponsored",
        content: [
          "Most common source in the U.S.",
          "Employers often contribute to premiums",
          "Typically offered to full-time employees"
        ]
      },
      {
        title: "Government Programs",
        content: [
          "Medicare: For ages 65+ and people with disabilities",
          "Medicaid: For low-income individuals/families",
          "CHIP: Health coverage for children"
        ]
      },
      {
        title: "Healthcare Marketplace",
        content: [
          "Individual plans through Healthcare.gov",
          "Income-based subsidies available",
          "Open enrollment November - December"
        ]
      },
      {
        title: "Other Options",
        content: [
          "University student health plans",
          "Short-term catastrophic coverage",
          "COBRA for temporary continuation"
        ]
      }
    ],
    plans: [
      {
        title: "HMO (Health Maintenance Organization)",
        content: [
          "Lower premiums",
          "Requires primary care physician",
          "Referrals needed for specialists",
          "Limited network coverage"
        ]
      },
      {
        title: "PPO (Preferred Provider Organization)",
        content: [
          "Higher premiums but more flexibility",
          "Larger provider network",
          "No referrals needed",
          "Some out-of-network coverage"
        ]
      },
      {
        title: "EPO (Exclusive Provider Organization)",
        content: [
          "Mix of HMO and PPO features",
          "No coverage outside network",
          "No referrals needed for in-network care"
        ]
      },
      {
        title: "HDHP (High Deductible Health Plan)",
        content: [
          "Lower premiums, higher deductibles",
          "Often paired with HSA (Health Savings Account)",
          "Tax advantages for medical savings"
        ]
      }
    ],
    terms: [
      { title: "Premium", content: ["Monthly payment to maintain insurance coverage"] },
      { title: "Deductible", content: ["Amount you pay before insurance starts paying"] },
      { title: "Copay", content: ["Fixed fee for specific services (e.g., $20 doctor visit)"] },
      { title: "Coinsurance", content: ["Percentage of costs you pay after deductible (e.g., 20%)"] },
      { title: "Out-of-Pocket Maximum", content: ["Maximum you'll pay in a year before 100% coverage"] },
      { title: "Network", content: ["Doctors/hospitals contracted with your insurance"] }
    ],
    enrollment: [
      {
        title: "Employer Plans",
        content: [
          "New hires: 30-90 days from start date",
          "Annual enrollment: 2-4 weeks in fall",
          "Special enrollment: 60 days after life events"
        ]
      },
      {
        title: "Marketplace Plans",
        content: [
          "Open enrollment: Nov 1 - Dec 15",
          "Special enrollment: 60 days after qualifying events",
          "Apply through Healthcare.gov or state exchanges"
        ]
      }
    ],
    usage: [
      { title: "1. Find In-Network Providers", content: ["Use the insurer’s directory or call member services"] },
      { title: "2. Schedule Appointments", content: ["Confirm the provider accepts your specific plan"] },
      { 
        title: "3. At Your Appointment", 
        content: [
          "Present your insurance card",
          "Pay required copay",
          "Keep all receipts"
        ]
      },
      { 
        title: "4. Review EOB Statements", 
        content: ["Examine your Explanation of Benefits for billed services, insurance payments, and your responsibilities"] 
      },
      { title: "5. Pay Your Bills", content: ["Settle any remaining balances after claims processing"] }
    ]
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" && currentSection < sections.length - 1) {
        setCurrentSection(prev => prev + 1);
      }
      if (e.key === "ArrowLeft" && currentSection > 0) {
        setCurrentSection(prev => prev - 1);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentSection]);

  const progress = ((currentSection + 1) / sections.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <NavigationBar />
      
      <div className="max-w-4xl mx-auto px-4 pt-24 pb-12">
        {/* Progress Bar */}
        <div className="h-1 bg-gray-200 rounded-full mb-8">
          <div 
            className="h-full bg-gradient-to-r from-purple-400 to-blue-400 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Section Navigation */}
        <div className="flex overflow-x-auto pb-4 mb-8 scrollbar-hide">
          {sections.map((section, index) => (
            <button
              key={section}
              onClick={() => setCurrentSection(index)}
              className={`px-6 py-3 mr-4 rounded-lg font-medium transition-all ${
                currentSection === index 
                  ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg"
                  : "bg-white text-gray-600 hover:bg-purple-50"
              }`}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </button>
          ))}
        </div>

        {/* Content Sections */}
        <div className="space-y-8">
          {(sectionData[sections[currentSection] as keyof typeof sectionData] as Array<{title: string, content: string[]}>).map((item, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow border border-purple-100"
            >
              <h3 className="text-xl font-semibold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                {item.title}
              </h3>
              <ul className="space-y-2 pl-4">
                {item.content.map((point, i) => (
                  <li 
                    key={i}
                    className="text-gray-600 before:content-['•'] before:text-purple-400 before:mr-2"
                  >
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-12">
          <button
            onClick={() => setCurrentSection(prev => Math.max(0, prev - 1))}
            disabled={currentSection === 0}
            className="px-6 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentSection(prev => Math.min(sections.length - 1, prev + 1))}
            disabled={currentSection === sections.length - 1}
            className="px-6 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default GuidePage;