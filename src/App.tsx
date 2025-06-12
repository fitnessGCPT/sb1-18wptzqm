import React, { useState } from 'react';
import { Phone, Mail, MapPin, Instagram, Facebook, Dumbbell, Users, Trophy, Smartphone, Star, ArrowRight, CheckCircle, ExternalLink } from 'lucide-react';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const response = await fetch('/.netlify/functions/submit-consultation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: 'success',
          message: 'Thank you for your inquiry! Gary will contact you within 24 hours.'
        });
        setFormData({ name: '', email: '', phone: '', service: '', message: '' });
      } else {
        setSubmitStatus({
          type: 'error',
          message: result.error || 'Failed to submit your request. Please try again.'
        });
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus({
        type: 'error',
        message: 'Network error. Please check your connection and try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleQRClick = () => {
    // Check if user is on mobile (screen width <= 768px)
    if (window.innerWidth <= 768) {
      // Redirect to app store on mobile
      // Replace this URL with Gary's actual app store link
      window.open('https://your-app-store-link.com', '_blank');
    } else {
      // Show scan message on desktop
      alert('Scan this QR code with your phone camera to download the GC-PT app!');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Dumbbell className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">GC-PT</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#about" className="text-gray-700 hover:text-blue-600 transition-colors">About</a>
              <a href="#services" className="text-gray-700 hover:text-blue-600 transition-colors">Services</a>
              <a href="#app" className="text-gray-700 hover:text-blue-600 transition-colors">Fitness App</a>
              <a href="#pricing" className="text-gray-700 hover:text-blue-600 transition-colors">Pricing</a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors">Contact</a>
            </div>
            <a href="tel:+61" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
              <Phone className="h-4 w-4" />
              <span>Call Now</span>
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-16 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-yellow-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Transform Your Body,
                <span className="text-yellow-300"> Transform Your Life</span>
              </h1>
              <p className="text-xl mb-8 text-yellow-100 leading-relaxed">
                Gary Collins brings over 20 years of fitness expertise to help you achieve your goals. 
                From weight loss to strength building, experience Brisbane's most trusted personal training.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <a href="#contact" className="bg-yellow-400 text-blue-800 px-8 py-4 rounded-lg font-semibold hover:bg-yellow-300 transition-colors flex items-center justify-center space-x-2">
                  <span>Start Your Journey</span>
                  <ArrowRight className="h-5 w-5" />
                </a>
                <a href="#services" className="border-2 border-yellow-400 text-yellow-400 px-8 py-4 rounded-lg font-semibold hover:bg-yellow-400 hover:text-blue-800 transition-colors text-center">
                  View Services
                </a>
              </div>
              <div className="grid grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-yellow-300">20+</div>
                  <div className="text-sm text-yellow-100">Years Experience</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-yellow-300">500+</div>
                  <div className="text-sm text-yellow-100">Clients Transformed</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-yellow-300">100%</div>
                  <div className="text-sm text-yellow-100">Satisfaction Rate</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="relative">
                <img 
                  src="https://images.pexels.com/photos/791763/pexels-photo-791763.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Personal trainer with kettlebells"
                  className="w-full h-96 lg:h-[500px] object-cover rounded-2xl shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent rounded-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Gary Collins - Personal Trainer"
                className="w-full h-96 object-cover rounded-2xl shadow-xl"
              />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Meet Gary Collins</h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                With over two decades in the fitness industry, Gary Collins has dedicated his career to 
                transforming lives through personalized fitness solutions. Based in Brisbane, Gary combines 
                scientific training methods with genuine care for each client's unique journey.
              </p>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                From professional athletes to everyday heroes, Gary has helped hundreds of clients achieve 
                their fitness goals. His approach focuses on sustainable lifestyle changes that deliver 
                lasting results, not quick fixes.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500" />
                  <span className="text-gray-700">Certified Trainer</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500" />
                  <span className="text-gray-700">Nutrition Specialist</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500" />
                  <span className="text-gray-700">Injury Rehabilitation</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500" />
                  <span className="text-gray-700">Mental Health Focus</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Training Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive fitness solutions tailored to your goals, lifestyle, and fitness level.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-8 rounded-2xl text-yellow-400 hover:scale-105 transition-transform">
              <Dumbbell className="h-12 w-12 mb-6 text-yellow-300" />
              <h3 className="text-2xl font-bold mb-4">Personal Training</h3>
              <p className="text-yellow-100 mb-6">
                One-on-one sessions designed specifically for your goals and fitness level.
              </p>
              <ul className="space-y-2 text-sm text-yellow-100">
                <li>• Customized workout plans</li>
                <li>• Form correction & technique</li>
                <li>• Progressive goal setting</li>
                <li>• Motivation & accountability</li>
              </ul>
            </div>

            <div className="bg-white border-2 border-gray-200 p-8 rounded-2xl hover:shadow-xl transition-shadow">
              <Users className="h-12 w-12 mb-6 text-blue-600" />
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Group Training</h3>
              <p className="text-gray-600 mb-6">
                Small group sessions that combine personal attention with team motivation.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Maximum 6 people per group</li>
                <li>• Varied workout routines</li>
                <li>• Cost-effective option</li>
                <li>• Social fitness environment</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-cyan-400 to-cyan-500 p-8 rounded-2xl text-navy-900 hover:scale-105 transition-transform">
              <Trophy className="h-12 w-12 mb-6 text-blue-900" />
              <h3 className="text-2xl font-bold mb-4">Athletic Performance</h3>
              <p className="text-blue-800 mb-6">
                Advanced training for athletes looking to excel in their sport.
              </p>
              <ul className="space-y-2 text-sm text-blue-800">
                <li>• Sport-specific training</li>
                <li>• Performance optimization</li>
                <li>• Injury prevention focus</li>
                <li>• Mental preparation</li>
              </ul>
            </div>

            <div className="bg-white border-2 border-gray-200 p-8 rounded-2xl hover:shadow-xl transition-shadow">
              <Star className="h-12 w-12 mb-6 text-blue-600" />
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Weight Loss Program</h3>
              <p className="text-gray-600 mb-6">
                Comprehensive approach combining exercise, nutrition, and lifestyle coaching.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Personalized meal plans</li>
                <li>• Cardio & strength training</li>
                <li>• Progress tracking</li>
                <li>• Lifestyle modification</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-cyan-400 to-cyan-500 p-8 rounded-2xl text-navy-900 hover:scale-105 transition-transform">
              <CheckCircle className="h-12 w-12 mb-6 text-blue-900" />
              <h3 className="text-2xl font-bold mb-4">Rehabilitation Training</h3>
              <p className="text-blue-800 mb-6">
                Safe, effective training for injury recovery and prevention.
              </p>
              <ul className="space-y-2 text-sm text-blue-800">
                <li>• Post-injury rehabilitation</li>
                <li>• Corrective exercise</li>
                <li>• Mobility improvement</li>
                <li>• Pain management</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-8 rounded-2xl text-yellow-400 hover:scale-105 transition-transform">
              <Smartphone className="h-12 w-12 mb-6 text-yellow-300" />
              <h3 className="text-2xl font-bold mb-4">Online Coaching</h3>
              <p className="text-yellow-100 mb-6">
                Virtual training sessions and 24/7 support through comprehensive online platforms.
              </p>
              <ul className="space-y-2 text-sm text-yellow-100">
                <li>• Live video sessions</li>
                <li>• Custom workout videos</li>
                <li>• Daily check-ins</li>
                <li>• Nutrition tracking</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Fitness App Section */}
      <section id="app" className="py-20 bg-gradient-to-br from-cyan-400 to-cyan-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-blue-900 mb-6">Online Training Solutions</h2>
              <p className="text-xl text-blue-800 mb-8 leading-relaxed">
                Access Gary's expertise anywhere with our comprehensive online training platforms. 
                From quick pocket workouts to full coaching programs, find the perfect fit for your lifestyle.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-900 p-2 rounded-lg">
                    <Dumbbell className="h-6 w-6 text-cyan-300" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-900">Pre-Set Workouts</h4>
                    <p className="text-blue-800">Proven methods and workouts for every goal</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-900 p-2 rounded-lg">
                    <Trophy className="h-6 w-6 text-cyan-300" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-900">Progress Tracking</h4>
                    <p className="text-blue-800">Monitor your improvements with detailed analytics</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-900 p-2 rounded-lg">
                    <Users className="h-6 w-6 text-cyan-300" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-900">Direct Coaching</h4>
                    <p className="text-blue-800">Chat with Gary and get instant feedback</p>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <p className="text-blue-900 font-semibold mb-4 text-lg">
                  GC-PT Pocket Trainer - $7.50/week, no lock-in
                </p>
                <div className="inline-block bg-white p-4 rounded-2xl shadow-xl">
                  <img 
                    src="/GCpocketTrainerQR.jpg"
                    alt="QR Code to download GC-PT Pocket Trainer"
                    className="w-48 h-48 mx-auto cursor-pointer hover:scale-105 transition-transform"
                    onClick={handleQRClick}
                  />
                </div>
                <p className="text-blue-800 text-sm mt-3">
                  Scan to access pocket trainer workouts
                </p>
              </div>

              {/* Full Online Coaching Button */}
              <div className="mt-8 text-center">
                <a 
                  href="https://www.trainerize.me/profile/gcpt4/Gary.Collins/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-colors space-x-2 shadow-xl hover:shadow-2xl transform hover:scale-105"
                >
                  <span>Explore Full Online Coaching</span>
                  <ExternalLink className="h-5 w-5" />
                </a>
                <p className="text-blue-800 text-sm mt-3">
                  Complete training programs with personalized coaching
                </p>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src="https://images.pexels.com/photos/1229356/pexels-photo-1229356.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Fitness app interface"
                className="w-full h-96 lg:h-[500px] object-cover rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Flexible Pricing Plans</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the perfect training solution that fits your budget and lifestyle. All plans include Gary's expert guidance and support.
            </p>
          </div>

          {/* Online Training Pricing */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">Online Training</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              {/* Pocket Trainer */}
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-6 rounded-2xl text-yellow-400 hover:scale-105 transition-transform">
                <div className="text-center mb-6">
                  <Smartphone className="h-12 w-12 mx-auto mb-4 text-yellow-300" />
                  <h4 className="text-xl font-bold mb-2">Pocket Trainer</h4>
                  <div className="text-3xl font-bold text-yellow-300">$7.50</div>
                  <div className="text-sm text-yellow-100">per week</div>
                </div>
                <ul className="space-y-2 text-sm text-yellow-100 mb-6">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-yellow-300" />
                    <span>Pre-set workouts</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-yellow-300" />
                    <span>Exercise library</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-yellow-300" />
                    <span>Progress tracking</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-yellow-300" />
                    <span>No lock-in contract</span>
                  </li>
                </ul>
                <button className="w-full bg-yellow-400 text-blue-800 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition-colors">
                  Get Started
                </button>
              </div>

              {/* Basic Online */}
              <div className="bg-white border-2 border-gray-200 p-6 rounded-2xl hover:shadow-xl transition-shadow">
                <div className="text-center mb-6">
                  <Users className="h-12 w-12 mx-auto mb-4 text-blue-600" />
                  <h4 className="text-xl font-bold mb-2 text-gray-900">Basic Online</h4>
                  <div className="text-3xl font-bold text-blue-600">$75</div>
                  <div className="text-sm text-gray-600">per week</div>
                </div>
                <ul className="space-y-2 text-sm text-gray-600 mb-6">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Custom workout plan</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Weekly check-ins</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Exercise video library</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Basic nutrition guidance</span>
                  </li>
                </ul>
                <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                  Choose Plan
                </button>
              </div>

              {/* Premium Online */}
              <div className="bg-gradient-to-br from-cyan-400 to-cyan-500 p-6 rounded-2xl text-blue-900 hover:scale-105 transition-transform relative">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-yellow-400 text-blue-900 px-4 py-1 rounded-full text-sm font-semibold">Most Popular</span>
                </div>
                <div className="text-center mb-6">
                  <Trophy className="h-12 w-12 mx-auto mb-4 text-blue-900" />
                  <h4 className="text-xl font-bold mb-2">Premium Online</h4>
                  <div className="text-3xl font-bold text-blue-900">$125</div>
                  <div className="text-sm text-blue-800">per week</div>
                </div>
                <ul className="space-y-2 text-sm text-blue-800 mb-6">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-blue-900" />
                    <span>Everything in Basic</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-blue-900" />
                    <span>Bi-weekly video calls</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-blue-900" />
                    <span>Detailed meal plans</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-blue-900" />
                    <span>24/7 chat support</span>
                  </li>
                </ul>
                <button className="w-full bg-blue-900 text-cyan-300 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors">
                  Choose Plan
                </button>
              </div>

              {/* Elite Online */}
              <div className="bg-white border-2 border-gray-200 p-6 rounded-2xl hover:shadow-xl transition-shadow">
                <div className="text-center mb-6">
                  <Star className="h-12 w-12 mx-auto mb-4 text-blue-600" />
                  <h4 className="text-xl font-bold mb-2 text-gray-900">Elite Online</h4>
                  <div className="text-3xl font-bold text-blue-600">$175</div>
                  <div className="text-sm text-gray-600">per week</div>
                </div>
                <ul className="space-y-2 text-sm text-gray-600 mb-6">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Everything in Premium</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Weekly video calls</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Supplement guidance</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Priority support</span>
                  </li>
                </ul>
                <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                  Choose Plan
                </button>
              </div>

              {/* Custom Online */}
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-6 rounded-2xl text-yellow-400 hover:scale-105 transition-transform">
                <div className="text-center mb-6">
                  <Dumbbell className="h-12 w-12 mx-auto mb-4 text-yellow-300" />
                  <h4 className="text-xl font-bold mb-2">Custom Program</h4>
                  <div className="text-3xl font-bold text-yellow-300">$250</div>
                  <div className="text-sm text-yellow-100">per week</div>
                </div>
                <ul className="space-y-2 text-sm text-yellow-100 mb-6">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-yellow-300" />
                    <span>Fully customized plan</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-yellow-300" />
                    <span>Daily check-ins</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-yellow-300" />
                    <span>Unlimited support</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-yellow-300" />
                    <span>VIP treatment</span>
                  </li>
                </ul>
                <button className="w-full bg-yellow-400 text-blue-800 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition-colors">
                  Contact Gary
                </button>
              </div>
            </div>
          </div>

          {/* In-Person Training Pricing */}
          <div>
            <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">In-Person Training</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              {/* Single Session */}
              <div className="bg-white border-2 border-gray-200 p-6 rounded-2xl hover:shadow-xl transition-shadow">
                <div className="text-center mb-6">
                  <Dumbbell className="h-12 w-12 mx-auto mb-4 text-blue-600" />
                  <h4 className="text-xl font-bold mb-2 text-gray-900">Single Session</h4>
                  <div className="text-3xl font-bold text-blue-600">$80</div>
                  <div className="text-sm text-gray-600">per session</div>
                </div>
                <ul className="space-y-2 text-sm text-gray-600 mb-6">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>1-hour session</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Personalized workout</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Form correction</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Goal assessment</span>
                  </li>
                </ul>
                <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                  Book Session
                </button>
              </div>

              {/* 4-Session Package */}
              <div className="bg-gradient-to-br from-cyan-400 to-cyan-500 p-6 rounded-2xl text-blue-900 hover:scale-105 transition-transform">
                <div className="text-center mb-6">
                  <Users className="h-12 w-12 mx-auto mb-4 text-blue-900" />
                  <h4 className="text-xl font-bold mb-2">4-Session Package</h4>
                  <div className="text-3xl font-bold text-blue-900">$300</div>
                  <div className="text-sm text-blue-800">$75 per session</div>
                </div>
                <ul className="space-y-2 text-sm text-blue-800 mb-6">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-blue-900" />
                    <span>Save $20 total</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-blue-900" />
                    <span>Progressive program</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-blue-900" />
                    <span>Nutrition guidance</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-blue-900" />
                    <span>2-month validity</span>
                  </li>
                </ul>
                <button className="w-full bg-blue-900 text-cyan-300 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors">
                  Buy Package
                </button>
              </div>

              {/* 8-Session Package */}
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-6 rounded-2xl text-yellow-400 hover:scale-105 transition-transform relative">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-yellow-400 text-blue-900 px-4 py-1 rounded-full text-sm font-semibold">Best Value</span>
                </div>
                <div className="text-center mb-6">
                  <Trophy className="h-12 w-12 mx-auto mb-4 text-yellow-300" />
                  <h4 className="text-xl font-bold mb-2">8-Session Package</h4>
                  <div className="text-3xl font-bold text-yellow-300">$560</div>
                  <div className="text-sm text-yellow-100">$70 per session</div>
                </div>
                <ul className="space-y-2 text-sm text-yellow-100 mb-6">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-yellow-300" />
                    <span>Save $80 total</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-yellow-300" />
                    <span>Comprehensive program</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-yellow-300" />
                    <span>Meal planning</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-yellow-300" />
                    <span>3-month validity</span>
                  </li>
                </ul>
                <button className="w-full bg-yellow-400 text-blue-800 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition-colors">
                  Buy Package
                </button>
              </div>

              {/* 12-Session Package */}
              <div className="bg-white border-2 border-gray-200 p-6 rounded-2xl hover:shadow-xl transition-shadow">
                <div className="text-center mb-6">
                  <Star className="h-12 w-12 mx-auto mb-4 text-blue-600" />
                  <h4 className="text-xl font-bold mb-2 text-gray-900">12-Session Package</h4>
                  <div className="text-3xl font-bold text-blue-600">$780</div>
                  <div className="text-sm text-gray-600">$65 per session</div>
                </div>
                <ul className="space-y-2 text-sm text-gray-600 mb-6">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Save $180 total</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Complete transformation</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Full nutrition plan</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>4-month validity</span>
                  </li>
                </ul>
                <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                  Buy Package
                </button>
              </div>

              {/* Group Training */}
              <div className="bg-gradient-to-br from-cyan-400 to-cyan-500 p-6 rounded-2xl text-blue-900 hover:scale-105 transition-transform">
                <div className="text-center mb-6">
                  <Users className="h-12 w-12 mx-auto mb-4 text-blue-900" />
                  <h4 className="text-xl font-bold mb-2">Group Training</h4>
                  <div className="text-3xl font-bold text-blue-900">$45</div>
                  <div className="text-sm text-blue-800">per session</div>
                </div>
                <ul className="space-y-2 text-sm text-blue-800 mb-6">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-blue-900" />
                    <span>Max 6 people</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-blue-900" />
                    <span>Fun atmosphere</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-blue-900" />
                    <span>Varied workouts</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-blue-900" />
                    <span>Cost effective</span>
                  </li>
                </ul>
                <button className="w-full bg-blue-900 text-cyan-300 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors">
                  Join Group
                </button>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">
              Not sure which option is right for you? Let's discuss your goals and find the perfect fit.
            </p>
            <a href="#contact" className="inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-colors space-x-2">
              <span>Get Free Consultation</span>
              <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Start Your Transformation</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ready to begin your fitness journey? Get in touch today for a free consultation.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Get In Touch</h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-600 p-3 rounded-lg">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Phone</h4>
                    <p className="text-gray-600">+61 XXX XXX XXX</p>
                    <p className="text-sm text-gray-500">Available Mon-Fri 6AM-8PM</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-600 p-3 rounded-lg">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Email</h4>
                    <p className="text-gray-600">gary@gc-pt.com.au</p>
                    <p className="text-sm text-gray-500">Response within 24 hours</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-600 p-3 rounded-lg">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Location</h4>
                    <p className="text-gray-600">344 Redbank Plains Road</p>
                    <p className="text-gray-600">Bellbird Park, QLD 4300</p>
                    <p className="text-sm text-gray-500">Free parking available</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-4">Follow Us</h4>
                <div className="flex space-x-4">
                  <a href="#" className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-lg text-white hover:scale-110 transition-transform">
                    <Instagram className="h-6 w-6" />
                  </a>
                  <a href="#" className="bg-blue-600 p-3 rounded-lg text-white hover:scale-110 transition-transform">
                    <Facebook className="h-6 w-6" />
                  </a>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Free Consultation</h3>
              
              {/* Status Messages */}
              {submitStatus.type && (
                <div className={`mb-6 p-4 rounded-lg ${
                  submitStatus.type === 'success' 
                    ? 'bg-green-50 border border-green-200 text-green-800' 
                    : 'bg-red-50 border border-red-200 text-red-800'
                }`}>
                  {submitStatus.message}
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Your full name"
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="your@email.com"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="+61 XXX XXX XXX"
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
                      Service Interest
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      disabled={isSubmitting}
                    >
                      <option value="">Select a service</option>
                      <option value="personal">Personal Training</option>
                      <option value="group">Group Training</option>
                      <option value="athletic">Athletic Performance</option>
                      <option value="weightloss">Weight Loss Program</option>
                      <option value="rehab">Rehabilitation Training</option>
                      <option value="online">Online Coaching</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Tell us about your goals
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="What are your fitness goals? Any injuries or limitations we should know about?"
                    disabled={isSubmitting}
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full px-8 py-4 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-colors ${
                    isSubmitting
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800'
                  } text-white`}
                >
                  <span>{isSubmitting ? 'Submitting...' : 'Book Free Consultation'}</span>
                  {!isSubmitting && <ArrowRight className="h-5 w-5" />}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Dumbbell className="h-8 w-8 text-yellow-400" />
                <span className="text-2xl font-bold">GC-PT</span>
              </div>
              <p className="text-gray-400 mb-4">
                Brisbane's premier personal training service with over 20 years of experience 
                helping people transform their lives through fitness.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Instagram className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Facebook className="h-6 w-6" />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#about" className="hover:text-white transition-colors">About Gary</a></li>
                <li><a href="#services" className="hover:text-white transition-colors">Services</a></li>
                <li><a href="#app" className="hover:text-white transition-colors">Fitness App</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
              <div className="space-y-2 text-gray-400">
                <p>344 Redbank Plains Road</p>
                <p>Bellbird Park, QLD 4300</p>
                <p>Phone: +61 XXX XXX XXX</p>
                <p>Email: gary@gc-pt.com.au</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 GC-PT Personal Training. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;