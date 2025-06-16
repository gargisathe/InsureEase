"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaShoppingCart, FaChartLine, FaBalanceScale } from "react-icons/fa";
import NavigationBar from "../components/NavigationBar";
import OnboardingOverlay from "../components/OnboardingOverlay";
import PlanSelectModal from "../components/PlanSelectModal";
import TimelineItem from "../components/TimelineItem";

export default function Dashboard() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [planUrl, setPlanUrl] = useState<string | null>(null);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showPlanSelect, setShowPlanSelect] = useState(false);
  const [logoHovered, setLogoHovered] = useState(false);

  useEffect(() => {
    const savedName = localStorage.getItem("userName");
    const savedPlan = sessionStorage.getItem("currentPlanUrl");
    if (savedName?.trim()) setName(savedName);
    if (savedPlan) setPlanUrl(savedPlan);
  }, []);

  const handleNavigation = (path: string) => {
    if (['/buy', '/analyse', '/compare'].includes(path)) {
      router.push(path);
    } else {
      planUrl ? router.push(path) : setShowPlanSelect(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <NavigationBar />
      <div className="p-8 max-w-6xl mx-auto relative pt-20">
        <header className="mb-8 text-center pt-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-2 animate-fade-in">
            Welcome back, <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">{name}</span>!
          </h1>
          <p className="text-lg text-gray-600">Your Insurance Management Dashboard</p>
        </header>

        <div className="flex items-center justify-center min-h-[50vh] -mt-8">
          <div 
            className="relative group"
            onMouseEnter={() => setLogoHovered(true)}
            onMouseLeave={() => setLogoHovered(false)}
          >
            <div className={`transition-all duration-500 ${logoHovered ? 'scale-75 opacity-0' : 'scale-100 opacity-100'}`}>
              <div className="w-32 h-32 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl flex items-center justify-center cursor-pointer transform shadow-xl transition-all duration-300 animate-bounce">
                <svg 
                  className="w-16 h-16 text-white"
                  viewBox="0 0 24 24"
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              </div>
            </div>

            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex space-x-12 transition-all duration-500 ${logoHovered ? 'opacity-100' : 'opacity-0'}`}>
              <div 
                className="w-40 h-40 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl flex flex-col items-center justify-center p-4 cursor-pointer transform hover:scale-105 shadow-xl transition-all"
                onClick={() => handleNavigation("/analyse")}
              >
                <FaChartLine className="w-12 h-12 text-white mb-2" />
                <span className="text-white font-semibold text-center">Analyse</span>
              </div>
              <div 
                className="w-40 h-40 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl flex flex-col items-center justify-center p-4 cursor-pointer transform hover:scale-105 shadow-xl transition-all"
                onClick={() => handleNavigation("/compare")}
              >
                <FaBalanceScale className="w-12 h-12 text-white mb-2" />
                <span className="text-white font-semibold text-center">Compare</span>
              </div>
              <div 
                className="w-40 h-40 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl flex flex-col items-center justify-center p-4 cursor-pointer transform hover:scale-105 shadow-xl transition-all"
                onClick={() => handleNavigation("/buy")}
              >
                <FaShoppingCart className="w-12 h-12 text-white mb-2" />
                <span className="text-white font-semibold text-center">Buy</span>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-8 animate-fade-in-up">
          <button
            onClick={() => router.push('/chat')}
            className="px-6 py-3 bg-gradient-to-r from-purple-300 to-blue-300 hover:from-purple-400 hover:to-blue-400 text-gray-800 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            <span className="font-medium">❓ Don't know what to do?</span>
            <span className="ml-2">Chat with our AI Assistant →</span>
          </button>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-lg mb-8 mt-12">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
            Enrollment Timeline
          </h2>
          <div className="space-y-6 max-w-3xl mx-auto">
            <TimelineItem title="General Enrollment" dates="Jan 1–Mar 31" progress={65} />
            <TimelineItem title="Open Enrollment" dates="Oct 15–Dec 7" progress={30} />
            <TimelineItem title="Special Enrollment" dates="Varies by case" progress={15} />
          </div>
        </div>

        <div className="flex justify-center gap-6 items-center">
          <button
            onClick={() => setShowOnboarding(true)}
            className="px-8 py-3 bg-gradient-to-r from-blue-400 to-purple-400 text-white rounded-xl hover:opacity-90 transition-opacity text-lg shadow-lg"
          >
            Medicare 101 Guide
          </button>
        </div>
      </div>

      <OnboardingOverlay isOpen={showOnboarding} onClose={() => setShowOnboarding(false)} />
      <PlanSelectModal
        isOpen={showPlanSelect}
        onClose={(url) => {
          setShowPlanSelect(false);
          if (url) {
            sessionStorage.setItem("currentPlanUrl", url);
            setPlanUrl(url);
            router.push("/chat");
          }
        }}
      />
    </div>
  );
}