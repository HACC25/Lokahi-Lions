import React, { useState } from 'react';
import { Brain, TrendingUp, DollarSign, GraduationCap, MessageSquare, Send, X, ChevronRight, Building2, MapPin, Gamepad2, PenSquare, Clock, Briefcase, UserCircle, Heart } from 'lucide-react';
import SignOutModal from './page-signout';
import { useNavigate } from 'react-router-dom';

export default function ResultsPathway() {
  const navigate = useNavigate();
  const [selectedPath, setSelectedPath] = useState(0);
  const [chatOpen, setChatOpen] = useState(true);
  const [expandedDetails, setExpandedDetails] = useState<number | null>(null);
  const [hoveredPath, setHoveredPath] = useState<number | null>(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [chatMessages, setChatMessages] = useState([
    { role: 'assistant', content: 'Aloha! I\'m your UH Pathfinder AI advisor. I can help you explore degree programs, compare campuses, understand career outcomes, and plan your educational journey. What would you like to discover?' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [actionPlanOpen, setActionPlanOpen] = useState(false);
  const [compareModalOpen, setCompareModalOpen] = useState(false);
  const [modalPathIndex, setModalPathIndex] = useState<number | null>(null);
  const [showSignOutModal, setShowSignOutModal] = useState(false);

  const educationalPaths = [
    {
      field: 'Game Design & Development',
      match: 97,
      icon: Gamepad2,
      gradient: 'from-emerald-200 via-emerald-100 to-green-50',
      uhCampus: 'UH Mānoa',
      degree: 'B.A. in Creative Media',
      description: 'Combine creativity with technical skills to design engaging interactive experiences through UH\'s interdisciplinary approach',
      duration: '4 years',
      avgSalary: '$85,000',
      jobGrowth: '+23%',
      topCareers: [
        { title: 'Game Designer', salary: '$75,000-$120,000', demand: 'High', companies: ['Epic Games', 'Blizzard', 'Riot Games'] },
        { title: 'UX Designer', salary: '$80,000-$130,000', demand: 'Very High', companies: ['Google', 'Meta', 'Apple'] },
        { title: 'Level Designer', salary: '$70,000-$110,000', demand: 'High', companies: ['Ubisoft', 'EA', 'Valve'] }
      ],
      uhPrograms: [
        { name: 'Creative Media - B.A.', campus: 'UH Mānoa', type: 'Bachelor\'s' },
        { name: 'Computer Science', campus: 'UH Mānoa', type: 'Bachelor\'s' },
        { name: 'Digital Media Certificate', campus: 'UH West O\'ahu', type: 'Certificate' }
      ],
      keySkills: ['Unity/Unreal Engine', 'C++ Programming', 'Game Mechanics', '3D Modeling', 'Player Psychology'],
      nextSteps: ['Visit UH Academy for Creative Media', 'Join Game Dev Club', 'Attend career fairs']
    },
    {
      field: 'Psychology with Game Studies',
      match: 94,
      icon: Brain,
      gradient: 'from-lime-100 via-emerald-50 to-green-50',
      uhCampus: 'UH Mānoa',
      degree: 'B.A. in Psychology',
      description: 'Study human behavior and apply insights to user experience and game design with UH\'s research-focused curriculum',
      duration: '4 years',
      avgSalary: '$78,000',
      jobGrowth: '+18%',
      topCareers: [
        { title: 'UX Researcher', salary: '$85,000-$135,000', demand: 'Very High', companies: ['Microsoft', 'Amazon', 'Netflix'] },
        { title: 'Behavioral Designer', salary: '$75,000-$115,000', demand: 'High', companies: ['King', 'Zynga', 'Supercell'] },
        { title: 'User Research Lead', salary: '$95,000-$150,000', demand: 'High', companies: ['Valve', 'Unity', 'Roblox'] }
      ],
      uhPrograms: [
        { name: 'Psychology - B.A.', campus: 'UH Mānoa', type: 'Bachelor\'s' },
        { name: 'Human Computer Interaction', campus: 'UH Mānoa', type: 'Certificate' },
        { name: 'Information & Computer Sciences', campus: 'UH Mānoa', type: 'Bachelor\'s' }
      ],
      keySkills: ['Research Methods', 'Data Analysis', 'Behavioral Science', 'User Testing', 'Statistical Analysis'],
      nextSteps: ['Connect with Psychology dept', 'Explore research opportunities', 'Internship at local tech companies']
    },
    {
      field: 'Interactive Media & Narrative Design',
      match: 92,
      icon: PenSquare,
      gradient: 'from-emerald-100 via-green-100 to-lime-50',
      uhCampus: 'UH Mānoa',
      degree: 'B.A. in English/Creative Media',
      description: 'Craft compelling stories and narratives for games, interactive media, and digital experiences with UH\'s creative writing focus',
      duration: '4 years',
      avgSalary: '$72,000',
      jobGrowth: '+20%',
      topCareers: [
        { title: 'Narrative Designer', salary: '$70,000-$110,000', demand: 'High', companies: ['Naughty Dog', 'BioWare', 'Telltale'] },
        { title: 'Content Strategist', salary: '$75,000-$120,000', demand: 'Very High', companies: ['Disney', 'HBO', 'Netflix'] },
        { title: 'Creative Director', salary: '$90,000-$160,000', demand: 'High', companies: ['Pixar', 'DreamWorks', 'Bungie'] }
      ],
      uhPrograms: [
        { name: 'English - Creative Writing', campus: 'UH Mānoa', type: 'Bachelor\'s' },
        { name: 'Creative Media', campus: 'UH Mānoa', type: 'Bachelor\'s' },
        { name: 'Communication Certificate', campus: 'UH West O\'ahu', type: 'Certificate' }
      ],
      keySkills: ['Creative Writing', 'Story Structure', 'Character Development', 'Script Writing', 'World Building'],
      nextSteps: ['Join UH Writers Workshop', 'Portfolio development', 'Connect with ACM faculty']
    }
  ];

  const activeModalPath = modalPathIndex !== null ? educationalPaths[modalPathIndex] : null;

  const openActionPlan = (pathIndex: number) => {
    setModalPathIndex(pathIndex);
    setCompareModalOpen(false);
    setActionPlanOpen(true);
  };

  const openCompareModal = (pathIndex: number) => {
    setModalPathIndex(pathIndex);
    setActionPlanOpen(false);
    setCompareModalOpen(true);
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    
    setChatMessages([...chatMessages, 
      { role: 'user', content: inputMessage },
      { role: 'assistant', content: 'That\'s a great question! Based on your interests in ' + userInterests.join(', ') + ', I can help you explore UH programs that blend these areas. Would you like to learn about specific campuses, scholarship opportunities, or hear from current students in these fields?' }
    ]);
    setInputMessage('');
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    setCursorPosition({ x: event.clientX, y: event.clientY });
  };

  const handleSignOut = () => {
    navigate('/');
  };

  const closeActionPlan = () => {
    setActionPlanOpen(false);
    setModalPathIndex(null);
  };

  const closeCompareModal = () => {
    setCompareModalOpen(false);
    setModalPathIndex(null);
  };

  const getMatchLabel = (score: number) => {
    if (score >= 95) return 'Perfect match';
    if (score >= 90) return 'Excellent match';
    return 'Good match';
  };

  return (
    <>
    <div 
      className="min-h-screen text-slate-900 relative overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Futuristic ambient background */}
      <div className="fixed inset-0 -z-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#e9fbf2] via-[#f0fff5] to-[#f7fff9]"></div>
        <div
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage: `
              radial-gradient(circle at 15% 20%, rgba(74,222,128,0.3), transparent 45%),
              radial-gradient(circle at 70% 10%, rgba(134,239,172,0.25), transparent 40%),
              radial-gradient(circle at 65% 80%, rgba(187,247,208,0.25), transparent 38%)
            `
          }}
        ></div>
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(15,23,42,0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(15,23,42,0.04) 1px, transparent 1px)
            `,
            backgroundSize: '140px 140px'
          }}
        ></div>
      </div>
      <div
        className="pointer-events-none fixed inset-[-40%] -z-10 blur-3xl transition-all duration-300"
        style={{
          background: `radial-gradient(circle at ${cursorPosition.x}px ${cursorPosition.y}px, rgba(134,239,172,0.45), transparent 35%)`
        }}
      ></div>

      <div className="pt-16 px-8 pb-16">
        <div className="max-w-[1800px] mx-auto">
          {/* Enhanced Results Header */}
          <div className="mb-12">
            <div className="flex flex-wrap items-center justify-between gap-6 mb-6 relative">
              <div className="absolute inset-x-0 -top-6 h-32 bg-gradient-to-r from-emerald-200/50 via-transparent to-emerald-200/50 blur-3xl rounded-full pointer-events-none"></div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                  <p className="text-sm font-semibold tracking-[0.35em] text-emerald-500 uppercase">
                    UH Pathfinder Results
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <a
                      href="/profile"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white text-emerald-700 font-semibold shadow-md shadow-emerald-100 border border-emerald-100 hover:-translate-y-0.5 hover:shadow-emerald-200 transition-all text-sm"
                    >
                      <UserCircle className="w-5 h-5" />
                      <span>Profile &amp; Saved Careers</span>
                    </a>
                    <button
                      onClick={() => setShowSignOutModal(true)}
                      className="px-5 py-2.5 rounded-2xl border border-slate-200 text-sm font-semibold text-slate-600 bg-white hover:bg-slate-50 transition-all shadow-sm"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
                <h1 className="text-6xl font-bold mb-3 leading-tight text-slate-900">
                  Map your dream career with <span className="bg-gradient-to-r from-emerald-500 to-lime-400 bg-clip-text text-transparent">AI guidance</span>
                </h1>
                <p className="text-lg text-slate-600 max-w-3xl">
                  Discover curated UH pathways, explore campus options, and collaborate with your personal AI advisor to build the future you want.
                </p>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Left Panel with integrated pathways */}
            <div className="lg:col-span-3 space-y-6">
              <div className="mb-2">
                <h3 className="text-2xl font-bold flex items-center gap-2 mb-1 text-emerald-700">
                  <GraduationCap className="text-emerald-500 w-7 h-7" />
                  Top Matches
                </h3>
                <span className="text-sm text-slate-500">{educationalPaths.length} paths found</span>
              </div>

              <div className="space-y-6">
                {educationalPaths.map((path, idx) => {
                  const Icon = path.icon;
                  const cardIsActive = selectedPath === idx;
                  const cardIsHovered = hoveredPath === idx;
                  return (
                    <div
                      key={idx}
                      role="button"
                      tabIndex={0}
                      onMouseEnter={() => setHoveredPath(idx)}
                      onMouseLeave={() => setHoveredPath(null)}
                      onClick={() => setSelectedPath(idx)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setSelectedPath(idx);
                        }
                      }}
                      className={`group cursor-pointer w-full p-5 rounded-2xl border-2 transition-all duration-300 ${
                        cardIsActive 
                          ? `bg-gradient-to-r ${path.gradient} border-emerald-300 shadow-xl shadow-emerald-200/60 text-emerald-900` 
                          : 'bg-white border-slate-200 shadow-md hover:shadow-xl text-slate-900'
                      } ${cardIsHovered && !cardIsActive ? 'shadow-[0_15px_35px_rgba(15,23,42,0.2)] border-slate-400' : ''}`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`p-3 rounded-2xl border ${cardIsActive ? 'bg-white/60 border-white/80' : 'bg-emerald-50 border-emerald-100'}`}>
                          <Icon className={`w-6 h-6 ${cardIsActive ? 'text-emerald-700' : 'text-slate-500'}`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <div className="font-bold text-base mb-1">{path.field}</div>
                              <div className="text-xs opacity-80 flex items-center gap-1 text-slate-500">
                                <MapPin className="w-3 h-3" />
                                {path.uhCampus}
                              </div>
                            </div>
                            <div className="text-xl font-bold flex flex-col items-end text-emerald-700">
                              <span>{getMatchLabel(path.match)}</span>
                              <span className="text-xs font-medium text-emerald-500">personalized insight</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between gap-3 text-xs text-slate-600">
                            <span>{path.degree}</span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                console.log(`Saved ${path.field}`);
                              }}
                              aria-label={`Save ${path.field}`}
                              className="p-2 rounded-full border border-emerald-200 text-emerald-600 hover:bg-emerald-50 transition-colors"
                            >
                              <Heart className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {cardIsActive && (
                        <div className="mt-6 bg-white rounded-2xl p-6 border border-emerald-100 shadow-lg text-slate-900 space-y-6">
                          <div>
                            <div className="flex items-start justify-between gap-4 flex-wrap mb-3">
                              <div>
                                <p className="text-xs uppercase tracking-[0.2em] text-emerald-500 mb-2">
                                  Educational pathway snapshot
                                </p>
                                <div className="flex items-center gap-4 text-slate-600 text-sm">
                                  <span className="flex items-center gap-1 text-emerald-500">
                                    <MapPin className="w-4 h-4" />
                                    {path.uhCampus}
                                  </span>
                                  <span>{path.degree}</span>
                                </div>
                              </div>
                            </div>
                            <p className="text-base text-slate-700 leading-relaxed">{path.description}</p>
                          </div>

                          <div className="grid sm:grid-cols-3 gap-4">
                            <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-100">
                              <Clock className="w-5 h-5 text-emerald-600 mb-1" />
                              <p className="text-xs uppercase tracking-widest text-emerald-500">Duration</p>
                              <p className="text-lg font-semibold text-emerald-900">{path.duration}</p>
                            </div>
                            <div className="bg-white rounded-2xl p-4 border border-emerald-100">
                              <DollarSign className="w-5 h-5 text-emerald-500 mb-1" />
                              <p className="text-xs uppercase tracking-widest text-slate-500">Avg Salary</p>
                              <p className="text-lg font-semibold text-slate-900">{path.avgSalary}</p>
                            </div>
                            <div className="bg-white rounded-2xl p-4 border border-emerald-100">
                              <TrendingUp className="w-5 h-5 text-emerald-500 mb-1" />
                              <p className="text-xs uppercase tracking-widest text-slate-500">Job Growth</p>
                              <p className="text-lg font-semibold text-slate-900">{path.jobGrowth}</p>
                            </div>
                          </div>

                          <div className="grid md:grid-cols-2 gap-4">
                            <div className="bg-white rounded-2xl p-5 border border-emerald-100">
                              <div className="flex items-center gap-2 mb-3">
                                <Briefcase className="w-5 h-5 text-emerald-500" />
                                <p className="text-sm font-semibold text-slate-800">Role spotlight</p>
                              </div>
                              {path.topCareers.length > 0 && (
                                <div>
                                  <p className="text-lg font-semibold text-slate-900">{path.topCareers[0].title}</p>
                                  <p className="text-sm text-slate-600 mb-2">{path.topCareers[0].salary} • {path.topCareers[0].demand} demand</p>
                                  <p className="text-xs text-slate-500">
                                    Top employers: {path.topCareers[0].companies.slice(0, 2).join(', ')}{path.topCareers[0].companies.length > 2 ? ' +' : ''}
                                  </p>
                                </div>
                              )}
                            </div>
                            <div className="bg-white rounded-2xl p-5 border border-emerald-100">
                              <p className="text-sm font-semibold text-slate-800 mb-3">Key skills to build</p>
                              <div className="flex flex-wrap gap-2">
                                {path.keySkills.slice(0, 4).map((skill, skillIdx) => (
                                  <span key={skillIdx} className="px-3 py-1 text-xs rounded-full bg-emerald-50 border border-emerald-100 text-emerald-800">
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setExpandedDetails(expandedDetails === idx ? null : idx);
                            }}
                            className="px-5 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-white transition-all"
                          >
                            <span className="inline-flex items-center gap-2">
                              {expandedDetails === idx ? 'Hide full pathway details' : 'View full pathway plan'}
                              <ChevronRight className={`w-4 h-4 transition-transform ${expandedDetails === idx ? 'rotate-90' : 'rotate-0'}`} />
                            </span>
                          </button>

                          {expandedDetails === idx && (
                            <div className="space-y-6 pt-4 border-t border-emerald-100 max-h-[360px] overflow-y-auto pr-2">
                              <div>
                                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                  <Building2 className="text-emerald-500 w-5 h-5" />
                                  UH Programs &amp; Pathways
                                </h3>
                                <div className="space-y-3">
                                  {path.uhPrograms.map((program, programIdx) => (
                                    <div key={programIdx} className="bg-white rounded-xl p-5 border border-emerald-100 hover:border-emerald-300 transition-all group">
                                      <div className="flex items-center justify-between gap-4">
                                        <div>
                                          <h4 className="font-bold text-lg mb-1 group-hover:text-emerald-600 transition-colors">{program.name}</h4>
                                          <div className="flex items-center gap-3 text-sm text-slate-600">
                                            <span className="flex items-center gap-1">
                                              <MapPin className="w-3 h-3 text-emerald-500" />
                                              {program.campus}
                                            </span>
                                            <span className="px-2 py-1 bg-emerald-50 rounded text-xs border border-emerald-100 text-emerald-700">{program.type}</span>
                                          </div>
                                        </div>
                                        <ChevronRight className="w-5 h-5 text-emerald-500 group-hover:text-emerald-700 group-hover:translate-x-1 transition-all" />
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              <div className="flex flex-wrap gap-4 pt-2">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    openActionPlan(idx);
                                  }}
                                  className="flex-1 min-w-[160px] px-6 py-3 bg-gradient-to-r from-emerald-500 to-lime-400 rounded-xl font-bold text-base text-white hover:shadow-lg hover:shadow-emerald-200/70 transition-all hover:scale-[1.02]"
                                >
                                  Build My Action Plan
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    openCompareModal(idx);
                                  }}
                                  className="px-6 py-3 bg-white border border-emerald-100 rounded-xl font-bold text-emerald-700 hover:bg-emerald-50 transition-all"
                                >
                                  Compare Programs
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Panel - AI Chat */}
            <div className="lg:col-span-2 flex flex-col gap-6 mt-8 lg:mt-17">
              <div className="relative">
                {chatOpen ? (
                <div className="bg-white rounded-3xl h-[600px] border border-emerald-100 shadow-xl flex flex-col">
                  <div className="bg-gradient-to-r from-emerald-200 via-green-100 to-lime-100 p-6 rounded-t-3xl flex items-center justify-between text-emerald-900">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-lg">
                        <Brain className="w-8 h-8 text-emerald-600" />
                      </div>
                      <div>
                        <div className="text-lg font-bold">UH Pathfinder Chatbot</div>
                        <p className="text-sm text-emerald-700">Working through your dream job together</p>
                      </div>
                    </div>
                    <button onClick={() => setChatOpen(false)} className="hover:bg-white/40 p-2 rounded-xl transition-all text-emerald-700">
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-white">
                    {chatMessages.map((msg, idx) => (
                      <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[85%] p-4 rounded-2xl ${
                          msg.role === 'user' 
                            ? 'bg-gradient-to-r from-sky-200 to-rose-100 rounded-br-sm text-slate-800' 
                            : 'bg-white border border-slate-200 rounded-bl-sm text-slate-700'
                        }`}>
                          <p className="text-sm leading-relaxed">{msg.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="px-6 pb-3 flex flex-wrap gap-2 bg-white">
                    {['Compare UH campuses', 'Financial aid options', 'Housing information', 'Transfer credits'].map((q, idx) => (
                      <button 
                        key={idx}
                        onClick={() => setInputMessage(q)}
                        className="px-4 py-2 bg-emerald-50 hover:bg-white border border-emerald-100 rounded-xl text-xs text-emerald-700 transition-all hover:border-emerald-300"
                      >
                        {q}
                      </button>
                    ))}
                  </div>

                  <div className="p-6 border-t border-emerald-100 bg-emerald-50 rounded-b-3xl">
                    <div className="flex gap-3">
                      <input
                        type="text"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder="Ask me anything about UH programs..."
                        className="flex-1 px-5 py-3 bg-white border border-emerald-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-300 text-sm placeholder-slate-400"
                      />
                      <button 
                        onClick={handleSendMessage}
                        className="px-5 py-3 bg-gradient-to-r from-emerald-500 to-lime-400 text-white rounded-xl hover:shadow-lg hover:shadow-emerald-200 transition-all hover:scale-105"
                      >
                        <Send className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white border border-emerald-100 rounded-3xl h-full flex flex-col items-center justify-center text-center p-8 shadow-sm">
                  <MessageSquare className="w-12 h-12 text-emerald-500 mb-4" />
                  <p className="text-lg font-semibold mb-2 text-slate-900">Need help planning?</p>
                  <p className="text-slate-600 mb-6">Open the UH Pathfinder AI advisor to ask questions and explore your next steps together.</p>
                  <button 
                    onClick={() => setChatOpen(true)} 
                    className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-lime-400 text-white rounded-xl font-semibold hover:scale-105 transition-all"
                  >
                    Launch Chat
                  </button>
                </div>
              )}
              </div>

              <div className="grid gap-4">
                <div className="bg-white border border-emerald-100 rounded-3xl p-6 shadow-sm">
                  <div className="mb-4">
                    <p className="text-xs uppercase tracking-[0.35em] text-emerald-500">Resource hub</p>
                    <p className="text-sm text-slate-600 mt-1">
                      Use these UH tools to chat with advisors and experiment with possible journeys before committing to a pathway.
                    </p>
                  </div>
                  <div className="grid gap-3">
                    {[
                      { title: 'STAR Balance', description: 'Schedule an advising session and map out your UH semester.' },
                      { title: 'STAR “What-If” Journey', description: 'Watch the YouTube tutorial to preview alternate degree plans.' }
                    ].map((resource, idx) => (
                      <button
                        key={idx}
                        className="text-left rounded-2xl border border-emerald-100 px-4 py-3 hover:border-emerald-300 transition-all bg-white/60"
                      >
                        <p className="font-semibold text-slate-800">{resource.title}</p>
                        <p className="text-sm text-slate-600">{resource.description}</p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    {actionPlanOpen && activeModalPath && (
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-10">
        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={closeActionPlan}></div>
        <div className="relative max-w-3xl w-full bg-white border border-emerald-100 rounded-3xl shadow-2xl p-8 space-y-6">
          <button
            onClick={closeActionPlan}
            className="absolute top-5 right-5 p-2 rounded-full text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
            aria-label="Close action plan modal"
          >
            <X className="w-5 h-5" />
          </button>
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-emerald-500 mb-2">Action plan builder</p>
            <h3 className="text-3xl font-bold text-slate-900">
              Next steps for <span className="text-emerald-600">{activeModalPath.field}</span>
            </h3>
            <p className="text-sm text-slate-500">
              Anchored to {activeModalPath.uhCampus} • {activeModalPath.degree}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {activeModalPath.nextSteps.map((step, idx) => (
              <div key={idx} className="bg-emerald-50/70 border border-emerald-100 rounded-2xl p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-emerald-500 mb-2">Step {idx + 1}</p>
                <p className="text-sm text-slate-800">{step}</p>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="border border-emerald-100 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <Briefcase className="w-5 h-5 text-emerald-500" />
                <p className="text-sm font-semibold text-slate-800">Career outcome</p>
              </div>
              {activeModalPath.topCareers.slice(0, 2).map((career, idx) => (
                <div key={idx} className="mb-3 last:mb-0">
                  <p className="font-semibold text-slate-900">{career.title}</p>
                  <p className="text-sm text-slate-500">{career.salary} • {career.demand} demand</p>
                </div>
              ))}
            </div>
            <div className="border border-emerald-100 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-5 h-5 text-emerald-500" />
                <p className="text-sm font-semibold text-slate-800">Skill checklist</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {activeModalPath.keySkills.slice(0, 5).map((skill, idx) => (
                  <span key={idx} className="px-3 py-1 text-xs rounded-full border border-emerald-100 bg-emerald-50 text-emerald-800">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <button className="flex-1 min-w-[180px] px-6 py-3 bg-gradient-to-r from-emerald-500 to-lime-400 text-white font-semibold rounded-2xl hover:shadow-lg hover:shadow-emerald-200/70 transition-all">
              Save action plan to profile
            </button>
            <button
              onClick={closeActionPlan}
              className="px-6 py-3 rounded-2xl border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    )}

    {compareModalOpen && activeModalPath && (
      <div className="fixed inset-0 z-40 flex items-center justify-center px-4 py-10">
        <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={closeCompareModal}></div>
        <div className="relative max-w-4xl w-full bg-white border border-emerald-100 rounded-3xl shadow-2xl p-8 space-y-6">
          <button
            onClick={closeCompareModal}
            className="absolute top-5 right-5 p-2 rounded-full text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
            aria-label="Close compare modal"
          >
            <X className="w-5 h-5" />
          </button>
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-emerald-500 mb-2">Program comparison</p>
            <h3 className="text-3xl font-bold text-slate-900">UH options for {activeModalPath.field}</h3>
            <p className="text-sm text-slate-500">Match strength: {getMatchLabel(activeModalPath.match)} • Avg salary {activeModalPath.avgSalary}</p>
          </div>

          <div className="space-y-4">
            {activeModalPath.uhPrograms.map((program, idx) => (
              <div key={idx} className="border border-emerald-100 rounded-2xl p-5 flex flex-wrap items-start justify-between gap-4 bg-emerald-50/40">
                <div>
                  <p className="text-lg font-semibold text-slate-900">{program.name}</p>
                  <p className="text-sm text-slate-600 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-emerald-500" />
                    {program.campus} • {program.type}
                  </p>
                </div>
                <span className="px-3 py-1 text-xs font-semibold rounded-full bg-white text-emerald-700 border border-emerald-200">
                  Pathway option {idx + 1}
                </span>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="border border-slate-100 rounded-2xl p-5 bg-slate-50/60">
              <h4 className="text-sm font-semibold text-slate-800 mb-2">What to evaluate</h4>
              <ul className="text-sm text-slate-600 space-y-2 list-disc list-inside">
                <li>Campus resources &amp; labs aligned with your focus</li>
                <li>Internship or co-op placement history</li>
                <li>Faculty research within {activeModalPath.field}</li>
              </ul>
            </div>
            <div className="border border-slate-100 rounded-2xl p-5">
              <h4 className="text-sm font-semibold text-slate-800 mb-2">Advisor tip</h4>
              <p className="text-sm text-slate-600">
                Pair this comparison with the AI chat prompts about housing, commute, and scholarships so you know which campus fits your lifestyle.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <button className="flex-1 min-w-[180px] px-6 py-3 bg-gradient-to-r from-emerald-500 to-lime-400 text-white font-semibold rounded-2xl hover:shadow-lg hover:shadow-emerald-200/70 transition-all">
              Share this comparison
            </button>
            <button
              onClick={closeCompareModal}
              className="px-6 py-3 rounded-2xl border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    )}

    <SignOutModal
      open={showSignOutModal}
      onOpenChange={setShowSignOutModal}
      onSignOut={handleSignOut}
    />

    </>
  );
}
