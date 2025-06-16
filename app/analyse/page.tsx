// app/Analyse/page.tsx
"use client";

import { useState } from "react";
import { FaChevronDown, FaChartLine, FaPhone, FaEnvelope, FaGlobe, FaUpload, FaComments } from "react-icons/fa";
import { useRouter } from "next/navigation";
import NavigationBar from "../components/NavigationBar";

const medicarePlans = {
  "AARP": {
    overview: {
      title: "Plan Overview",
      content: [
        "Medical Coverage: Comprehensive Part A & B services",
        "Drug Coverage: $0 deductible with tiered copays",
        "Supplemental Benefits: Vision, dental, hearing, transportation, fitness"
      ]
    },
    costs: {
      title: "Cost Structure",
      items: [
        { label: "Health Deductible", value: "$0" },
        { label: "Drug Deductible", value: "$0" },
        { label: "MOOP", value: "$800" }
      ]
    },
    medicalServices: {
      title: "Medical Services Coverage",
      items: [
        { service: "Primary Care Visit", cost: "$0 copay" },
        { service: "Specialist Visit", cost: "$25 copay" },
        { service: "Emergency Care", cost: "$75 copay" },
        { service: "Urgent Care", cost: "$65 copay" },
        { service: "Inpatient Hospital", cost: "$0 copay/stay" },
        { service: "Outpatient Surgery", cost: "$0 copay" }
      ]
    },
    prescriptions: {
      title: "Prescription Drug Tiers",
      tiers: [
        { tier: "1", description: "Preferred Generic", cost: "$10" },
        { tier: "2", description: "Generic", cost: "$30" },
        { tier: "3", description: "Preferred Brand", cost: "$60" }
      ]
    },
    appeals: {
      title: "Appeals Process",
      steps: [
        "Coverage Decision Request",
        "Level 1 Appeal",
        "Level 2 Independent Review",
        "Level 3 Admin Law Judge"
      ]
    },
    contact: {
      title: "Contact Information",
      items: [
        { icon: <FaPhone />, text: "1-877-370-3249 (TTY 711)" },
        { icon: <FaEnvelope />, text: "UnitedHealthcare, PO Box 30770, Salt Lake City, UT 84130" },
        { icon: <FaGlobe />, text: "myAARPMedicare.com", link: "https://www.aarpmedicare.com" }
      ]
    }
  },

  "Humana Group Medicare Advantage PPO Plan": {
    overview: {
      title: "Plan Overview",
      content: [
        "Medical Coverage (Part A & B): Office visits, urgent care, emergency services, lab and radiology, ambulance",
        "Prescription Drug Coverage (Part D): No deductible; see stages in Chapter 6",
        "Supplemental Benefits: Telehealth, wellness programs, health coaching, home care"
      ]
    },
    costs: {
      title: "Cost Structure",
      items: [
        { label: "Combined Deductible", value: "$150" },
        { label: "Maximum Out-of-Pocket", value: "$3,400" },
        { label: "Part D Stages", value: "Initial → Catastrophic" }
      ]
    },
    medicalServices: {
      title: "Medical Services Coverage",
      items: [
        { service: "Primary Care Visit", cost: "$15 copay" },
        { service: "Specialist Visit", cost: "$30 copay" },
        { service: "Emergency Room", cost: "$50 copay" },
        { service: "Urgent Care", cost: "$30 copay" },
        { service: "Ambulatory Clinical Lab", cost: "0% coinsurance" },
        { service: "Outpatient Radiology", cost: "$30 copay" },
        { service: "Ambulance Services", cost: "$75 copay" }
      ]
    },
    prescriptions: {
      title: "Prescription Drug Tiers",
      tiers: [
        { tier: "1", description: "Preferred Generic", cost: "$10" },
        { tier: "2", description: "Generic", cost: "$30" },
        { tier: "3", description: "Preferred Brand", cost: "25% coinsurance" },
        { tier: "4", description: "Non-Preferred Drug", cost: "50% coinsurance" },
        { tier: "5", description: "Specialty", cost: "33% coinsurance" }
      ]
    },
    appeals: {
      title: "Appeals Process",
      steps: [
        "Coverage Decision Request",
        "Level 1 Appeal",
        "Level 2 Independent Review",
        "Level 3 Admin Law Judge",
        "Level 4 Medicare Appeals Council",
        "Level 5 Federal District Court"
      ]
    },
    contact: {
      title: "Contact Information",
      items: [
        { icon: <FaPhone />, text: "(866) 396-8810 (TTY 711)" },
        { icon: <FaEnvelope />, text: "Humana, P.O. Box 14168, Lexington, KY 40512" },
        { icon: <FaGlobe />, text: "www.Humana.com", link: "https://www.humana.com" }
      ]
    }
  },
  "Aetna Medicare Core (PPO) Plan": {
    overview: {
      title: "Plan Overview",
      content: [
        "Medical Coverage: All Part A & B services per Medical Benefits Chart",
        "Prescription Drug Coverage (Part D): Deductible, Initial, and Catastrophic stages",
        "Supplemental Benefits: SilverSneakers, telehealth, care coordination"
      ]
    },
    costs: {
      title: "Cost Structure",
      items: [
        { label: "Combined Deductible", value: "$150" },
        { label: "In-Network MOOP", value: "$4,500" },
        { label: "Part D Deductible", value: "$590 (Tier 3–5)" }
      ]
    },
    medicalServices: {
      title: "Medical Services Coverage",
      items: [
        { service: "Primary Care Visit", cost: "$15 copay" },
        { service: "Specialist Visit", cost: "$30 copay" },
        { service: "Emergency Room", cost: "$50 copay" },
        { service: "Urgent Care", cost: "$30 copay" },
        { service: "Ambulatory Clinical Lab", cost: "0% coinsurance" },
        { service: "Outpatient Radiology", cost: "$30 copay" },
        { service: "Ambulance", cost: "$75 copay" }
      ]
    },
    prescriptions: {
      title: "Prescription Drug Tiers",
      tiers: [
        { tier: "1", description: "Preferred Generic", cost: "$10" },
        { tier: "2", description: "Generic", cost: "$30" },
        { tier: "3", description: "Preferred Brand", cost: "$60" },
        { tier: "4", description: "Non-Preferred Drug", cost: "25% coinsurance" },
        { tier: "5", description: "Specialty", cost: "25% coinsurance" },
        { tier: "Insulins", description: "Any Tier", cost: "≤ $35 per 30-day" }
      ]
    },
    appeals: {
      title: "Appeals Process",
      steps: [
        "Coverage Decision",
        "Level 1 Plan Appeal",
        "Level 2 Independent Review",
        "Level 3 Admin Law Judge",
        "Level 4 Appeals Council",
        "Level 5 District Court"
      ]
    },
    contact: {
      title: "Contact Information",
      items: [
        { icon: <FaPhone />, text: "1-833-570-6670 (TTY 711)" },
        { icon: <FaEnvelope />, text: "Aetna Medicare, PO Box 7405, London, KY 40742" },
        { icon: <FaGlobe />, text: "AetnaMedicare.com/H5521-422", link: "https://www.aetnamedicare.com" }
      ]
    }
  },
  "Cigna Preferred Medicare (HMO)": {
    overview: {
      title: "Plan Overview",
      content: [
        "Medical Coverage (Part A & B): No deductible; copays apply",
        "Prescription Drug Coverage (Part D): No deductible; Part D stages apply",
        "Supplemental Benefits: ADAP, telehealth, extra support programs"
      ]
    },
    costs: {
      title: "Cost Structure",
      items: [
        { label: "Medical MOOP", value: "$4,200" },
        { label: "Part D Stages", value: "Initial → Catastrophic ($2,000 OOP)" }
      ]
    },
    medicalServices: {
      title: "Medical Services Coverage",
      items: [
        { service: "PCP Visit", cost: "$0 copay" },
        { service: "Specialist Visit", cost: "$30 copay" },
        { service: "Emergency Room", cost: "$125 copay" },
        { service: "Urgent Care", cost: "$30 copay" },
        { service: "Inpatient Hospital", cost: "20% coinsurance" },
        { service: "Outpatient Surgery", cost: "$350 copay" },
        { service: "Lab Services", cost: "$0 copay" }
      ]
    },
    prescriptions: {
      title: "Prescription Drug Tiers",
      tiers: [
        { tier: "1", description: "Standard Retail", cost: "$10 copay" },
        { tier: "1", description: "Preferred Retail", cost: "$0 copay" },
        { tier: "2", description: "Standard Retail", cost: "$20 copay" },
        { tier: "2", description: "Preferred Retail", cost: "$4 copay" },
        { tier: "3", description: "Standard Retail", cost: "$47 copay" },
        { tier: "3", description: "Preferred Retail", cost: "$45 copay" },
        { tier: "Insulins", description: "All Tiers", cost: "$35 max" }
      ]
    },
    appeals: {
      title: "Appeals Process",
      steps: [
        "Decision Request",
        "Level 1",
        "Level 2",
        "Level 3",
        "Level 4",
        "Level 5"
      ]
    },
    contact: {
      title: "Contact Information",
      items: [
        { icon: <FaPhone />, text: "1-800-668-3813 (TTY 711)" },
        { icon: <FaEnvelope />, text: "Cigna Healthcare, PO Box 20002, Nashville, TN 37202" },
        { icon: <FaGlobe />, text: "CignaMedicare.com/Members", link: "https://www.cignamedicare.com" }
      ]
    }
  },
  "AARP": {
    overview: {
      title: "Plan Overview",
      content: [
        "Medical Coverage (Part A & B): Standard copays and coinsurance",
        "Drug Coverage (Part D): No deductible; Part D stages apply",
        "Supplemental Benefits: Telehealth, UCard benefits"
      ]
    },
    costs: {
      title: "Cost Structure",
      items: [
        { label: "Combined Deductible", value: "$150" },
        { label: "In-Network MOOP", value: "$4,500" },
        { label: "Part D Stages", value: "Initial → Catastrophic ($2,000 OOP)" }
      ]
    },
    medicalServices: {
      title: "Medical Services Coverage",
      items: [
        { service: "Primary Care Visit", cost: "$0 copay" },
        { service: "Specialist Visit", cost: "$30 copay" },
        { service: "Emergency Room", cost: "$50 copay" },
        { service: "Urgent Care", cost: "$30 copay" },
        { service: "Inpatient Hospital", cost: "$395 copay/stay" },
        { service: "Outpatient Surgery", cost: "$245 copay" },
        { service: "Lab Services", cost: "$0 copay" }
      ]
    },
    prescriptions: {
      title: "Prescription Drug Tiers",
      tiers: [
        { tier: "1", description: "Preferred Generic", cost: "$0 copay" },
        { tier: "2", description: "Generic", cost: "$10 copay" },
        { tier: "3", description: "Preferred Brand", cost: "$47 copay" },
        { tier: "4", description: "Non-Preferred Drug", cost: "$100 copay" },
        { tier: "5", description: "Specialty", cost: "33% coinsurance" },
        { tier: "Insulins", description: "All Tiers", cost: "$35 max" }
      ]
    },
    appeals: {
      title: "Appeals Process",
      steps: [
        "Decision Request",
        "Level 1",
        "Level 2",
        "Level 3",
        "Level 4",
        "Level 5"
      ]
    },
    contact: {
      title: "Contact Information",
      items: [
        { icon: <FaPhone />, text: "1-877-370-3249 (TTY 711)" },
        { icon: <FaEnvelope />, text: "UnitedHealthcare, PO Box 30770, Salt Lake City, UT 84130" },
        { icon: <FaGlobe />, text: "myAARPMedicare.com", link: "https://www.aarpmedicare.com" }
      ]
    }
  },
  "Blue Cross Medicare Advantage Classic (PPO)": {
    overview: {
      title: "Plan Overview",
      content: [
        "Medical Coverage: Nationwide PPO network",
        "Drug Coverage: $200 deductible on Tiers 3-5",
        "Supplemental Benefits: Optional vision, dental, hearing ($36.60/month)"
      ]
    },
    costs: {
      title: "Cost Structure",
      items: [
        { label: "Health Deductible", value: "$0" },
        { label: "Drug Deductible", value: "$200" },
        { label: "MOOP", value: "$4,900" }
      ]
    },
    medicalServices: {
      title: "Medical Services Coverage",
      items: [
        { service: "Primary Care Visit", cost: "$0 in-network" },
        { service: "Specialist Visit", cost: "$30 in-network" },
        { service: "Emergency Care", cost: "Covered at network rate" },
        { service: "Urgent Care", cost: "$65 copay" }
      ]
    },
    prescriptions: {
      title: "Prescription Drug Tiers",
      tiers: [
        { tier: "1", description: "Preferred Generic", cost: "$15" },
        { tier: "2", description: "Generic", cost: "$0" },
        { tier: "3", description: "Preferred Brand", cost: "$47" }
      ]
    },
    appeals: {
      title: "Appeals Process",
      steps: [
        "Initial Decision Request",
        "Plan Level Appeal",
        "Independent Review",
        "Administrative Law Judge"
      ]
    },
    contact: {
      title: "Contact Information",
      items: [
        { icon: <FaPhone />, text: "1-877-774-8592 (TTY 711)" },
        { icon: <FaEnvelope />, text: "Blue Cross Medicare Advantage, PO Box 10420, Chicago, IL 60601" },
        { icon: <FaGlobe />, text: "getblueil.com/mapd", link: "https://www.bluecrossil.com" }
      ]
    }
  },
  "Wellcare Premium Ultra Open (PPO)": {
    overview: {
      title: "Plan Overview",
      content: [
        "Medical Coverage (Part A & B): Comprehensive network coverage",
        "Prescription Drug Coverage (Part D): Tiered deductible system",
        "Supplemental Benefits: Nationwide network, fitness benefits"
      ]
    },
    costs: {
      title: "Cost Structure",
      items: [
        { label: "In-Network MOOP", value: "$4,000" },
        { label: "Combined MOOP", value: "$6,200" },
        { label: "Part D Deductible", value: "$420 (Tiers 3-5)" }
      ]
    },
    medicalServices: {
      title: "Medical Services Coverage",
      items: [
        { service: "PCP Visit", cost: "$0 copay" },
        { service: "Specialist Visit", cost: "$25 copay" },
        { service: "Emergency Room", cost: "$140 copay" },
        { service: "Urgent Care", cost: "$60 copay" },
        { service: "Inpatient Hospital", cost: "$325/day (1-7)" },
        { service: "Outpatient Surgery", cost: "$200-$275 copay" },
        { service: "Lab Services", cost: "$0-$50 copay" }
      ]
    },
    prescriptions: {
      title: "Prescription Drug Tiers",
      tiers: [
        { tier: "1", description: "Preferred Generic", cost: "$5 copay" },
        { tier: "2", description: "Generic", cost: "$10 copay" },
        { tier: "3", description: "Preferred Brand", cost: "25% coinsurance" },
        { tier: "4", description: "Non-Preferred Drug", cost: "44% coinsurance" },
        { tier: "5", description: "Specialty", cost: "28% coinsurance" },
        { tier: "6", description: "Select Care Drugs", cost: "$0 copay" }
      ]
    },
    appeals: {
      title: "Appeals Process",
      steps: [
        "Coverage Decision Request",
        "Level 1 Appeal",
        "Level 2 Appeal",
        "Level 3 Appeal",
        "Level 4 Appeal",
        "Level 5 Appeal"
      ]
    },
    contact: {
      title: "Contact Information",
      items: [
        { icon: <FaPhone />, text: "1-844-582-5177 (TTY 711)" },
        { icon: <FaEnvelope />, text: "Wellcare By Health Net, PO Box 10420, Van Nuys, CA 91410" },
        { icon: <FaGlobe />, text: "wellcare.com/healthnetOR", link: "https://www.wellcare.com" }
      ]
    }
  },
  "Medica": {
    overview: {
      title: "Plan Overview",
      content: [
        "Medical Coverage (Part A & B): Nationwide network access",
        "Prescription Drug Coverage (Part D): Comprehensive formulary",
        "Supplemental Benefits: Telehealth, care coordination"
      ]
    },
    costs: {
      title: "Cost Structure",
      items: [
        { label: "Combined Deductible", value: "$0" },
        { label: "In-Network MOOP", value: "$2,000" },
        { label: "Part D Stages", value: "Initial → Catastrophic" }
      ]
    },
    medicalServices: {
      title: "Medical Services Coverage",
      items: [
        { service: "Primary Care Visit", cost: "$0 copay" },
        { service: "Specialist Visit", cost: "$25 copay" },
        { service: "Emergency Room", cost: "$140 copay" },
        { service: "Urgent Care", cost: "$65 copay" },
        { service: "Inpatient Hospital", cost: "$150/day (1-7)" },
        { service: "Outpatient Surgery", cost: "$175 copay" },
        { service: "Lab Services", cost: "$0-$50 copay" }
      ]
    },
    prescriptions: {
      title: "Prescription Drug Tiers",
      tiers: [
        { tier: "1", description: "Preferred Generic", cost: "$10" },
        { tier: "2", description: "Generic", cost: "$30" },
        { tier: "3", description: "Preferred Brand", cost: "$60" },
        { tier: "4", description: "Non-Preferred Drug", cost: "25% coinsurance" },
        { tier: "5", description: "Specialty", cost: "33% coinsurance" }
      ]
    },
    appeals: {
      title: "Appeals Process",
      steps: [
        "Coverage Decision",
        "Level 1 Plan Appeal",
        "Level 2 Independent Review",
        "Level 3 Admin Law Judge",
        "Level 4 Appeals Council",
        "Level 5 District Court"
      ]
    },
    contact: {
      title: "Contact Information",
      items: [
        { icon: <FaPhone />, text: "1-800-555-1234 (TTY 711)" },
        { icon: <FaEnvelope />, text: "Medica Group, PO Box 1234, Minneapolis, MN 55440" },
        { icon: <FaGlobe />, text: "medica.com/advantage", link: "https://www.medica.com" }
      ]
    }
  },
  "Mutual of Omaha Medicare Advantage Solution PPO": {
    overview: {
      title: "Plan Overview",
      content: [
        "Medical Coverage: Comprehensive Part A & B services",
        "Prescription Drug Coverage: No deductible for Part D",
        "Supplemental Benefits: Vision, dental, transportation"
      ]
    },
    costs: {
      title: "Cost Structure",
      items: [
        { label: "Combined Deductible", value: "$0" },
        { label: "MOOP", value: "$2,000" },
        { label: "Part D Stages", value: "Initial → Catastrophic" }
      ]
    },
    medicalServices: {
      title: "Medical Services Coverage",
      items: [
        { service: "Primary Care Visit", cost: "$0 copay" },
        { service: "Specialist Visit", cost: "$25 copay" },
        { service: "Emergency Room", cost: "$140 copay" },
        { service: "Urgent Care", cost: "$65 copay" },
        { service: "Inpatient Hospital", cost: "$150/day (1-7)" },
        { service: "Outpatient Surgery", cost: "$175 copay" },
        { service: "Lab Services", cost: "$0-$50 copay" }
      ]
    },
    prescriptions: {
      title: "Prescription Drug Tiers",
      tiers: [
        { tier: "1", description: "Preferred Generic", cost: "$10" },
        { tier: "2", description: "Generic", cost: "$30" },
        { tier: "3", description: "Preferred Brand", cost: "$60" },
        { tier: "4", description: "Non-Preferred Drug", cost: "25% coinsurance" },
        { tier: "5", description: "Specialty", cost: "33% coinsurance" }
      ]
    },
    appeals: {
      title: "Appeals Process",
      steps: [
        "Decision Request",
        "Level 1 Appeal",
        "Level 2 Appeal",
        "Level 3 Appeal",
        "Level 4 Appeal",
        "Level 5 Appeal"
      ]
    },
    contact: {
      title: "Contact Information",
      items: [
        { icon: <FaPhone />, text: "1-800-555-5678 (TTY 711)" },
        { icon: <FaEnvelope />, text: "Mutual of Omaha, PO Box 5678, Omaha, NE 68175" },
        { icon: <FaGlobe />, text: "mutualofomaha.com/medicare", link: "https://www.mutualofomaha.com" }
      ]
    }
  }
};
export default function AnalysePage() {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState("");
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleBack = () => {
    router.push("/");
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      console.log("Selected file:", file.name);
    }
  };

  const handleUploadClick = () => {
    document.getElementById('file-input')?.click();
  };

  const AnalysePlan = () => {
    if (selectedPlan) {
      setIsLoading(true);
      setTimeout(() => {
        setShowAnalysis(true);
        setIsLoading(false);
      }, 3000);
    }
  };

  const renderSection = (title: string, children: React.ReactNode) => (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      {children}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
            <FaChartLine className="text-blue-500" /> Plan Analysis
          </h1>
          <button
            onClick={handleBack}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-lg transition-colors"
          >
            ← Back to Dashboard
          </button>
        </div>

        {/* Plan Selection Section */}
        <div className="flex gap-4 mb-8 flex-col md:flex-row">
          <div className="flex-1">
            <div className="relative">
              <select
                value={selectedPlan}
                onChange={(e) => setSelectedPlan(e.target.value)}
                className="w-full p-3 border-2 border-gray-300 rounded-lg bg-white text-gray-800 appearance-none"
                disabled={isLoading}
              >
                <option value="">Select Medicare Plan</option>
                {Object.keys(medicarePlans).map((plan) => (
                  <option key={plan} value={plan}>{plan}</option>
                ))}
              </select>
              <FaChevronDown className="absolute right-3 top-4 text-gray-500" />
            </div>
          </div>

          <button
            onClick={AnalysePlan}
            disabled={!selectedPlan || isLoading}
            className={`px-6 py-3 bg-gradient-to-r from-blue-400 to-purple-400 text-white rounded-lg transition-opacity flex items-center gap-2 h-fit ${
              isLoading ? "opacity-75 cursor-not-allowed" : "hover:opacity-90"
            }`}
          >
            {isLoading ? (
              <>
                <span className="animate-spin">⏳</span>
                Analysing...
              </>
            ) : (
              "Analyse Plan"
            )}
          </button>
        </div>

        {/* Analysis Results Section */}
        {showAnalysis && medicarePlans[selectedPlan] && (
          <div className="bg-white rounded-xl shadow-lg p-6 space-y-8 animate-fade-in">
            {renderSection(medicarePlans[selectedPlan].overview.title, 
              medicarePlans[selectedPlan].overview.content.map((item, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-gray-600">{item}</p>
                </div>
              ))
            )}

            {renderSection(medicarePlans[selectedPlan].costs.title,
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {medicarePlans[selectedPlan].costs.items.map((item, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex justify-between">
                      <span className="text-gray-600">{item.label}</span>
                      <span className="text-blue-600">{item.value}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {renderSection(medicarePlans[selectedPlan].medicalServices.title,
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {medicarePlans[selectedPlan].medicalServices.items.map((item, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex justify-between">
                      <span className="text-gray-600">{item.service}</span>
                      <span className="text-blue-600">{item.cost}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {renderSection(medicarePlans[selectedPlan].prescriptions.title,
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left border-b-2 border-gray-200">
                      <th className="pb-2 text-gray-600">Tier</th>
                      <th className="pb-2 text-gray-600">Description</th>
                      <th className="pb-2 text-gray-600">Cost</th>
                    </tr>
                  </thead>
                  <tbody>
                    {medicarePlans[selectedPlan].prescriptions.tiers.map((tier, index) => (
                      <tr key={index} className="border-b border-gray-100">
                        <td className="py-3 text-gray-600">{tier.tier}</td>
                        <td className="py-3 text-gray-600">{tier.description}</td>
                        <td className="py-3 text-blue-600">{tier.cost}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {renderSection(medicarePlans[selectedPlan].appeals.title,
              <div className="space-y-2">
                {medicarePlans[selectedPlan].appeals.steps.map((step, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="text-blue-600">{index + 1}.</div>
                    <p className="text-gray-600">{step}</p>
                  </div>
                ))}
              </div>
            )}

            {renderSection(medicarePlans[selectedPlan].contact.title,
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {medicarePlans[selectedPlan].contact.items.map((item, index) => (
                  <a
                    key={index}
                    href={item.link || "#"}
                    className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-3"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="text-blue-600">{item.icon}</span>
                    <span className="text-gray-600">{item.text}</span>
                  </a>
                ))}
              </div>
            )}
          </div>
        )}

        

        {/* Chatbot Redirection Section */}
        <div className="mt-8 text-center">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-2xl mx-auto">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Need Personalized Help?
            </h3>
            <button
              onClick={() => router.push(`/chat?plan=${encodeURIComponent(selectedPlan)}`)}
              className="px-8 py-4 bg-gradient-to-r from-blue-400 to-purple-400 text-white rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2 mx-auto"
            >
              <FaComments className="w-6 h-6" />
              Chat with Insurance Expert
            </button>
            <p className="mt-4 text-gray-600 text-sm">
              Get real-time answers to your Medicare questions
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}