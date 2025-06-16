"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaBars, FaTimes } from "react-icons/fa";

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
              onClick={() => router.push('/Guide')}
              className="relative text-gray-600 hover:text-purple-600 transition-colors px-2 py-1 group"
            >
              Guide
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

export default NavigationBar;