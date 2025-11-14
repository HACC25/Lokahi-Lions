import React, { useState, useEffect } from 'react';
import { Sparkles, BookOpen, TrendingUp, ArrowRight, Brain, Zap, PlayCircle, HelpCircle } from 'lucide-react';

export default function StudyAdvisorLanding() {
  const [interests, setInterests] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [animateResults, setAnimateResults] = useState(false);
  const [email, setEmail] = useState('');
  const [scrollY, setScrollY] = useState(0);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const suggestedInterests = [
    'Video Games', 'Climate Change', 'Music Production', 'Psychology',
    'Space Exploration', 'Fashion', 'Robotics', 'Writing'
  ];

  const fieldDatabase: Record<string, { field: string; match: number; icon: string }> = {
    'Video Games': { field: 'Game Design & Development', match: 95, icon: '🎮' },
    'Climate Change': { field: 'Environmental Science', match: 92, icon: '🌍' },
    'Music Production': { field: 'Audio Engineering', match: 94, icon: '🎵' },
    'Psychology': { field: 'Clinical Psychology', match: 96, icon: '🧠' },
    'Space Exploration': { field: 'Aerospace Engineering', match: 93, icon: '🚀' },
    'Fashion': { field: 'Fashion Design & Marketing', match: 91, icon: '👗' },
    'Robotics': { field: 'Robotics Engineering', match: 97, icon: '🤖' },
    'Writing': { field: 'Creative Writing & Literature', match: 94, icon: '✍️' }
  };

  const addInterest = (interest: string) => {
    if (!interests.includes(interest) && interests.length < 4) {
      const newInterests = [...interests, interest];
      setInterests(newInterests);
      setInputValue('');
      if (newInterests.length >= 2) {
        setShowResults(true);
        setTimeout(() => setAnimateResults(true), 100);
      }
    }
  };

  const removeInterest = (interest: string) => {
    setInterests(interests.filter(i => i !== interest));
    if (interests.length <= 2) {
      setShowResults(false);
      setAnimateResults(false);
    }
  };

  const getRecommendations = () => {
    return interests.map(interest => fieldDatabase[interest] || {
      field: 'Computer Science',
      match: 88,
      icon: '💻'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 via-emerald-900 to-slate-900 text-white">
      {/* Floating background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-700 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-emerald-600 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-teal-700 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrollY > 50 ? 'bg-black/30 backdrop-blur-lg' : ''}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 text-2xl font-bold">
            <Brain className="text-emerald-400" />
            <span className="bg-gradient-to-r from-emerald-300 to-teal-300 bg-clip-text text-transparent">UH Pathfinder</span>
          </div>
          <button className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-105">
            Sign In
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600/20 rounded-full mb-6 backdrop-blur-sm animate-pulse">
              <Sparkles className="w-4 h-4 text-emerald-300" />
              <span className="text-sm text-emerald-200">AI-Powered Career Discovery</span>
            </div>
            <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
              Find Your Perfect
              <span className="bg-gradient-to-r from-emerald-300 via-teal-300 to-cyan-300 bg-clip-text text-transparent"> Field of Study</span>
            </h1>
            <p className="text-xl text-slate-200 mb-8 leading-relaxed">
              Our AI analyzes your interests, passions, and goals to match you with a personalized educational and career path
            </p>
          </div>

          {/* Interactive Demo Card */}
          <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 transform hover:scale-[1.02] transition-all duration-500">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-xl flex items-center justify-center">
                <Zap className="text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">Try It Now</h3>
                <p className="text-slate-300 text-sm">Add 2-4 interests to see your personalized matches</p>
              </div>
            </div>

            {/* Interest Input */}
            <div className="mb-6">
              <div className="flex flex-wrap gap-2 mb-4">
                {interests.map(interest => (
                  <span
                    key={interest}
                    className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full flex items-center gap-2 animate-in fade-in slide-in-from-bottom-4 duration-300"
                  >
                    {interest}
                    <button onClick={() => removeInterest(interest)} className="hover:text-red-300 transition-colors">
                      ×
                    </button>
                  </span>
                ))}
              </div>
              
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && inputValue && addInterest(inputValue)}
                placeholder="Type an interest and press Enter..."
                className="w-full px-6 py-4 bg-white/5 border border-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all placeholder-slate-400"
              />
              
              <div className="flex flex-wrap gap-2 mt-4">
                {suggestedInterests.filter(s => !interests.includes(s)).slice(0, 8).map(suggestion => (
                  <button
                    key={suggestion}
                    onClick={() => addInterest(suggestion)}
                    disabled={interests.length >= 4}
                    className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-sm transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    + {suggestion}
                  </button>
                ))}
              </div>
            </div>

            {/* Results */}
            {showResults && (
              <div className={`space-y-4 transition-all duration-700 ${animateResults ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="text-emerald-400 animate-pulse" />
                  <h4 className="text-xl font-semibold">Your Personalized Matches</h4>
                </div>
                {getRecommendations().map((rec, idx) => (
                  <div
                    key={idx}
                    className="bg-gradient-to-r from-emerald-700/20 to-teal-700/20 backdrop-blur-sm p-6 rounded-2xl border border-white/20 hover:border-emerald-500/50 transition-all duration-300 hover:scale-[1.02]"
                    style={{animationDelay: `${idx * 100}ms`}}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex gap-4 flex-1">
                        <div className="text-4xl">{rec.icon}</div>
                        <div className="flex-1">
                          <h5 className="text-xl font-semibold mb-2">{rec.field}</h5>
                          <div className="flex items-center gap-2 text-sm text-slate-200">
                            <div className="flex-1 bg-white/10 rounded-full h-2">
                              <div 
                                className="bg-gradient-to-r from-emerald-400 to-teal-400 h-full rounded-full transition-all duration-1000"
                                style={{width: `${rec.match}%`}}
                              ></div>
                            </div>
                            <span className="font-semibold text-emerald-300">{rec.match}% Match</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* CTA after seeing results */}
                <div className="mt-8 p-6 bg-gradient-to-r from-emerald-700 to-teal-700 rounded-2xl text-center">
                  <h4 className="text-2xl font-bold mb-3">Want More Detailed Insights?</h4>
                  <p className="mb-4 text-slate-100">Get career paths, salary projections, course recommendations & more</p>
                  <div className="flex gap-3 max-w-md mx-auto">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="flex-1 px-4 py-3 rounded-xl bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white placeholder-white/60"
                    />
                    <button className="px-6 py-3 bg-white text-emerald-800 rounded-xl font-semibold hover:bg-slate-100 transition-all hover:scale-105 flex items-center gap-2 shadow-lg">
                      Sign Up <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Why UH Pathfinder?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Brain, title: 'Advanced AI Analysis', desc: 'Our AI provides personalized suggestions based on  your unique profile' },
              { icon: BookOpen, title: '500+ Programs', desc: 'Access detailed information on programs across all of the UH campuses' },
              { icon: TrendingUp, title: 'Career Insights', desc: 'See salary projections, job growth, and career paths for each field' },
            ].map((feature, idx) => (
              <div key={idx} className="group p-8 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 hover:border-emerald-500/50 transition-all duration-300 hover:scale-105 hover:bg-white/10">
                <feature.icon className="w-12 h-12 text-emerald-400 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-slate-300">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* User Guide Section */}
      <section className="py-20 px-6 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600/20 rounded-full mb-4 backdrop-blur-sm">
              <HelpCircle className="w-4 h-4 text-emerald-300" />
              <span className="text-sm text-emerald-200">Quick Start Guide</span>
            </div>
            <h2 className="text-4xl font-bold mb-4">How to Navigate UH Pathfinder</h2>
            <p className="text-xl text-slate-200">Get started in 3 simple steps</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Video Tutorial */}
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 overflow-hidden hover:border-emerald-500/50 transition-all duration-300">
                {!showVideo ? (
                  <div 
                    className="relative aspect-video bg-gradient-to-br from-emerald-800/30 to-teal-800/30 flex items-center justify-center cursor-pointer group"
                    onClick={() => setShowVideo(true)}
                  >
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="relative z-10 text-center">
                      <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg">
                        <PlayCircle className="w-12 h-12 text-emerald-700" />
                      </div>
                      <p className="text-lg font-semibold">Watch Tutorial Video</p>
                      <p className="text-sm text-slate-300">2 minutes</p>
                    </div>
                  </div>
                ) : (
                  <div className="aspect-video bg-black flex items-center justify-center">
                    <iframe
                      width="100%"
                      height="100%"
                      src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                      title="StudyPath AI Tutorial"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    ></iframe>
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Complete Walkthrough</h3>
                  <p className="text-slate-300">Learn how to use all features, from interest input to career exploration</p>
                </div>
              </div>
            </div>

            {/* Step-by-Step Guide */}
            <div className="space-y-4">
              {[
                {
                  step: '1',
                  title: 'Enter Your Interests',
                  desc: 'Type in 2-4 things you\'re passionate about. Be specific! Instead of "science," try "marine biology" or "climate research."'
                },
                {
                  step: '2',
                  title: 'Review AI Matches',
                  desc: 'Our AI instantly analyzes thousands of programs and shows you the best matches with compatibility scores and career paths.'
                },
                {
                  step: '3',
                  title: 'Explore & Save',
                  desc: 'Click on any program to see detailed info: course requirements, job prospects, salaries, and student reviews. Save your favorites!'
                },
                {
                  step: '4',
                  title: 'Refine Your Search',
                  desc: 'Add filters like location, program length, or salary expectations. The AI adapts to give you even better recommendations.'
                }
              ].map((item, idx) => (
                <div 
                  key={idx}
                  className="flex gap-4 p-6 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 hover:border-emerald-500/50 transition-all duration-300 hover:scale-[1.02]"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-xl flex items-center justify-center font-bold text-xl">
                    {item.step}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-2">{item.title}</h4>
                    <p className="text-slate-300 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}

            </div>
          </div>

          {/* FAQ Quick Links */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              'Getting Started',
              'Understanding Results',
              'Saving Favorites',
              'Contact Support'
            ].map((item, idx) => (
              <button
                key={idx}
                className="p-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-emerald-500/50 rounded-xl transition-all text-sm font-medium"
              >
                {item} →
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 px-6 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-8 mb-8">
              <div>
                <div className="text-4xl font-bold text-emerald-400">50K+</div>
                <div className="text-slate-300">Students Matched</div>
              </div>
              <div className="h-16 w-px bg-white/20"></div>
              <div>
                <div className="text-4xl font-bold text-emerald-400">94%</div>
                <div className="text-slate-300">Satisfaction Rate</div>
              </div>
              <div className="h-16 w-px bg-white/20"></div>
              <div>
                <div className="text-4xl font-bold text-emerald-400">200+</div>
                <div className="text-slate-300">Universities</div>
              </div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Sarah M.', program: 'Environmental Science', quote: 'Found my dream program in minutes. The AI understood exactly what I was looking for!' },
              { name: 'James K.', program: 'Game Design', quote: 'I had no idea what to study. StudyPath showed me options I never considered.' },
              { name: 'Priya S.', program: 'Bioengineering', quote: 'The career insights helped me make a confident decision about my future.' },
            ].map((testimonial, idx) => (
              <div key={idx} className="p-6 bg-white/10 rounded-2xl border border-white/20">
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400">★</span>
                  ))}
                </div>
                <p className="mb-4 text-slate-200 italic">"{testimonial.quote}"</p>
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-emerald-300">Now studying {testimonial.program}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-6">Ready to Discover Your Path?</h2>
          <p className="text-xl text-slate-200 mb-8">Join thousands of students finding their perfect field of study</p>
          <button className="px-10 py-5 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl font-bold text-lg hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-emerald-600/50 flex items-center gap-3 mx-auto">
            Get Started Free <ArrowRight />
          </button>
        </div>
      </section>
    </div>
  );
}