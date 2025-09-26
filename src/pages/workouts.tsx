import { WorkoutGenerator } from "@/components/workout-generator";
import { Twitter, Instagram, Youtube } from "lucide-react";

const Workouts = () => {
  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Header */}
      <header className="backdrop-blur-sm bg-black sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 text-center">
          <div className="flex items-end justify-center">
            <span className="text-xl font-tungsten text-white">WALKR</span>
            <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-1 ml-1"></div>
          </div>
        </div>
      </header>
      
      <div className="flex-1 container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-tungsten text-white mb-4">
            LET'S GO!
          </h2>
          <p className="text-lg text-gray-400 max-w-xl mx-auto font-light" style={{fontFamily: '"Helvetica Neue", "Arial", sans-serif'}}>
            Pick your goal, time, and equipment. Get your workout.
          </p>
        </div>
        <WorkoutGenerator />
      </div>
      
      {/* Footer - Minimal */}
      <footer className="py-3 bg-black">
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