import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Target, Share2, Twitter, Instagram, Youtube } from "lucide-react";

const Landing = () => {
  const navigate = useNavigate();
  const [exerciseCount, setExerciseCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const statsRef = useRef(null);


  // Animate stats counter
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Header scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const topBar = document.getElementById('top-bar');
      const mainHeader = document.getElementById('main-header');
      
      if (window.scrollY > 50) {
        topBar?.classList.add('opacity-0', '-translate-y-full');
        mainHeader?.classList.add('shadow-lg');
      } else {
        topBar?.classList.remove('opacity-0', '-translate-y-full');
        mainHeader?.classList.remove('shadow-lg');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isVisible) {
      const timer = setInterval(() => {
        setExerciseCount(prev => {
          if (prev < 440) {
            return prev + 8;
          }
          return 440;
        });
      }, 30);
      return () => clearInterval(timer);
    }
  }, [isVisible]);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
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
            
            {/* Navigation + CTA */}
            <div className="flex items-center space-x-4">
              <nav className="hidden md:flex items-center space-x-4">
                <a href="/workouts" className="text-gray-300 hover:text-white transition-colors text-sm tracking-wide" style={{fontFamily: '"Helvetica Neue", "Arial", sans-serif'}}>WORKOUTS</a>
                <a href="/#how-it-works" className="text-gray-300 hover:text-white transition-colors text-sm tracking-wide" style={{fontFamily: '"Helvetica Neue", "Arial", sans-serif'}}>HOW IT WORKS</a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm tracking-wide" style={{fontFamily: '"Helvetica Neue", "Arial", sans-serif'}}>ABOUT</a>
              </nav>
              
              <Button 
                onClick={() => navigate('/workouts')}
                size="sm"
                className="text-black px-4 py-2 text-xs rounded-full transition-all duration-300 hover:opacity-90" 
                style={{backgroundColor: '#ccff00', fontFamily: '"Helvetica Neue", "Arial", sans-serif'}}
              >
                START NOW
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative flex items-center justify-center overflow-hidden" style={{minHeight: 'calc(100vh - 8rem)', paddingTop: '2rem'}}>
        {/* Background */}
        <div className="absolute inset-0 bg-gray-900" />
        <div className="absolute inset-0 bg-[url('/hero-bg.jpg')] bg-cover bg-center opacity-10" />
        

        {/* Content */}
        <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
          <div className="space-y-16">
            {/* Main Headline - Enhanced */}
            <div className="space-y-8">
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-tungsten text-white leading-none tracking-tight">
                FASTER.<br/>
                STRONGER.<br/>
                <span className="animate-pulse" style={{color: '#ccff00'}}>
                  SMARTER.
                </span>
              </h1>
              <div className="space-y-4">
                <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-medium" style={{fontFamily: '"Helvetica Neue", "Arial", sans-serif'}}>
                  Same routine, same results. Break the cycle.
                </p>
                <Button 
                  onClick={() => navigate('/workouts')}
                  size="default"
                  className="text-black px-8 py-3 text-base rounded-full transition-all duration-300 hover:opacity-90" 
                  style={{
                    backgroundColor: '#ccff00',
                    fontFamily: 'Blenderpro, sans-serif', 
                    fontWeight: '500'
                  }}
                >
                  START TRAINING
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section - Enhanced */}
      <section className="py-20 bg-white text-black overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-7xl font-tungsten text-black mb-6 tracking-tight">
              WHY WALKR?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light leading-relaxed" style={{fontFamily: '"Helvetica Neue", "Arial", sans-serif'}}>
              Generate personalised workouts in seconds - no planning, no thinking. Just results that hit different every time.
            </p>
          </div>
          
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-12">
              {/* Step 1 - Enhanced */}
              <div className="text-center space-y-6 group">
                <div className="relative">
                  <div className="w-24 h-24 bg-black rounded-full flex items-center justify-center mx-auto mb-6 transition-all duration-500 group-hover:scale-110 group-hover:shadow-2xl">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <div className="hidden md:block absolute top-12 left-full w-16 h-px bg-gradient-to-r from-gray-300 to-transparent -translate-x-8"></div>
                </div>
                <h3 className="text-2xl font-tungsten text-black tracking-wide">INSTANT</h3>
                <p className="text-gray-600 text-lg leading-relaxed font-light" style={{fontFamily: '"Helvetica Neue", "Arial", sans-serif'}}>
                  Get personalised workouts in under 3 seconds. Perfect for busy schedules and spontaneous sessions.
                </p>
              </div>
              
              {/* Step 2 - Enhanced */}
              <div className="text-center space-y-6 group">
                <div className="relative">
                  <div className="w-24 h-24 bg-black rounded-full flex items-center justify-center mx-auto mb-6 transition-all duration-500 group-hover:scale-110 group-hover:shadow-2xl">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <div className="hidden md:block absolute top-12 left-full w-16 h-px bg-gradient-to-r from-gray-300 to-transparent -translate-x-8"></div>
                </div>
                <h3 className="text-2xl font-tungsten text-black tracking-wide">TARGETED</h3>
                <p className="text-gray-600 text-lg leading-relaxed font-light" style={{fontFamily: '"Helvetica Neue", "Arial", sans-serif'}}>
                  Every workout is tailored to your specific fitness goals and available equipment.
                </p>
              </div>
              
              {/* Step 3 - Enhanced */}
              <div className="text-center space-y-6 group">
                <div className="w-24 h-24 bg-black rounded-full flex items-center justify-center mx-auto mb-6 transition-all duration-500 group-hover:scale-110 group-hover:shadow-2xl">
                  <Share2 className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-tungsten text-black tracking-wide">SOCIAL</h3>
                <p className="text-gray-600 text-lg leading-relaxed font-light" style={{fontFamily: '"Helvetica Neue", "Arial", sans-serif'}}>
                  Share instantly on TikTok, Instagram, and Twitter. Challenge friends and build accountability.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - Animated */}
      <section ref={statsRef} className="py-32 bg-gray-800">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-16 max-w-6xl mx-auto text-center">
            <div className="space-y-6 group">
              <div className="text-8xl font-tungsten text-white transition-all duration-500 group-hover:scale-110">
                {exerciseCount}+
              </div>
              <p className="text-2xl font-tungsten text-gray-300 tracking-wide">EXERCISES</p>
              <p className="text-gray-400 font-light text-lg" style={{fontFamily: '"Helvetica Neue", "Arial", sans-serif'}}>Never run out of variety</p>
            </div>
            <div className="space-y-6 group">
              <div className="text-8xl font-tungsten transition-all duration-500 group-hover:scale-110" style={{color: '#ccff00'}}>5-30</div>
              <p className="text-2xl font-tungsten text-gray-300 tracking-wide">MINUTES</p>
              <p className="text-gray-400 font-light text-lg" style={{fontFamily: '"Helvetica Neue", "Arial", sans-serif'}}>Fits any schedule</p>
            </div>
            <div className="space-y-6 group">
              <div className="text-8xl font-tungsten text-white transition-all duration-500 group-hover:scale-110">3</div>
              <p className="text-2xl font-tungsten text-gray-300 tracking-wide">EQUIPMENT TYPES</p>
              <p className="text-gray-400 font-light text-lg" style={{fontFamily: '"Helvetica Neue", "Arial", sans-serif'}}>Bodyweight to full gym</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - Marchon Style Sticky */}
      <section id="how-it-works" className="bg-gray-400">
        <div className="grid md:grid-cols-2">
          {/* Sticky Left Side */}
          <div className="md:sticky md:top-0 md:h-screen flex items-center py-32 px-6 md:px-12">
            <div>
              <h2 className="text-6xl md:text-8xl lg:text-9xl font-tungsten text-black tracking-tight">
                HOW IT WORKS
              </h2>
            </div>
          </div>
          
          {/* Scrolling Right Side - Charcoal */}
          <div className="bg-gray-800 py-32 px-6 md:px-12 min-h-screen">
            <div className="space-y-32">
            {/* Step 1: Generate */}
            <div className="space-y-8">
              <div className="w-1 h-16" style={{backgroundColor: '#ccff00'}}></div>
              <div>
                <div className="text-sm text-gray-400 mb-2 tracking-widest" style={{fontFamily: '"Helvetica Neue", "Arial", sans-serif'}}>STEP ONE</div>
                <h3 className="text-4xl font-tungsten text-white mb-6">GENERATE</h3>
                <p className="text-xl text-gray-300 font-light leading-relaxed tracking-widest" style={{fontFamily: '"Helvetica Neue", "Arial", sans-serif'}}>
                  Advanced algorithms analyze your parameters to create bespoke workout sequences in milliseconds.
                </p>
              </div>

            </div>

            {/* Step 2: Train */}
            <div className="space-y-8">
              <div className="w-1 h-16 bg-white"></div>
              <div>
                <div className="text-sm text-gray-400 mb-2 tracking-widest" style={{fontFamily: '"Helvetica Neue", "Arial", sans-serif'}}>STEP TWO</div>
                <h3 className="text-4xl font-tungsten text-white mb-6">EXECUTE</h3>
                <p className="text-xl text-gray-300 font-light leading-relaxed tracking-widest" style={{fontFamily: '"Helvetica Neue", "Arial", sans-serif'}}>
                  Precision timing and seamless transitions guide you through each movement with professional accuracy.
                </p>
              </div>

            </div>

            {/* Step 3: Share */}
            <div className="space-y-8">
              <div className="w-1 h-16" style={{backgroundColor: '#ccff00'}}></div>
              <div>
                <div className="text-sm text-gray-400 mb-2 tracking-widest" style={{fontFamily: '"Helvetica Neue", "Arial", sans-serif'}}>STEP THREE</div>
                <h3 className="text-4xl font-tungsten text-white mb-6">AMPLIFY</h3>
                <p className="text-xl text-gray-300 font-light leading-relaxed tracking-widest" style={{fontFamily: '"Helvetica Neue", "Arial", sans-serif'}}>
                  Seamlessly distribute your achievements across platforms to build momentum and accountability.
                </p>
              </div>

            </div>

            {/* Step 4: Repeat */}
            <div className="space-y-8">
              <div className="w-1 h-16 bg-white"></div>
              <div>
                <div className="text-sm text-gray-400 mb-2 tracking-widest" style={{fontFamily: '"Helvetica Neue", "Arial", sans-serif'}}>STEP FOUR</div>
                <h3 className="text-4xl font-tungsten text-white mb-6">EVOLVE</h3>
                <p className="text-xl text-gray-300 font-light leading-relaxed tracking-widest" style={{fontFamily: '"Helvetica Neue", "Arial", sans-serif'}}>
                  Continuous variation ensures progressive adaptation and sustained engagement.
                </p>
              </div>

            </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section - Enhanced */}
      <section className="py-40 bg-white text-black relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="max-w-5xl mx-auto space-y-16">
            <div className="text-7xl md:text-9xl font-tungsten text-black tracking-tight" style={{lineHeight: '0.8'}}>
              READY TO<br/>
              <span className="text-5xl md:text-7xl text-black" style={{backgroundColor: '#ccff00', padding: '0.25rem 0.75rem', borderRadius: '0.5rem'}}>
                TRANSFORM
              </span>
            </div>
            <div>
              <Button 
                onClick={() => navigate('/workouts')}
                size="default"
                className="bg-black text-white hover:bg-gray-900 px-8 py-3 text-base rounded-full transition-all duration-300"
                style={{
                  fontFamily: 'Blenderpro, sans-serif', 
                  fontWeight: '500'
                }}
              >
                START YOUR JOURNEY
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Minimal */}
      <footer className="py-3 bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            <div className="flex-1"></div>
            
            {/* Social Media Icons - Center */}
            <div className="flex items-center space-x-6">
              <a 
                href="https://twitter.com/walkrco" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-all duration-300 hover:scale-110"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a 
                href="https://instagram.com/walkrco" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-pink-400 transition-all duration-300 hover:scale-110"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href="https://youtube.com/@walkrco" 
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

export default Landing;