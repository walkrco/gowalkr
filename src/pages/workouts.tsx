import { WorkoutGenerator } from "@/components/workout-generator";
import { Twitter, Instagram, Youtube } from "lucide-react";

const Workouts = () => {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {/* Top Bar */}
      <div className="py-2 text-center transition-all duration-300" id="top-bar" style={{backgroundColor: '#ccff00'}}>
        <p className="text-xs text-black tracking-widest font-medium" style={{fontFamily: '"Helvetica Neue", "Arial", sans-serif'}}>
          INSTANT WORKOUTS • ZERO PLANNING • MAXIMUM RESULTS
        </p>
      </div>

      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-gray-900 py-4 transition-all duration-300" id="main-header">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-end">
              <span className="text-xl font-tungsten text-white">WALKR</span>
              <div className="w-2 h-2 rounded-full mb-1 ml-1" style={{backgroundColor: '#ccff00'}}></div>
            </div>
            
            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="/workouts" className="text-gray-300 hover:text-white transition-colors text-sm tracking-wide" style={{fontFamily: '"Helvetica Neue", "Arial", sans-serif'}}>WORKOUTS</a>
              <a href="/#how-it-works" className="text-gray-300 hover:text-white transition-colors text-sm tracking-wide" style={{fontFamily: '"Helvetica Neue", "Arial", sans-serif'}}>HOW IT WORKS</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm tracking-wide" style={{fontFamily: '"Helvetica Neue", "Arial", sans-serif'}}>ABOUT</a>
            </nav>
            
            {/* CTA Button */}
            <button 
              className="text-black px-4 py-2 text-xs rounded-full transition-all duration-300 hover:opacity-90" 
              style={{backgroundColor: '#ccff00', fontFamily: '"Helvetica Neue", "Arial", sans-serif'}}
            >
              START NOW
            </button>
          </div>
        </div>
      </header>
      
      <div className="flex-1 container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-tungsten text-white mb-4">
            LET'S GO!
          </h2>
          <p className="text-lg text-gray-400 max-w-xl mx-auto font-light tracking-widest" style={{fontFamily: '"Helvetica Neue", "Arial", sans-serif'}}>
            Pick your goal, time, and equipment. Get your workout.
          </p>
        </div>
        <WorkoutGenerator />
      </div>
      
      {/* Footer - Minimal */}
      <footer className="py-3 bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            <div className="flex-1"></div>
            
            {/* Social Media Icons - Center */}
            <div className="flex items-center space-x-6">
              <a 
                href="https://twitter.com/your-handle" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-all duration-300 hover:scale-110"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a 
                href="https://instagram.com/your-handle" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-pink-400 transition-all duration-300 hover:scale-110"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href="https://youtube.com/@your-channel" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-red-400 transition-all duration-300 hover:scale-110"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
            
            {/* Copyright - Right */}
            <div className="flex-1 flex justify-end">
              <p className="text-gray-500 text-xs">
                © 2025 WALKR
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Workouts;