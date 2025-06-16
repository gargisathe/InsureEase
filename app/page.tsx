"use client";

import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { FaShoppingCart, FaChartLine, FaBalanceScale, FaBars, FaTimes } from "react-icons/fa";

const NavigationBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as Element).closest('nav') && 
          !(event.target as Element).closest('.menu-toggle')) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-xl z-50 shadow-sm border-b border-purple-100/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <button 
            className="flex items-center space-x-2 group"
            onClick={() => router.push('/')}
          >
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
              <svg 
                className="w-5 h-5 text-white"
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              INSUREASE
            </span>
          </button>

          <nav className="hidden md:flex space-x-8">
            <button
              onClick={() => router.push('/')}
              className="relative text-gray-600 hover:text-purple-600 transition-colors px-2 py-1 group"
            >
              Home
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-full" />
            </button>
            <button
              onClick={() => router.push('/Guide', { scroll: false })}
              className="relative text-gray-600 hover:text-purple-600 transition-colors px-2 py-1 group"
            >
              Medicare 101
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-full" />
            </button>
          </nav>

          <button 
            className="md:hidden text-gray-600 hover:text-purple-600 transition-colors menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
          </button>
        </div>

        <nav className={`md:hidden absolute top-16 right-0 left-0 bg-white/95 backdrop-blur-xl z-50 shadow-lg transition-all duration-300 overflow-hidden ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="px-4 pt-2 pb-4 space-y-2">
            <button
              onClick={() => {
                router.push('/');
                setIsMenuOpen(false);
              }}
              className="block px-4 py-2 text-gray-600 hover:bg-purple-50 rounded-lg transition-colors w-full text-left"
            >
              Home
            </button>
            <button
              onClick={() => {
                router.push('/Guide');
                setIsMenuOpen(false);
              }}
              className="block px-4 py-2 text-gray-600 hover:bg-purple-50 rounded-lg transition-colors w-full text-left"
            >
              Guide
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};

const FloatingBackground = () => (
  <div className="absolute inset-0 z-0 overflow-hidden">
    {[...Array(15)].map((_, i) => (
      <div
        key={i}
        className="absolute animate-float"
        style={{
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          width: `${Math.random() * 50 + 20}px`,
          height: `${Math.random() * 50 + 20}px`,
          background: `radial-gradient(circle, rgba(${
            Math.random() * 100 + 155
          },${Math.random() * 100 + 155},${
            Math.random() * 200 + 55
          },0.15) 0%, rgba(255,255,255,0) 70%)`,
          animationDelay: `${Math.random() * 5}s`,
          transform: `scale(${Math.random() * 0.5 + 0.5})`,
        }}
      />
    ))}
  </div>
);

const OnboardingOverlay = ({ 
  isOpen, 
  onClose 
}: { 
  isOpen: boolean; 
  onClose: () => void 
}) => (
  <div className={`fixed inset-0 bg-black/50 z-50 ${isOpen ? 'block' : 'hidden'}`}>
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-xl w-full max-w-2xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Medicare 101 Guide</h2>
        <button 
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 text-2xl"
        >
          &times;
        </button>
      </div>
      <div className="space-y-4 text-gray-600">
        <p>Welcome to Medicare! Here's what you need to know:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Part A covers hospital insurance</li>
          <li>Part B covers medical insurance</li>
          <li>Part C offers Medicare Advantage Plans</li>
          <li>Part D provides prescription drug coverage</li>
        </ul>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-gradient-to-r from-blue-400 to-purple-400 text-white rounded-lg hover:opacity-90 transition-opacity"
        >
          Got It!
        </button>
      </div>
    </div>
  </div>
);

const PlanSelectModal = ({ 
  isOpen, 
  onClose 
}: { 
  isOpen: boolean; 
  onClose: (url: string | null) => void 
}) => (
  <div className={`fixed inset-0 bg-black/50 z-50 ${isOpen ? 'block' : 'hidden'}`}>
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-xl w-full max-w-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Select Your Plan</h2>
        <button 
          onClick={() => onClose(null)}
          className="text-gray-500 hover:text-gray-700 text-2xl"
        >
          &times;
        </button>
      </div>
      <div className="space-y-4">
        <button
          onClick={() => onClose("/plan-1")}
          className="w-full p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg hover:from-blue-100 hover:to-purple-100 transition-all text-left"
        >
          <h3 className="font-semibold text-blue-600">Basic Plan</h3>
          <p className="text-sm text-gray-600">Essential coverage with low premiums</p>
        </button>
        <button
          onClick={() => onClose("/plan-2")}
          className="w-full p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg hover:from-blue-100 hover:to-purple-100 transition-all text-left"
        >
          <h3 className="font-semibold text-blue-600">Premium Plan</h3>
          <p className="text-sm text-gray-600">Comprehensive coverage with added benefits</p>
        </button>
      </div>
    </div>
  </div>
);

export default function Home() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [entered, setEntered] = useState(false);
  const [planUrl, setPlanUrl] = useState<string | null>(null);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showPlanSelect, setShowPlanSelect] = useState(false);
  const [logoHovered, setLogoHovered] = useState(false);
  const [transitioning, setTransitioning] = useState(false);

  const handleNameSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    
    setTransitioning(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    
    localStorage.setItem("userName", name.trim());
    setEntered(true);
    setTransitioning(false);
  };

  useEffect(() => {
    const savedName = localStorage.getItem("userName");
    const savedPlan = sessionStorage.getItem("currentPlanUrl");
    
    if (savedName?.trim()) setName(savedName);
    if (savedPlan) setPlanUrl(savedPlan);
  }, []);

  const handleNavigation = (path: string) => {
    if (['/Buy', '/Analyse', '/Compare'].includes(path)) {
      router.push(path.toLowerCase());
    } else {
      planUrl ? router.push(path) : setShowPlanSelect(true);
    }
  };

  if (entered) {
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

          {/* Moved Up Logo Section */}
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
                  onClick={() => handleNavigation("/Analyse")}
                >
                  <FaChartLine className="w-12 h-12 text-white mb-2" />
                  <span className="text-white font-semibold text-center">Analyse</span>
                </div>
                <div 
                  className="w-40 h-40 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl flex flex-col items-center justify-center p-4 cursor-pointer transform hover:scale-105 shadow-xl transition-all"
                  onClick={() => handleNavigation("/Compare")}
                >
                  <FaBalanceScale className="w-12 h-12 text-white mb-2" />
                  <span className="text-white font-semibold text-center">Compare</span>
                </div>
                <div 
                  className="w-40 h-40 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl flex flex-col items-center justify-center p-4 cursor-pointer transform hover:scale-105 shadow-xl transition-all"
                  onClick={() => handleNavigation("/Buy")}
                >
                  <FaShoppingCart className="w-12 h-12 text-white mb-2" />
                  <span className="text-white font-semibold text-center">Buy</span>
                </div>
              </div>
            </div>
          </div>

          {/* New Help Button */}
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
              <TimelineItem
                title="General Enrollment"
                dates="Jan 1–Mar 31"
                progress={65}
              />
              <TimelineItem
                title="Open Enrollment"
                dates="Oct 15–Dec 7"
                progress={30}
              />
              <TimelineItem
                title="Special Enrollment"
                dates="Varies by case"
                progress={15}
              />
            </div>
          </div>

          <div className="flex justify-center gap-6 items-center">
            <button
              onClick={() => setShowOnboarding(true)}
              className="px-8 py-3 bg-gradient-to-r from-blue-400 to-purple-400 text-white rounded-xl hover:opacity-90 transition-opacity text-lg shadow-lg"
            >
            
            </button>
          </div>
        </div>

        <OnboardingOverlay
          isOpen={showOnboarding}
          onClose={() => setShowOnboarding(false)}
        />
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

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <NavigationBar />
      <FloatingBackground />
      
      <div className="absolute inset-0 z-0 opacity-20">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern 
              id="grid-pattern" 
              width="80" 
              height="80" 
              patternUnits="userSpaceOnUse"
            >
              <path 
                d="M80 0H0V80" 
                fill="none" 
                stroke="rgba(168,85,247,0.15)" 
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        </svg>
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-white/30 to-transparent animate-grid-pulse" />
      </div>

      <div className={`relative min-h-screen flex flex-col items-center justify-center p-4 transition-all duration-1000 ${transitioning ? 'opacity-0 scale-90' : 'opacity-100 scale-100'}`}>
        <div className="max-w-md w-full bg-white/30 backdrop-blur-xl rounded-2xl shadow-2xl p-8 relative overflow-hidden border border-purple-100/30 transform transition-all hover:shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-purple-50/30 z-0" />
          
          <div className="relative z-10 space-y-8">
            <h1 className="text-4xl font-bold text-center mb-8 animate-wobble">
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Welcome to Insurease
              </span>
            </h1>

            <form onSubmit={handleNameSubmit} className="space-y-8">
              <div className="relative group">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full px-4 py-3 bg-white/70 backdrop-blur-sm rounded-xl border-2 border-purple-100 focus:border-purple-200/50 focus:ring-2 focus:ring-purple-100/30 text-lg text-purple-900 transition-all duration-300 placeholder:text-purple-400/60 group-hover:shadow-lg"
                  required
                />
                <div className="absolute -bottom-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-300/50 to-transparent group-focus-within:via-purple-400/80 transition-all" />
              </div>
              
              <button
                type="submit"
                className="w-full px-4 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl hover:opacity-90 transition-all duration-300 text-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 hover:scale-102 active:scale-95 flex items-center justify-center gap-2 relative overflow-hidden"
              >
                <span className="relative z-10">Get Started</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-blue-400/20 animate-button-glow" />
                <svg 
                  className="w-5 h-5 relative z-10 animate-bounce-horizontal"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M17 8l4 4m0 0l-4 4m4-4H3" 
                  />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes grid-pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.15; }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(10deg); }
        }

        @keyframes wobble {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        @keyframes button-glow {
          0% { opacity: 0; transform: translateX(-100%); }
          50% { opacity: 0.4; }
          100% { opacity: 0; transform: translateX(100%); }
        }

        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }

        @keyframes bounce-horizontal {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(5px); }
        }

        .animate-grid-pulse {
          animation: grid-pulse 6s ease-in-out infinite;
        }

        .animate-float {
          animation: float 12s ease-in-out infinite;
        }

        .animate-wobble {
          animation: wobble 3s ease-in-out infinite;
        }

        .animate-button-glow {
          animation: button-glow 2.5s ease-in-out infinite;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }

        .animate-bounce {
          animation: bounce 2s infinite;
        }

        .animate-bounce-horizontal {
          animation: bounce-horizontal 1.5s infinite;
        }
      `}</style>
    </div>
  );
}

const TimelineItem = ({
  title,
  dates,
  progress,
}: {
  title: string;
  dates: string;
  progress: number;
}) => (
  <div className="space-y-2">
    <div className="flex justify-between text-base font-medium text-gray-700">
      <span>{title}</span>
      <span>{dates}</span>
    </div>
    <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-500 bg-gradient-to-r from-blue-300 to-purple-300"
        style={{ width: `${progress}%` }}
      />
    </div>
  </div>
);