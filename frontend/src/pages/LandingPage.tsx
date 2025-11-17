import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, BookOpen, TrendingUp, ArrowRight, Brain, Zap, PlayCircle, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);
  const [showVideo, setShowVideo] = useState(false);
  const [openStep, setOpenStep] = useState<number | null>(0); // 0 = first open, or null = all closed
  const [whyVisible, setWhyVisible] = useState(false);
  const whyRef = useRef<HTMLDivElement | null>(null);

  const [faqVisible, setFaqVisible] = useState(false);
  const faqRef = useRef<HTMLDivElement | null>(null);

  const handleLogin = () => {
    navigate("/login");
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  const handleScrollToGuide = () => {
    const el = document.getElementById("guide");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const section = whyRef.current;
    if (!section) return;
  
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setWhyVisible(true);
            observer.disconnect(); // only animate once
          }
        });
      },
      { threshold: 0.2 }
    );
  
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const section = faqRef.current;
    if (!section) return;
  
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setFaqVisible(true);
            observer.disconnect(); // only animate once
          }
        });
      },
      { threshold: 0.2 }
    );
  
    observer.observe(section);
    return () => observer.disconnect();
  }, []);  

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
          <button
            type="button"
            onClick={handleLogin}
            className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-105"
          >
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
              Find your dream path with
              <span className="bg-gradient-to-r from-emerald-300 via-teal-300 to-cyan-300 bg-clip-text text-transparent"> UH Pathfinder!</span>
            </h1>
            <p className="text-xl text-slate-200 mb-10 leading-relaxed">
              Our AI analyzes your interests, skills, and experience to match you with careers and UH educational path that actually fits you. Get started now, or watch a quick walkthrough to see how it works!
            </p>

            {/* New hero buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                type="button"
                onClick={handleSignup}
                className="px-8 py-3 rounded-full bg-emerald-500 text-slate-950 font-semibold text-lg shadow-lg shadow-emerald-500/40 hover:bg-emerald-400 hover:scale-105 transition-all duration-200"
              >
                Get Started
              </button>
              <button
                type="button"
                onClick={handleScrollToGuide}
                className="px-8 py-3 rounded-full border border-white/20 bg-white/5 text-slate-50 font-semibold text-lg hover:bg-white/10 hover:border-emerald-400/60 hover:scale-105 transition-all duration-200 flex items-center gap-2"
              >
                <PlayCircle className="w-5 h-5" />
                View walkthrough
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* User Guide Section */}
      <section id="guide" className="py-20 px-6 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600/20 rounded-full mb-4 backdrop-blur-sm">
              <HelpCircle className="w-4 h-4 text-emerald-300" />
              <span className="text-sm text-emerald-200">Quick Start Guide</span>
            </div>
            <h2 className="text-4xl font-bold mb-4">How to navigate UH Pathfinder</h2>
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
                  title: 'Tell us about yourself',
                  desc: 'When you sign up, pick your interests, skills, experiences, student status (e.g., incoming, undergraduate, transfer), and your UH campus. This helps UH Pathfinder personalize your results.'
                },
                {
                  step: '2',
                  title: 'Explore your AI-matched careers',
                  desc: 'Our AI uses your answers to suggest careers or specific jobs, along with related UH majors and example paths you could take next.'
                },
                {
                  step: '3',
                  title: 'Ask questions & plan your next steps',
                  desc: 'Chat with the AI assistant like you would in an advising appointment — ask about classes, jot down notes, and use what you learn to prepare for your real advising appointment.'
                }
              ].map((item, idx) => {
                const isOpen = openStep === idx;

                return (
                  <div
                    key={idx}
                    className="p-6 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 hover:border-emerald-500/50 transition-all duration-300"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenStep(isOpen ? null : idx)}
                      className="w-full flex items-center gap-4 text-left"
                    >
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-xl flex items-center justify-center font-bold text-xl">
                        {item.step}
                      </div>

                      <div className="flex-1 flex items-center justify-between gap-4">
                        <h4 className="text-lg font-bold">{item.title}</h4>
                        {isOpen ? (
                          <ChevronUp className="w-5 h-5 text-emerald-300" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-emerald-300" />
                        )}
                      </div>
                    </button>

                    {isOpen && (
                      <p className="mt-3 ml-16 text-slate-300 text-sm leading-relaxed">
                        {item.desc}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Features */}
          <div className="h-px w-full bg-white/15 mt-16 mb-10" />
          <section id="why" ref={whyRef} className="py-20 px-6">
            <div className="max-w-7xl mx-auto">
              <div className="mb-10 flex items-center justify-between gap-4">
                <h2 className="text-4xl font-bold">Why UH Pathfinder?</h2>
                <p className="text-sm text-slate-300">
                  What makes this different from a random career quiz
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {[
                  {
                    title: 'Built around UH, not generic advice',
                    desc: 'UH Pathfinder uses UH campuses, programs, and language you actually see on STAR and in advising – so your results feel more concrete and realistic.'
                  },
                  {
                    title: 'Designed with student + advisor feedback',
                    desc: 'The questions, flow, and features are shaped by what UH students say they struggle with and what advisors see in appointments.'
                  },
                  {
                    title: 'Helps you get unstuck, not decide everything',
                    desc: 'Instead of forcing you into one “perfect” career, UH Pathfinder focuses on making options visible and easier to talk about.'
                  },
                  {
                    title: 'Meant to work with advising, not replace it',
                    desc: 'Think of this as a starting point. It helps you show up to advising with more clarity and questions, not less.'
                  }
                ].map((item, idx) => (
                  <div
                    key={item.title}
                    className={`p-6 md:p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-lg transition-all duration-700 ${
                      whyVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                    }`}
                    style={{ transitionDelay: whyVisible ? `${idx * 120}ms` : '0ms' }}
                  >
                    <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                    <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section
            id="faq"
            ref={faqRef}
            className="py-20 px-6 border-t border-white/10"
          >
            <div className="max-w-7xl mx-auto">
              <div className="mb-10 flex items-center justify-between gap-4">
                <h2 className="text-4xl font-bold">Frequently Asked Questions</h2>
              </div>

              <div className="space-y-4">
                {[
                  {
                    q: 'What is UH Pathfinder?',
                    a: 'UH Pathfinder is an AI-powered tool that helps UH students connect their interests, skills, and experiences to possible careers and UH majors, then plan next steps they can talk about in advising.'
                  },
                  {
                    q: 'Is UH Pathfinder an official UH tool?',
                    a: 'Right now, UH Pathfinder is a student-created project designed to support UH students and advising. It does not replace official UH systems like STAR or your campus advising office.'
                  },
                  {
                    q: 'Do I need to know my major or career already?',
                    a: 'Nope. UH Pathfinder is especially helpful if you\'re unsure. You can start with what you\'re curious about, and the AI will suggest careers and paths you might not have considered yet.'
                  },
                  {
                    q: 'How do I sign up and who can use it?',
                    a: 'Any UH student can create an account with their email and choose their campus and student status (incoming, undergraduate, transfer, etc.). The experience is tailored around UH programs and terminology.'
                  },
                  {
                    q: 'Will this replace meeting with an advisor?',
                    a: 'No. UH Pathfinder is meant to help you show up to advising more prepared — with saved careers, questions, and notes — so your conversation with an advisor is more focused and useful.'
                  }
                ].map((item, idx) => (
                  <div
                    key={item.q}
                    className={`rounded-2xl bg-white/5 border border-white/10 p-6 md:p-7 transition-all duration-700 ${
                      faqVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                    }`}
                    style={{ transitionDelay: faqVisible ? `${idx * 120}ms` : '0ms' }}
                  >
                    <p className="font-semibold text-lg mb-2">{item.q}</p>
                    <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                      {item.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="mt-10 border-t border-white/10">
            <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs text-slate-400">
              <span>UH Pathfinder · Beta</span>
              <div className="flex flex-wrap items-center gap-4">
                <span>Made by students @ UH Mānoa</span>
              </div>
            </div>
          </footer>
        </div>
      </section>
    </div>
  );
}
