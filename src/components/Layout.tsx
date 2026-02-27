import React, { useState } from 'react';
import { 
  Home, 
  Settings, 
  FileText, 
  BarChart2, 
  ClipboardList, 
  Bell, 
  ChevronLeft, 
  ChevronRight,
  LogOut,
  User,
  Search,
  ArrowLeft,
  Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface LayoutProps {
  children: React.ReactNode;
  activeScreen: string;
  setActiveScreen: (screen: string) => void;
  activeProject?: { name: string; ref: string; status: string };
  onBackToHome: () => void;
}

export default function Layout({ 
  children, 
  activeScreen, 
  setActiveScreen, 
  activeProject,
  onBackToHome
}: LayoutProps) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'setup', label: 'RFQ Setup', icon: Settings },
    { id: 'submissions', label: 'Submissions', icon: ClipboardList },
    { id: 'analysis', label: 'Bid Analysis', icon: BarChart2 },
    { id: 'reports', label: 'Reports', icon: FileText },
  ];

  const notifications = [
    { id: 1, text: "Gulf Tech Solutions — 2 clarifications still open", type: "warning" },
    { id: 2, text: "Nasser Engineering submission is late", type: "error" },
    { id: 3, text: "Al Wasl Pipeline — Analysis complete and ready for review", type: "success" },
  ];

  return (
    <div className="flex h-screen bg-[#F8FAFC] text-slate-900 font-sans overflow-hidden">
      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: isSidebarCollapsed ? 80 : 260 }}
        className="bg-[#0F172A] text-white flex flex-col z-50 relative shadow-2xl"
      >
        <div className="h-20 flex items-center px-6 border-b border-white/5">
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={onBackToHome}
          >
            <div className="w-10 h-10 bg-brand-500 rounded-xl flex items-center justify-center shadow-lg shadow-brand-500/20 group-hover:scale-105 transition-transform">
              <Zap size={22} className="text-white" />
            </div>
            {!isSidebarCollapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xl font-black tracking-tighter"
              >
                Procure<span className="text-brand-500">AI</span>
              </motion.span>
            )}
          </div>
        </div>

        <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto subtle-scroll">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveScreen(item.id)}
              className={cn(
                "w-full flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-200 group relative",
                activeScreen === item.id 
                  ? "bg-white/10 text-white shadow-sm" 
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              )}
            >
              <item.icon size={20} className={cn(activeScreen === item.id ? "text-brand-500" : "group-hover:text-brand-400 transition-colors")} />
              {!isSidebarCollapsed && (
                <span className="text-sm font-semibold tracking-tight">{item.label}</span>
              )}
              {activeScreen === item.id && (
                <motion.div
                  layoutId="active-nav"
                  className="absolute left-0 w-1 h-6 bg-brand-500 rounded-r-full"
                />
              )}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/5">
          <button 
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="w-full flex items-center gap-4 px-4 py-3 text-slate-500 hover:text-white transition-colors"
          >
            {isSidebarCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
            {!isSidebarCollapsed && <span className="text-xs font-bold uppercase tracking-widest">Collapse</span>}
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        {/* Topbar */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200/60 flex items-center justify-between px-8 z-40 sticky top-0">
          <div className="flex items-center gap-6">
            {activeScreen !== 'home' && (
              <button 
                onClick={onBackToHome}
                className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500"
              >
                <ArrowLeft size={20} />
              </button>
            )}
            
            {activeProject ? (
              <div className="flex items-center gap-6">
                <div className="flex flex-col">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    <span>Active RFQ</span>
                    <div className="w-1 h-1 rounded-full bg-slate-300" />
                    <span className="text-slate-500">{activeProject.ref}</span>
                  </div>
                  <h2 className="text-sm font-bold text-slate-900 tracking-tight">{activeProject.name}</h2>
                </div>
                <div className="h-8 w-[1px] bg-slate-200" />
                <div className="flex items-center gap-2 px-3 py-1.5 bg-brand-50 border border-brand-100 rounded-full">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse" />
                  <span className="text-[10px] font-bold text-brand-700 uppercase tracking-wider">{activeProject.status}</span>
                </div>
              </div>
            ) : (
              <div className="text-sm font-medium text-slate-400 italic tracking-tight">Select a project to begin analysis</div>
            )}
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center bg-slate-100 rounded-xl p-1">
              <button className="p-2 text-slate-500 hover:text-slate-900 transition-colors">
                <Search size={18} />
              </button>
              <div className="w-[1px] h-4 bg-slate-200 mx-1" />
              <div className="relative">
                <button 
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-2 text-slate-500 hover:text-slate-900 transition-colors relative"
                >
                  <Bell size={18} />
                  <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 border-2 border-white rounded-full" />
                </button>

                <AnimatePresence>
                  {showNotifications && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-2xl border border-slate-100 py-2 z-50"
                    >
                      <div className="px-4 py-2 border-b border-slate-50 flex justify-between items-center">
                        <span className="font-bold text-sm">Notifications</span>
                        <span className="text-[10px] text-brand-500 font-bold uppercase cursor-pointer">Mark all read</span>
                      </div>
                      <div className="max-h-96 overflow-y-auto subtle-scroll">
                        {notifications.map((notif) => (
                          <div key={notif.id} className="px-4 py-3 hover:bg-slate-50 cursor-pointer transition-colors border-b border-slate-50 last:border-0">
                            <p className="text-xs text-slate-600 leading-relaxed">{notif.text}</p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="flex items-center gap-3 pl-6 border-l border-slate-200">
              <div className="flex flex-col items-end">
                <span className="text-xs font-bold text-slate-900">Sarah Mitchell</span>
                <span className="text-[10px] font-medium text-slate-500">Procurement Lead</span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-emerald-600 flex items-center justify-center text-white font-bold shadow-lg shadow-brand-500/20">
                SM
              </div>
            </div>
          </div>
        </header>

        {/* Screen Content */}
        <main className="flex-1 overflow-y-auto bg-[#F8FAFC] subtle-scroll">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeScreen}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="h-full"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
