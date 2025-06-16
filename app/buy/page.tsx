"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { FaChevronDown } from "react-icons/fa";

export default function buyInsuranceButton() {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [documentsRequired, setDocumentsRequired] = useState<string[]>([]);

  const insuranceDocuments: { [key: string]: string[] } = {
    "Aetna Medical Insurance": [
      "Proof of Identity (Driver's License, Passport)",
      "Proof of Citizenship or Legal Residency",
      "Income Verification (Pay stubs, Tax returns)",
      "Proof of Address (Utility bill, Lease agreement)",
      "Health Information (Medical history, prescriptions)"
    ],
    "Blue Cross and Blue Shield": [
      "Proof of Identity",
      "Proof of Citizenship or Legal Residency",
      "Income Verification",
      "Proof of Address",
      "Current Health Insurance Information"
    ],
    "Humana Medical Insurance": [
      "Proof of Identity",
      "Proof of Citizenship or Legal Residency",
      "Income Verification",
      "Proof of Address",
      "Health History"
    ],
    "Cigna": [
      "Proof of Identity",
      "Proof of Citizenship or Legal Residency",
      "Income Verification",
      "Health Information",
      "Proof of Address"
    ],
    "AARP": [
      "Proof of Identity",
      "Proof of Age",
      "Proof of Citizenship or Legal Residency",
      "Income Verification",
      "Proof of Address"
    ],
    "Medica": [
      "Proof of Identity",
      "Proof of Citizenship or Legal Residency",
      "Income Verification",
      "Proof of Address",
      "Health Information"
    ],
    "WellCare": [
      "Proof of Identity",
      "Proof of Citizenship or Legal Residency",
      "Income Verification",
      "Proof of Address"
    ]
  };

  const handlebuyInsurance = () => {
    const urls: { [key: string]: string } = {
      "Aetna Medical Insurance": "https://enrollmedicare.aetna.com/s/shop?tfn=&ZipCode=60607&CountyFIPS=17031&PlanYear=2025&step=PlanList",
      "Blue Cross and Blue Shield": "https://www.bcbsil.com/medicare",
      "Humana Medical Insurance": "https://shop.humana-medicareadvantage.com/?pspt=4ce0d070-2601-11f0-b20c-0db53d0967c7",
      "Cigna": "https://plans.cigna.com/?zip=60608&fip=17031&PlanType=MAPD",
      "AARP": "https://www.aarpmedicareplans.com/health-plans/plan-summary/60608/031/2025#MA",
      "Medica": "https://medica.isf.io/2025/g/7876cf047cb74e33aaecd5e44ff17615/AssistedShopping?step=3",
      "WellCare": "https://www.wellcare.com/en/illinois/need-a-plan"
    };

    const url = urls[selectedOption];
    if (!url) {
      alert("Please select an option before proceeding.");
      return;
    }
    window.location.href = url;
  };

  const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value;
    setSelectedOption(selected);
    setDocumentsRequired(insuranceDocuments[selected] || []);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex flex-col items-center justify-center p-8">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
          Ready to protect what matters most?
        </h2>
        <p className="text-lg text-gray-600 text-center mb-8">
          Get comprehensive coverage at competitive rates with our trusted insurance partners.
        </p>

        <div className="relative mb-6">
          <select
            className="w-full p-4 border-2 border-gray-300 rounded-xl bg-white text-gray-800 appearance-none focus:ring-4 focus:ring-blue-100 focus:border-blue-400"
            value={selectedOption}
            onChange={handleOptionChange}
          >
            <option value="">Select Insurance Provider</option>
            <option value="Aetna Medical Insurance">Aetna Medical Insurance</option>
            <option value="Blue Cross and Blue Shield">Blue Cross and Blue Shield</option>
            <option value="Humana Medical Insurance">Humana Medical Insurance</option>
            <option value="Cigna">Cigna</option>
            <option value="AARP">AARP</option>
            <option value="Medica">Medica</option>
            <option value="WellCare">WellCare</option>
          </select>
          <FaChevronDown className="absolute right-4 top-5 text-gray-500" />
        </div>

        {selectedOption && (
          <div className="mb-8 bg-gray-50 rounded-xl p-6 border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Required Documents
            </h3>
            <ul className="space-y-3">
              {documentsRequired.map((doc, index) => (
                <li 
                  key={index}
                  className="flex items-start text-gray-600"
                >
                  <span className="text-blue-500 mr-2">•</span>
                  {doc}
                </li>
              ))}
            </ul>
          </div>
        )}

        <button
          onClick={handlebuyInsurance}
          className="w-full py-4 bg-gradient-to-r from-blue-400 to-purple-400 text-white rounded-xl hover:opacity-90 transition-opacity text-lg font-semibold flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
        >
          Continue to Provider
          <ArrowRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}