import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, Lock, Send, X, Bot, Clock, Paperclip, Trophy, GraduationCap, 
  ArrowLeft, FileText, Download, Video, CheckCircle2, PlayCircle
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

/* ━━━ Original 10 Modules (With Aura Colors) ━━━ */
const originalModules = [
  { id: 1, title: 'HTML, CSS & JS Fundamentals', duration: '1h 20m', thumbnail: '🌐', locked: false, progress: 100, category: 'Foundation' },
  { id: 2, title: 'Python for Termux Users', duration: '55m', thumbnail: '🐍', locked: false, progress: 45, category: 'Foundation' },
  { id: 3, title: 'Linux Command Line Mastery', duration: '42m', thumbnail: '🐧', locked: false, progress: 0, category: 'Foundation' },
  { id: 4, title: 'React.js & Tailwind CSS', duration: '1h 45m', thumbnail: '⚛️', locked: true, progress: 0, category: 'Pro Builder' },
  { id: 5, title: 'SQL & DBMS Foundations', duration: '1h 10m', thumbnail: '🗄️', locked: true, progress: 0, category: 'Pro Builder' },
  { id: 6, title: 'Git & Github Complete', duration: '58m', thumbnail: '🔄', locked: true, progress: 0, category: 'Pro Builder' },
  { id: 7, title: 'Bot Architecture (TG/Discord)', duration: '1h 30m', thumbnail: '🤖', locked: true, progress: 0, category: 'Pro Builder' },
  { id: 8, title: 'Ethical Hacking Foundations', duration: '2h 10m', thumbnail: '🔓', locked: true, progress: 0, category: 'Cyber Elite' },
  { id: 9, title: 'Network Analysis (Wireshark)', duration: '1h 25m', thumbnail: '📡', locked: true, progress: 0, category: 'Cyber Elite' },
  { id: 10, title: 'Neural Networks Deep Dive', duration: '1h 50m', thumbnail: '🧠', locked: true, progress: 0, category: 'AI Mastery' },
];

const attachments = [
  { name: 'Course_Syllabus.pdf', size: '2.4 MB', icon: FileText },
  { name: 'Python_Cheatsheet.pdf', size: '1.1 MB', icon: FileText },
  { name: 'Project_Starter.zip', size: '8.7 MB', icon: Paperclip },
];

// Helper to get unique aura per category
const getCategoryStyles = (category: string) => {
  switch(category) {
    case 'Foundation': 
      return { bg: 'from-emerald-500/20 to-emerald-900/10', border: 'border-emerald-500/30', text: 'text-emerald-400', shadow: 'hover:shadow-[0_0_20px_rgba(16,185,129,0.2)]' };
    case 'Pro Builder': 
      return { bg: 'from-blue-500/20 to-blue-900/10', border: 'border-blue-500/30', text: 'text-blue-400', shadow: 'hover:shadow-[0_0_20px_rgba(59,130,246,0.2)]' };
    case 'Cyber Elite': 
      return { bg: 'from-rose-500/20 to-rose-900/10', border: 'border-rose-500/30', text: 'text-rose-400', shadow: 'hover:shadow-[0_0_20px_rgba(243,64,121,0.2)]' };
    case 'AI Mastery': 
      return { bg: 'from-fuchsia-500/20 to-fuchsia-900/10', border: 'border-fuchsia-500/30', text: 'text-fuchsia-400', shadow: 'hover:shadow-[0_0_20px_rgba(217,70,239,0.2)]' };
    default: 
      return { bg: 'from-slate-500/20 to-slate-900/10', border: 'border-slate-500/30', text: 'text-slate-400', shadow: 'hover:shadow-slate-500/20' };
  }
};

interface ChatMsg { role: 'user' | 'ai'; text: string; }

const EdTechSpace: React.FC = () => {
  const isMobile = useIsMobile();
  const [activeCourseId, setActiveCourseId] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'attachments' | 'certificate'>('overview');
  
  // AI Chat State
  const [showAI, setShowAI] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMsg[]>([
    { role: 'ai', text: "Hi! I'm your AI learning assistant. Ask me anything about the course content." },
  ]);

  const activeCourse = originalModules.find((c) => c.id === activeCourseId);

  const sendChat = () => {
    if (!chatInput.trim()) return;
    setChatMessages((prev) => [...prev, { role: 'user', text: chatInput }]);
    setChatInput('');
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        { role: 'ai', text: `Great question! This concept is covered in detail within the course modules. Let me point you to the right lesson.` },
      ]);
    }, 1000);
  };

  return (
    <div className="flex-1 flex flex-col pb-16 overflow-hidden bg-[#0f172a] text-slate-100 font-sans">
      
      {/* Top Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700/50 bg-slate-900/80 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-pink-500 flex items-center justify-center shadow-lg">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-base font-extrabold text-white">E@Akhuwat Academy</h1>
            <p className="text-[11px] font-bold uppercase tracking-widest text-blue-400">Interactive LMS Portal</p>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      {activeCourseId === null ? (
        
        /* ━━━ Catalog View (Course List) ━━━ */
        <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-8 scrollbar-hide bg-[#0f172a]">
          <div className="max-w-6xl mx-auto space-y-8">
            
            <div>
              <h2 className="text-2xl font-extrabold text-white mb-2">Your Learning Path</h2>
              <p className="text-sm text-slate-400">Master Web3, Python, and Cybersecurity with hands-on modules.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {originalModules.map((course) => {
                const aura = getCategoryStyles(course.category);
                return (
                  <button
                    key={course.id}
                    onClick={() => !course.locked && setActiveCourseId(course.id)}
                    className={`flex flex-col text-left rounded-2xl border transition-all duration-300 overflow-hidden ${
                      course.locked 
                        ? 'bg-slate-800/40 border-slate-700/50 opacity-80 cursor-not-allowed' 
                        : `bg-slate-800 ${aura.border} ${aura.shadow} hover:-translate-y-1`
                    }`}
                  >
                    {/* Card Cover with Unique Aura Gradient */}
                    <div className={`h-32 w-full relative flex items-center justify-center overflow-hidden bg-gradient-to-br ${course.locked ? 'from-slate-800 to-slate-900' : aura.bg}`}>
                      <span className="text-5xl drop-shadow-xl">{course.thumbnail}</span>
                      {course.locked && (
                        <div className="absolute inset-0 bg-slate-950/70 flex items-center justify-center z-20">
                          <div className="bg-slate-900/90 px-3 py-1.5 rounded-lg border border-slate-700 flex items-center gap-2 shadow-xl">
                            <Lock className="w-4 h-4 text-rose-400" />
                            <span className="text-xs font-bold text-slate-200">Locked</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Card Body */}
                    <div className="p-5 flex-1 flex flex-col bg-slate-900/40">
                      <span className={`text-[10px] font-extrabold uppercase tracking-wider mb-2 ${aura.text}`}>{course.category}</span>
                      <h3 className="text-base font-bold text-white mb-2 leading-tight">{course.title}</h3>
                      <p className="text-xs text-slate-400 mb-5 flex items-center gap-1.5 font-medium">
                        <Clock className="w-3.5 h-3.5 text-blue-400" /> {course.duration}
                      </p>
                      
                      <div className="mt-auto">
                        <div className="flex items-center justify-between text-xs mb-2">
                          <span className="font-bold text-slate-400">Progress</span>
                          <span className={`font-extrabold ${aura.text}`}>{course.progress}%</span>
                        </div>
                        <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full transition-all duration-1000 ${course.progress === 100 ? 'bg-emerald-500' : 'bg-gradient-to-r from-blue-500 to-pink-500'}`}
                            style={{ width: `${course.progress}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

      ) : (

        /* ━━━ Active Course View (The Workspace) ━━━ */
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden bg-[#0f172a]">
          
          {/* Left/Top Side: Video Player & Tabs */}
          <div className="flex-1 flex flex-col lg:border-r border-slate-700/50 min-w-0 overflow-y-auto">
            
            {/* Video Player Area */}
            <div className="w-full bg-black aspect-video relative group">
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-900 to-black">
                <div className="text-center">
                  <button className="w-16 h-16 rounded-full bg-blue-600 hover:bg-blue-500 flex items-center justify-center mx-auto mb-3 shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-transform hover:scale-110">
                    <Play className="w-6 h-6 text-white ml-1" />
                  </button>
                  <p className="text-sm font-bold text-white">Start Lesson</p>
                </div>
              </div>

              {/* Player Top Controls */}
              <div className="absolute top-0 inset-x-0 p-4 bg-gradient-to-b from-black/80 to-transparent flex items-start justify-between">
                <button 
                  onClick={() => setActiveCourseId(null)} 
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-white text-xs font-bold transition-colors border border-slate-700"
                >
                  <ArrowLeft className="w-4 h-4" /> Back to Courses
                </button>
                <div className="px-3 py-1.5 rounded-lg bg-black/80 border border-slate-700 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
                  <span className="text-[10px] font-bold text-white uppercase tracking-wider">1080p HD</span>
                </div>
              </div>
            </div>

            {/* Content Tabs */}
            <div className="flex border-b border-slate-700/50 bg-slate-800/80 px-2 sm:px-4">
              {(['overview', 'attachments', 'certificate'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 sm:px-6 py-4 text-xs font-extrabold uppercase tracking-wider transition-colors border-b-2 ${
                    activeTab === tab ? 'text-blue-400 border-blue-500' : 'text-slate-400 border-transparent hover:text-slate-200'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab Contents */}
            <div className="p-5 sm:p-8 flex-1 bg-slate-900/30">
              {activeTab === 'overview' && (
                <div className="max-w-3xl space-y-6">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-extrabold text-white mb-2 flex items-center gap-3">
                      <span className="text-3xl">{activeCourse?.thumbnail}</span> {activeCourse?.title}
                    </h2>
                    <p className="text-sm text-slate-300 leading-relaxed font-medium">
                      This comprehensive module breaks down complex mechanics into bite-sized, practical lessons. 
                      Designed strictly for modern builders, you will learn through direct implementation, 
                      real-world scenarios, and guided assignments.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-4 border-t border-slate-700/50 pt-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold text-white shadow-md">EA</div>
                      <div>
                        <p className="text-sm font-bold text-white">E@Akhuwat Academy</p>
                        <p className="text-[10px] uppercase tracking-widest text-pink-400 font-bold">Official Instructor</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'attachments' && (
                <div className="max-w-2xl space-y-3">
                  <h3 className="text-sm font-bold text-white mb-4">Course Resources</h3>
                  {attachments.map((file) => (
                    <div key={file.name} className="flex items-center justify-between p-4 rounded-xl bg-slate-800 border border-slate-700 hover:border-blue-500/50 transition-colors shadow-sm group">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                          <file.icon className="w-4 h-4 text-blue-400" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-100">{file.name}</p>
                          <p className="text-[11px] text-slate-400 font-medium mt-0.5">{file.size}</p>
                        </div>
                      </div>
                      <button className="w-9 h-9 rounded-lg bg-slate-700 hover:bg-blue-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* ━━━ DOCTOR SAHEB'S CERTIFICATE ━━━ */}
              {activeTab === 'certificate' && (
                <div className="max-w-2xl">
                  <div className="rounded-2xl border border-slate-700 bg-slate-800 p-1 overflow-hidden shadow-xl">
                    <div className="bg-slate-900 p-6 sm:p-8 flex flex-col items-center text-center">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center mb-5 shadow-[0_0_30px_rgba(251,191,36,0.3)]">
                        <Trophy className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-extrabold text-white mb-2">Certificate of Completion</h3>
                      <p className="text-sm text-slate-300 mb-8 max-w-md font-medium">
                        Complete 100% of the lectures and assignments in this track to unlock your verified credential.
                      </p>

                      <div className="w-full bg-slate-800 rounded-full h-2.5 mb-3 border border-slate-700 overflow-hidden">
                        <div className="bg-gradient-to-r from-blue-500 to-pink-500 h-full rounded-full transition-all duration-1000" style={{ width: `${activeCourse?.progress}%` }}></div>
                      </div>
                      <p className="text-xs font-bold text-slate-300 mb-8">{activeCourse?.progress}% Completed</p>

                      <button 
                        disabled={activeCourse?.progress !== 100}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all ${
                          activeCourse?.progress === 100 
                            ? 'bg-gradient-to-r from-amber-400 to-orange-500 hover:scale-105 text-white shadow-lg shadow-amber-500/20' 
                            : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                        }`}
                      >
                        {activeCourse?.progress === 100 ? <Download className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                        Download Certificate
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Side: Syllabus List */}
          <div className="w-full lg:w-[350px] bg-slate-900 flex flex-col h-[500px] lg:h-auto border-t lg:border-t-0 lg:border-l border-slate-700/50">
            <div className="p-4 border-b border-slate-700/50 bg-slate-800/80 shrink-0">
              <h3 className="text-sm font-bold text-white">Course Lessons</h3>
              <p className="text-[10px] font-bold uppercase tracking-widest text-blue-400 mt-1">1 Section • 1 Video</p>
            </div>
            
            <div className="flex-1 overflow-y-auto scrollbar-hide p-3 space-y-2">
               <div className="rounded-xl border border-slate-700 bg-slate-800 overflow-hidden">
                  <div className="p-4 bg-slate-800 border-b border-slate-700">
                    <p className="text-sm font-bold text-white">Module 1: Introduction</p>
                  </div>
                  <div className="py-2 bg-slate-900/50">
                    <button className="w-full flex items-start gap-3 p-3 text-left bg-blue-500/10 border-l-2 border-blue-500">
                      <PlayCircle className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-blue-300 truncate">1. {activeCourse?.title}</p>
                        <div className="flex items-center gap-1.5 mt-1">
                          <Clock className="w-3 h-3 text-slate-500" />
                          <span className="text-[10px] font-semibold text-slate-400">{activeCourse?.duration}</span>
                        </div>
                      </div>
                    </button>
                  </div>
               </div>
            </div>
          </div>
        </div>
      )}

      {/* ━━━ Floating AI Chat (Fixed: Solid BG & Proper Height) ━━━ */}
      {!showAI && (
        <button
          onClick={() => setShowAI(true)}
          className="fixed bottom-24 right-4 sm:right-8 w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-pink-600 border-2 border-slate-900 flex items-center justify-center z-40 shadow-[0_10px_25px_rgba(236,72,153,0.4)] transition-transform hover:scale-105"
        >
          <Bot className="w-6 h-6 text-white" />
        </button>
      )}

      <AnimatePresence>
        {showAI && (
          <motion.div
            initial={{ y: '20%', opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: '20%', opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            /* SOLID BACKGROUND: No transparent/blur drama here */
            className="fixed bottom-24 right-4 sm:right-8 w-[calc(100vw-2rem)] sm:w-[380px] h-[450px] z-50 bg-slate-900 border border-slate-700 flex flex-col rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* AI Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-700 bg-slate-800 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-pink-500/20 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-pink-400" />
                </div>
                <div>
                  <span className="block text-sm font-extrabold text-white">Course AI</span>
                  <span className="block text-[9px] font-bold uppercase tracking-widest text-emerald-400">Online</span>
                </div>
              </div>
              <button onClick={() => setShowAI(false)} className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* AI Chat Area */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-slate-900 scrollbar-hide">
              {chatMessages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] px-4 py-3 text-[13px] font-medium leading-relaxed shadow-sm ${
                    msg.role === 'user'
                      ? 'bg-blue-600 text-white rounded-2xl rounded-tr-sm'
                      : 'bg-slate-800 border border-slate-700 rounded-2xl rounded-tl-sm text-slate-200'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* AI Input */}
            <div className="p-4 border-t border-slate-700 bg-slate-800 shrink-0">
              <div className="flex items-center gap-2 bg-slate-900 border border-slate-600 rounded-xl px-2 py-2 focus-within:border-blue-500 transition-colors">
                <input
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && sendChat()}
                  placeholder="Ask a technical question..."
                  className="flex-1 bg-transparent px-2 text-sm text-white placeholder:text-slate-500 focus:outline-none font-medium"
                />
                <button 
                  onClick={sendChat}
                  disabled={!chatInput.trim()} 
                  className="w-9 h-9 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:bg-slate-700 flex items-center justify-center shrink-0 transition-colors"
                >
                  <Send className="w-4 h-4 text-white ml-0.5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default EdTechSpace;
