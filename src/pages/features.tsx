import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BarChart3, History, Clock, Target, Zap, Users, Crown, Calendar } from "lucide-react";

const Features = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen text-white" style={{backgroundColor: '#141414'}}>
      <style>{`body { background-color: #141414; }`}</style>
      
      {/* Header */}
      <header className="py-6" style={{backgroundColor: '#141414'}}>
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <a href="/" className="cursor-pointer">
                <img src="/logo.svg" alt="WALKR" className="h-10 mr-auto" />
              </a>
            </div>
            
            <div className="flex items-center space-x-4">
              <nav className="hidden md:flex items-center space-x-4">
                <a href="/workouts" className="text-gray-300 hover:text-white transition-colors text-sm tracking-wide" style={{fontFamily: '"Helvetica Neue", "Arial", sans-serif'}}>WORKOUTS</a>
                <a href="/features" className="text-white text-sm tracking-wide" style={{fontFamily: '"Helvetica Neue", "Arial", sans-serif'}}>FEATURES</a>
                <a href="/contact" className="text-gray-300 hover:text-white transition-colors text-sm tracking-wide" style={{fontFamily: '"Helvetica Neue", "Arial", sans-serif'}}>CONTACT</a>
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
      <section className="py-20 px-6">
        <div className="container mx-auto text-center">
          <h1 className="text-6xl md:text-8xl font-tungsten text-white mb-6 tracking-tight">
            FEATURES
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto font-light">
            Discover what makes WALKR the ultimate fitness companion. From instant workouts to advanced analytics.
          </p>
        </div>
      </section>

      {/* Current Features */}
      <section className="py-20 bg-white text-black">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-tungsten text-black mb-4 tracking-tight">
              AVAILABLE NOW
            </h2>
            <p className="text-xl text-gray-600 font-light">
              Start your fitness journey today with these core features
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="text-center space-y-4 p-6">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-tungsten text-black">INSTANT GENERATION</h3>
              <p className="text-gray-600 font-light">
                Get personalised workouts in under 3 seconds. No planning, just results.
              </p>
            </div>

            <div className="text-center space-y-4 p-6">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-tungsten text-black">SMART TARGETING</h3>
              <p className="text-gray-600 font-light">
                Workouts tailored to your goals, time, and available equipment.
              </p>
            </div>

            <div className="text-center space-y-4 p-6">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-tungsten text-black">BUILT-IN TIMER</h3>
              <p className="text-gray-600 font-light">
                Guided timing with work/rest periods. Stay focused and motivated.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Coming Soon Features */}
      <section className="py-20" style={{backgroundColor: '#141414'}}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-tungsten text-white mb-4 tracking-tight">
              COMING SOON
            </h2>
            <p className="text-xl text-gray-300 font-light">
              The future of fitness is being built. Here's what's next.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Workout History */}
            <div className="space-y-6 p-8 rounded-lg border border-gray-800">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{backgroundColor: '#ccff00'}}>
                  <History className="w-6 h-6 text-black" />
                </div>
                <div>
                  <h3 className="text-2xl font-tungsten text-white">WORKOUT HISTORY</h3>
                  <span className="text-xs px-2 py-1 rounded-full text-black font-medium" style={{backgroundColor: '#ccff00'}}>PREMIUM</span>
                </div>
              </div>
              <p className="text-gray-300 font-light leading-relaxed">
                Track every workout you've completed. See your consistency, favourite exercises, and workout frequency over time.
              </p>
            </div>

            {/* Progress Analytics */}
            <div className="space-y-6 p-8 rounded-lg border border-gray-800">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{backgroundColor: '#ccff00'}}>
                  <BarChart3 className="w-6 h-6 text-black" />
                </div>
                <div>
                  <h3 className="text-2xl font-tungsten text-white">PROGRESS ANALYTICS</h3>
                  <span className="text-xs px-2 py-1 rounded-full text-black font-medium" style={{backgroundColor: '#ccff00'}}>PREMIUM</span>
                </div>
              </div>
              <p className="text-gray-300 font-light leading-relaxed">
                Visualise your fitness journey with detailed charts. Track workout frequency, duration trends, and goal achievements.
              </p>
            </div>

            {/* Custom Templates */}
            <div className="space-y-6 p-8 rounded-lg border border-gray-800">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{backgroundColor: '#ccff00'}}>
                  <Crown className="w-6 h-6 text-black" />
                </div>
                <div>
                  <h3 className="text-2xl font-tungsten text-white">CUSTOM TEMPLATES</h3>
                  <span className="text-xs px-2 py-1 rounded-full text-black font-medium" style={{backgroundColor: '#ccff00'}}>PREMIUM</span>
                </div>
              </div>
              <p className="text-gray-300 font-light leading-relaxed">
                Save your favourite workout styles as templates. Create personalised routines that match your exact preferences.
              </p>
            </div>

            {/* Workout Scheduling */}
            <div className="space-y-6 p-8 rounded-lg border border-gray-800">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{backgroundColor: '#ccff00'}}>
                  <Calendar className="w-6 h-6 text-black" />
                </div>
                <div>
                  <h3 className="text-2xl font-tungsten text-white">WORKOUT SCHEDULING</h3>
                  <span className="text-xs px-2 py-1 rounded-full text-black font-medium" style={{backgroundColor: '#ccff00'}}>PREMIUM</span>
                </div>
              </div>
              <p className="text-gray-300 font-light leading-relaxed">
                Plan your week ahead. Schedule workouts, set reminders, and build consistent fitness habits that stick.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Teaser */}
      <section className="py-20 bg-white text-black">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <h2 className="text-5xl md:text-6xl font-tungsten text-black tracking-tight">
              UNLOCK EVERYTHING
            </h2>
            <p className="text-xl text-gray-600 font-light">
              Get unlimited workouts and premium features for less than a coffee per week
            </p>
            <div className="text-4xl font-tungsten text-black">
              £4.99<span className="text-lg font-light">/month</span>
            </div>
            <Button 
              onClick={() => navigate('/workouts')}
              className="text-black px-8 py-4 text-lg font-semibold hover:opacity-90" 
              style={{backgroundColor: '#ccff00'}}
            >
              Start Free Trial
            </Button>
            <p className="text-sm text-gray-500">
              7-day free trial • Cancel anytime • No commitment
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6" style={{backgroundColor: '#141414'}}>
        <div className="container mx-auto px-6">
          <div className="text-center">
            <p className="text-gray-500 text-sm">
              © 2025 WALKR. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Features;