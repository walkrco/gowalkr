import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, MessageSquare, Briefcase, Twitter, Instagram, Youtube } from "lucide-react";

const Contact = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        alert('Message sent successfully! We\'ll get back to you soon.');
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message. Please try emailing us directly.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

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
                <a href="/features" className="text-gray-300 hover:text-white transition-colors text-sm tracking-wide" style={{fontFamily: '"Helvetica Neue", "Arial", sans-serif'}}>FEATURES</a>
                <a href="/contact" className="text-white text-sm tracking-wide" style={{fontFamily: '"Helvetica Neue", "Arial", sans-serif'}}>CONTACT</a>
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
            GET IN TOUCH
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto font-light">
            Questions, feedback, or business inquiries? We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20 bg-white text-black">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-16">
            <div className="text-center space-y-4 p-6">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-tungsten text-black">GENERAL SUPPORT</h3>
              <p className="text-gray-600 font-light mb-4">
                Bug reports, feature requests, and general questions
              </p>
              <a href="mailto:hello@gowalkr.com" className="text-black font-medium hover:opacity-70">
                hello@gowalkr.com
              </a>
            </div>

            <div className="text-center space-y-4 p-6">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto">
                <Briefcase className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-tungsten text-black">BUSINESS INQUIRIES</h3>
              <p className="text-gray-600 font-light mb-4">
                Partnerships, press, and collaboration opportunities
              </p>
              <a href="mailto:business@gowalkr.com" className="text-black font-medium hover:opacity-70">
                business@gowalkr.com
              </a>
            </div>

            <div className="text-center space-y-4 p-6">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto">
                <MessageSquare className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-tungsten text-black">FEEDBACK</h3>
              <p className="text-gray-600 font-light mb-4">
                Share your thoughts and help us improve WALKR
              </p>
              <a href="mailto:feedback@gowalkr.com" className="text-black font-medium hover:opacity-70">
                feedback@gowalkr.com
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20" style={{backgroundColor: '#141414'}}>
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-5xl md:text-6xl font-tungsten text-white mb-4 tracking-tight">
                SEND A MESSAGE
              </h2>
              <p className="text-xl text-gray-300 font-light">
                Prefer to use a form? Drop us a line below.
              </p>
            </div>

            <Card className="border border-gray-800" style={{backgroundColor: '#141414'}}>
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-white font-medium mb-2" style={{fontFamily: '"Helvetica Neue", "Arial", sans-serif'}}>
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-700 bg-gray-900 text-white focus:border-[#ccff00] focus:outline-none"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-white font-medium mb-2" style={{fontFamily: '"Helvetica Neue", "Arial", sans-serif'}}>
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-700 bg-gray-900 text-white focus:border-[#ccff00] focus:outline-none"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2" style={{fontFamily: '"Helvetica Neue", "Arial", sans-serif'}}>
                      Subject
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-700 bg-gray-900 text-white focus:border-[#ccff00] focus:outline-none"
                    >
                      <option value="">Select a subject</option>
                      <option value="general">General Support</option>
                      <option value="business">Business Inquiry</option>
                      <option value="feedback">Feedback</option>
                      <option value="bug">Bug Report</option>
                      <option value="feature">Feature Request</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2" style={{fontFamily: '"Helvetica Neue", "Arial", sans-serif'}}>
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 rounded-lg border border-gray-700 bg-gray-900 text-white focus:border-[#ccff00] focus:outline-none resize-none"
                      placeholder="Tell us how we can help..."
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full text-black py-4 text-lg font-semibold hover:opacity-90"
                    style={{backgroundColor: '#ccff00'}}
                  >
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Social Links */}
      <section className="py-20 bg-white text-black">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-tungsten text-black mb-8 tracking-tight">
            FOLLOW THE JOURNEY
          </h2>
          <p className="text-xl text-gray-600 font-light mb-8">
            Stay updated with the latest from WALKR
          </p>
          <div className="flex justify-center space-x-8">
            <a 
              href="https://twitter.com/walkrco" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-black hover:opacity-70 transition-all duration-300"
            >
              <Twitter className="w-6 h-6" />
              <span className="font-medium">Twitter</span>
            </a>
            <a 
              href="https://instagram.com/walkrco" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-black hover:opacity-70 transition-all duration-300"
            >
              <Instagram className="w-6 h-6" />
              <span className="font-medium">Instagram</span>
            </a>
            <a 
              href="https://youtube.com/@walkrco" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-black hover:opacity-70 transition-all duration-300"
            >
              <Youtube className="w-6 h-6" />
              <span className="font-medium">YouTube</span>
            </a>
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

export default Contact;