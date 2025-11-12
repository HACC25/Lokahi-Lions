import React, { useState } from 'react';
import { Brain, Sparkles, TrendingUp, DollarSign, BookOpen, GraduationCap, MessageSquare, Send, X, ChevronRight, Building2, Clock, Award, Briefcase, MapPin, Users, Target, Lightbulb } from 'lucide-react';

export default function UHPathfinderAI() {
  const [selectedPath, setSelectedPath] = useState(0);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { role: 'assistant', content: 'Aloha! I\'m your UH Pathfinder AI advisor. I can help you explore degree programs, compare campuses, understand career outcomes, and plan your educational journey. What would you like to discover?' }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const userInterests = ['Video Games', 'Psychology', 'Writing'];

  const educationalPaths = [
    {
      field: 'Game Design & Development',
      match: 97,
      icon: '🎮',
      gradient: 'from-green-600 to-teal-600',
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
      icon: '🧠',
      gradient: 'from-blue-600 to-indigo-600',
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
      icon: '✍️',
      gradient: 'from-purple-600 to-pink-600',
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

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    
    setChatMessages([...chatMessages, 
      { role: 'user', content: inputMessage },
      { role: 'assistant', content: 'That\'s a great question! Based on your interests in ' + userInterests.join(', ') + ', I can help you explore UH programs that blend these areas. Would you like to learn about specific campuses, scholarship opportunities, or hear from current students in these fields?' }
    ]);
    setInputMessage('');
  };

  const currentPath = educationalPaths[selectedPath];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-slate-900 text-white">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-green-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute top-60 right-32 w-[500px] h-[500px] bg-teal-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-32 left-1/3 w-80 h-80 bg-emerald-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      {/* Enhanced Header */}
      <nav className="fixed top-0 w-full z-50 bg-black/40 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-[1800px] mx-auto px-8 py-5 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
              <Brain className="text-white w-7 h-7" />
            </div>
            <div>
              <div className="text-2xl font-bold bg-gradient-to-r from-green-300 via-teal-300 to-emerald-300 bg-clip-text text-transparent">
                UH Pathfinder AI
              </div>
              <div className="text-xs text-slate-400">University of Hawaiʻi System</div>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <button className="text-slate-300 hover:text-white transition-colors text-sm font-medium">
              My Profile
            </button>
            <button className="text-slate-300 hover:text-white transition-colors text-sm font-medium">
              Saved Paths
            </button>
            <button 
              onClick={() => setChatOpen(!chatOpen)}
              className="px-6 py-3 bg-gradient-to-r from-green-600 to-teal-600 rounded-xl flex items-center gap-2 hover:shadow-lg hover:shadow-green-600/30 transition-all font-medium"
            >
              <MessageSquare className="w-5 h-5" />
              AI Advisor
            </button>
          </div>
        </div>
      </nav>

      <div className="pt-28 px-8 pb-16">
        <div className="max-w-[1800px] mx-auto">
          {/* Enhanced Results Header */}
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-green-600/20 to-teal-600/20 border border-green-500/30 rounded-full mb-6 backdrop-blur-sm">
              <Sparkles className="w-5 h-5 text-green-300" />
              <span className="text-sm font-medium text-green-200">Personalized for You</span>
            </div>
            <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-white via-green-100 to-teal-100 bg-clip-text text-transparent">
              Your Ideal Educational Pathways
            </h1>
            <p className="text-xl text-slate-300 mb-6">Discover UH programs aligned with your passions and career goals</p>
            <div className="flex items-center gap-3">
              <span className="text-slate-400">Your interests:</span>
              {userInterests.map((interest, idx) => (
                <span key={idx} className="inline-flex items-center px-5 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm font-medium hover:bg-white/15 transition-all">
                  {interest}
                </span>
              ))}
              <button className="text-teal-400 hover:text-teal-300 text-sm font-medium flex items-center gap-1">
                <span>Edit</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Left Panel - Two Columns */}
            <div className="lg:col-span-2">
              <div className="grid grid-cols-2 gap-6">
                {/* Top Matches Column */}
                <div className="space-y-5">
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold flex items-center gap-2 mb-1">
                      <GraduationCap className="text-green-400 w-7 h-7" />
                      Top Matches
                    </h3>
                    <span className="text-sm text-slate-400">{educationalPaths.length} paths found</span>
                  </div>
                  
                  {educationalPaths.map((path, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedPath(idx)}
                      className={`w-full text-left p-5 rounded-2xl border-2 transition-all duration-300 ${
                        selectedPath === idx 
                          ? `bg-gradient-to-r ${path.gradient} border-white/40 shadow-2xl shadow-green-900/40 scale-[1.02]` 
                          : 'bg-white/5 backdrop-blur-sm border-white/10 hover:border-white/25 hover:bg-white/10 hover:scale-[1.01]'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="text-4xl">{path.icon}</div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <div className="font-bold text-base mb-1">{path.field}</div>
                              <div className="text-xs opacity-90 flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {path.uhCampus}
                              </div>
                            </div>
                            <div className="text-2xl font-bold">{path.match}<span className="text-sm">%</span></div>
                          </div>
                          <div className="text-xs opacity-90 mb-2">{path.degree}</div>
                          <div className="flex-1 bg-white/30 rounded-full h-1.5">
                            <div 
                              className="bg-white h-full rounded-full transition-all duration-500 shadow-lg shadow-white/50"
                              style={{width: `${path.match}%`}}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Quick Actions Column */}
                <div className="space-y-5">
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold flex items-center gap-2 mb-1">
                      <Lightbulb className="text-yellow-400 w-7 h-7" />
                      Quick Actions
                    </h3>
                    <span className="text-sm text-slate-400 opacity-0">Placeholder</span>
                  </div>

                  <div className="p-5 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-2xl border border-white/10">
                    <div className="space-y-3">
                      <button className="w-full text-left px-4 py-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all text-sm flex items-center justify-between group">
                        <span>Schedule campus visit</span>
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                      <button className="w-full text-left px-4 py-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all text-sm flex items-center justify-between group">
                        <span>Connect with advisor</span>
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                      <button className="w-full text-left px-4 py-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all text-sm flex items-center justify-between group">
                        <span>Explore scholarships</span>
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                      <button className="w-full text-left px-4 py-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all text-sm flex items-center justify-between group">
                        <span>View campus map</span>
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                      <button className="w-full text-left px-4 py-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all text-sm flex items-center justify-between group">
                        <span>Apply for housing</span>
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                      <button className="w-full text-left px-4 py-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all text-sm flex items-center justify-between group">
                        <span>Financial aid calculator</span>
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>

                  <div className="p-5 bg-gradient-to-br from-teal-600/10 to-green-600/10 backdrop-blur-sm rounded-2xl border border-teal-500/30">
                    <h4 className="font-bold mb-2 flex items-center gap-2 text-teal-300">
                      <Users className="w-5 h-5" />
                      Student Resources
                    </h4>
                    <p className="text-sm text-slate-300 mb-3">Connect with current students and alumni in your field</p>
                    <button className="w-full px-4 py-2 bg-gradient-to-r from-teal-600 to-green-600 rounded-xl text-sm font-medium hover:shadow-lg transition-all">
                      Join Community
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Panel - Detailed View */}
            <div className="lg:col-span-3">
              <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
                {/* Path Header */}
                <div className="mb-8">
                  <div className="flex items-start gap-6 mb-6">
                    <div className="text-7xl">{currentPath.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h2 className="text-4xl font-bold mb-2">{currentPath.field}</h2>
                          <div className="flex items-center gap-4 text-slate-300 mb-3">
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-green-400" />
                              <span className="font-medium">{currentPath.uhCampus}</span>
                            </div>
                            <div className="w-1 h-1 rounded-full bg-slate-500"></div>
                            <span>{currentPath.degree}</span>
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-5xl font-bold text-green-400">{currentPath.match}</div>
                          <div className="text-sm text-slate-400">Match Score</div>
                        </div>
                      </div>
                      <p className="text-lg text-slate-300 leading-relaxed">{currentPath.description}</p>
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-xl p-5 border border-white/20 hover:border-green-500/50 transition-all">
                      <Clock className="w-6 h-6 text-green-400 mb-2" />
                      <div className="text-sm text-slate-400 mb-1">Duration</div>
                      <div className="text-2xl font-bold">{currentPath.duration}</div>
                    </div>
                    <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-xl p-5 border border-white/20 hover:border-teal-500/50 transition-all">
                      <DollarSign className="w-6 h-6 text-teal-400 mb-2" />
                      <div className="text-sm text-slate-400 mb-1">Avg Salary</div>
                      <div className="text-2xl font-bold">{currentPath.avgSalary}</div>
                    </div>
                    <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-xl p-5 border border-white/20 hover:border-emerald-500/50 transition-all">
                      <TrendingUp className="w-6 h-6 text-emerald-400 mb-2" />
                      <div className="text-sm text-slate-400 mb-1">Job Growth</div>
                      <div className="text-2xl font-bold">{currentPath.jobGrowth}</div>
                    </div>
                  </div>
                </div>

                {/* Tabbed Content */}
                <div className="space-y-8">
                  {/* UH Programs Section */}
                  <div>
                    <h3 className="text-2xl font-bold mb-5 flex items-center gap-2">
                      <Building2 className="text-green-400 w-6 h-6" />
                      UH Programs & Pathways
                    </h3>
                    <div className="space-y-3">
                      {currentPath.uhPrograms.map((program, idx) => (
                        <div key={idx} className="bg-gradient-to-r from-white/5 to-transparent rounded-xl p-5 border border-white/10 hover:border-green-500/50 transition-all group">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <h4 className="font-bold text-lg mb-1 group-hover:text-green-300 transition-colors">{program.name}</h4>
                              <div className="flex items-center gap-3 text-sm text-slate-400">
                                <span className="flex items-center gap-1">
                                  <MapPin className="w-3 h-3" />
                                  {program.campus}
                                </span>
                                <span className="px-2 py-1 bg-white/10 rounded text-xs">{program.type}</span>
                              </div>
                            </div>
                            <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-green-400 group-hover:translate-x-1 transition-all" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Top Careers Section */}
                  <div>
                    <h3 className="text-2xl font-bold mb-5 flex items-center gap-2">
                      <Briefcase className="text-teal-400 w-6 h-6" />
                      Career Opportunities
                    </h3>
                    <div className="space-y-4">
                      {currentPath.topCareers.map((career, idx) => (
                        <div key={idx} className="bg-gradient-to-r from-white/5 to-transparent rounded-xl p-5 border border-white/10 hover:border-teal-500/50 transition-all">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <h4 className="font-bold text-xl mb-1">{career.title}</h4>
                              <p className="text-lg text-teal-300 font-semibold">{career.salary}</p>
                            </div>
                            <span className={`px-4 py-2 rounded-xl text-sm font-semibold ${
                              career.demand === 'Very High' 
                                ? 'bg-gradient-to-r from-green-600 to-emerald-600' 
                                : 'bg-gradient-to-r from-teal-600 to-cyan-600'
                            }`}>
                              {career.demand} Demand
                            </span>
                          </div>
                          <div className="flex items-center gap-2 mb-2">
                            <Users className="w-4 h-4 text-slate-400" />
                            <span className="text-sm text-slate-400">Hiring companies:</span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {career.companies.map((company, cidx) => (
                              <span key={cidx} className="px-3 py-1.5 bg-white/10 border border-white/10 rounded-lg text-sm hover:bg-white/20 transition-all">
                                {company}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Key Skills */}
                  <div>
                    <h3 className="text-2xl font-bold mb-5 flex items-center gap-2">
                      <Award className="text-yellow-400 w-6 h-6" />
                      Skills You'll Develop
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {currentPath.keySkills.map((skill, idx) => (
                        <span key={idx} className="px-5 py-3 bg-gradient-to-r from-green-600/20 to-teal-600/20 border border-green-500/30 rounded-xl text-sm font-medium hover:from-green-600/30 hover:to-teal-600/30 transition-all">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Next Steps */}
                  <div>
                    <h3 className="text-2xl font-bold mb-5 flex items-center gap-2">
                      <Target className="text-pink-400 w-6 h-6" />
                      Your Next Steps
                    </h3>
                    <div className="space-y-3">
                      {currentPath.nextSteps.map((step, idx) => (
                        <div key={idx} className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10 hover:border-pink-500/50 transition-all group">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-600 to-purple-600 flex items-center justify-center font-bold flex-shrink-0">
                            {idx + 1}
                          </div>
                          <span className="flex-1 group-hover:text-pink-300 transition-colors">{step}</span>
                          <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-pink-400 group-hover:translate-x-1 transition-all" />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex gap-4 pt-6">
                    <button className="flex-1 px-8 py-4 bg-gradient-to-r from-green-600 to-teal-600 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-green-600/50 transition-all hover:scale-[1.02]">
                      Start Application
                    </button>
                    <button className="px-8 py-4 bg-white/10 border border-white/20 rounded-xl font-bold hover:bg-white/20 transition-all">
                      Save Path
                    </button>
                    <button className="px-8 py-4 bg-white/10 border border-white/20 rounded-xl font-bold hover:bg-white/20 transition-all">
                      Share
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Chat Panel */}
      {chatOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[500px] bg-slate-900/95 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl flex flex-col z-50 animate-in slide-in-from-bottom-4 duration-300">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-green-600 to-teal-600 p-4 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg">
                <Brain className="w-7 h-7 text-green-600" />
              </div>
              <div>
                <div className="font-bold">UH Pathfinder AI</div>
                <div className="text-xs text-green-100 flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
                  Ready to help
                </div>
              </div>
            </div>
            <button onClick={() => setChatOpen(false)} className="hover:bg-white/20 p-2 rounded-xl transition-all">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {chatMessages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-2xl ${
                  msg.role === 'user' 
                    ? 'bg-gradient-to-r from-green-600 to-teal-600 rounded-br-sm' 
                    : 'bg-white/10 border border-white/10 rounded-bl-sm'
                }`}>
                  <p className="text-sm leading-relaxed">{msg.content}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Suggested Questions */}
          <div className="px-6 pb-3 flex flex-wrap gap-2">
            {['Compare UH campuses', 'Financial aid options', 'Housing information', 'Transfer credits'].map((q, idx) => (
              <button 
                key={idx}
                onClick={() => setInputMessage(q)}
                className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs transition-all hover:border-green-500/50"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Chat Input */}
          <div className="p-6 border-t border-white/10">
            <div className="flex gap-3">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask me anything about UH programs..."
                className="flex-1 px-5 py-3 bg-white/5 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 text-sm placeholder-slate-400"
              />
              <button 
                onClick={handleSendMessage}
                className="px-5 py-3 bg-gradient-to-r from-green-600 to-teal-600 rounded-xl hover:shadow-lg hover:shadow-green-600/50 transition-all hover:scale-105"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Chat Button (when closed) */}
      {!chatOpen && (
        <button
          onClick={() => setChatOpen(true)}
          className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-r from-green-600 to-teal-600 rounded-2xl flex items-center justify-center shadow-2xl hover:scale-110 transition-all z-50 hover:shadow-green-600/50"
        >
          <MessageSquare className="w-7 h-7" />
        </button>
      )}
    </div>
  );
}