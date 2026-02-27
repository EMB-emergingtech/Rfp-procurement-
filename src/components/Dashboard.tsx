import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  ArrowRight, 
  Clock, 
  Users, 
  FileCheck, 
  TrendingUp,
  MoreVertical,
  Calendar
} from 'lucide-react';
import { motion } from 'motion/react';
import { PROJECTS, ACTIVITIES } from '../constants';
import { Project } from '../types';

interface DashboardProps {
  onProjectSelect: (project: Project, screen: string) => void;
  onNewRFQ: () => void;
}

const StatCard = ({ label, value, icon: Icon, color }: any) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseInt(value);
    if (start === end) return;
    
    let totalMiliseconds = 1000;
    let incrementTime = (totalMiliseconds / end);
    
    let timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, incrementTime);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <motion.div 
      whileHover={{ y: -4 }}
      className="bg-white p-6 rounded-2xl shadow-[0_2px_4px_rgba(0,0,0,0.02),0_1px_0_rgba(0,0,0,0.02)] border border-slate-200/60 flex items-center gap-5"
    >
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color} shadow-sm`}>
        <Icon size={24} />
      </div>
      <div>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{label}</p>
        <p className="text-2xl font-black text-slate-900 tracking-tight">{count}</p>
      </div>
    </motion.div>
  );
};

export default function Dashboard({ onProjectSelect, onNewRFQ }: DashboardProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All Projects');

  const filteredProjects = PROJECTS.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'All Projects' || p.status === filter;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Analysis Complete': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'Awaiting Submissions': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Clarifications Pending': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'Draft': return 'bg-slate-100 text-slate-700 border-slate-200';
      case 'Awarded': return 'bg-indigo-100 text-indigo-700 border-indigo-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const getActionButton = (project: Project) => {
    switch (project.status) {
      case 'Analysis Complete': return { label: 'View Analysis', screen: 'analysis' };
      case 'Awaiting Submissions': return { label: 'View Submissions', screen: 'submissions' };
      case 'Clarifications Pending': return { label: 'View Submissions', screen: 'submissions' };
      case 'Draft': return { label: 'Continue Setup', screen: 'setup' };
      case 'Awarded': return { label: 'View Report', screen: 'reports' };
      default: return { label: 'View Details', screen: 'home' };
    }
  };

  return (
    <div className="p-8 max-w-[1600px] mx-auto">
      {/* Summary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard label="Active RFQs" value="3" icon={Clock} color="bg-blue-50 text-blue-600" />
        <StatCard label="Pending Submissions" value="5" icon={Users} color="bg-amber-50 text-amber-600" />
        <StatCard label="Analysis Ready" value="2" icon={FileCheck} color="bg-emerald-50 text-emerald-600" />
        <StatCard label="Vendors Registered" value="14" icon={TrendingUp} color="bg-indigo-50 text-indigo-600" />
      </div>

      <div className="flex gap-8">
        {/* Main Grid */}
        <div className="flex-1">
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-between bg-white p-4 rounded-2xl border border-slate-200/60 shadow-sm">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search by project name..." 
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-brand-500 transition-all placeholder:text-slate-400"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-3">
              <select 
                className="bg-slate-50 border-none rounded-xl text-sm px-4 py-2.5 focus:ring-2 focus:ring-brand-500 font-medium text-slate-600 cursor-pointer"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option>All Projects</option>
                <option>Active</option>
                <option>Analysis Complete</option>
                <option>Closed</option>
                <option>Draft</option>
              </select>
              <button className="flex items-center gap-2 px-4 py-2.5 bg-slate-50 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-100 transition-colors border border-slate-200/40">
                <Filter size={16} />
                Sort by: Latest Updated
              </button>
            </div>
          </div>

          {/* Project Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-6">
            {filteredProjects.map((project) => {
              const action = getActionButton(project);
              return (
                <motion.div
                  key={project.id}
                  whileHover={{ y: -8, shadow: "0 20px 25px -5px rgb(0 0 0 / 0.05), 0 8px 10px -6px rgb(0 0 0 / 0.05)" }}
                  onClick={() => onProjectSelect(project, action.screen)}
                  className="bg-white rounded-2xl p-6 border border-slate-200/60 shadow-sm cursor-pointer group relative overflow-hidden flex flex-col"
                >
                  {/* Animated left border for active */}
                  {project.status !== 'Draft' && project.status !== 'Awarded' && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-500 animate-pulse" />
                  )}

                  <div className="flex justify-between items-start mb-6">
                    <div className={`px-3 py-1 rounded-full text-[9px] font-black border ${getStatusColor(project.status)} uppercase tracking-widest`}>
                      {project.status}
                    </div>
                    <button className="text-slate-300 hover:text-slate-600 transition-colors">
                      <MoreVertical size={18} />
                    </button>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-brand-500 transition-colors tracking-tight">{project.name}</h3>
                  <p className="text-[10px] font-bold text-slate-400 mb-8 uppercase tracking-widest">{project.rfqRef}</p>

                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="flex items-center gap-2 text-slate-500">
                      <Calendar size={14} className="text-slate-400" />
                      <span className="text-xs font-semibold tracking-tight">{project.deadline}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-500">
                      <Users size={14} className="text-slate-400" />
                      <span className="text-xs font-semibold tracking-tight">{project.vendors} Vendors</span>
                    </div>
                  </div>

                  <div className="mb-8">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Analysis Progress</span>
                      <span className="text-xs font-black text-slate-900">{project.progress}%</span>
                    </div>
                    <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${project.progress}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="h-full bg-brand-500 rounded-full"
                      />
                    </div>
                  </div>

                  <button className="w-full py-3.5 bg-slate-50 text-slate-900 font-black text-[11px] uppercase tracking-widest rounded-xl group-hover:bg-brand-500 group-hover:text-white transition-all flex items-center justify-center gap-2 shadow-sm">
                    {action.label}
                    <ArrowRight size={14} />
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Activity Feed */}
        <div className="w-80 hidden 2xl:block">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 sticky top-8">
            <h3 className="font-bold text-slate-900 mb-6 flex items-center justify-between">
              Recent Activity
              <span className="w-2 h-2 bg-emerald-500 rounded-full" />
            </h3>
            <div className="space-y-6">
              {ACTIVITIES.map((activity, idx) => (
                <div key={activity.id} className="relative pl-6 group cursor-pointer">
                  {idx !== ACTIVITIES.length - 1 && (
                    <div className="absolute left-[3px] top-2 bottom-[-24px] w-[1px] bg-slate-100 group-hover:bg-emerald-200 transition-colors" />
                  )}
                  <div className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-slate-200 group-hover:bg-emerald-500 transition-colors" />
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">{activity.timestamp}</p>
                  <p className="text-xs text-slate-600 leading-relaxed group-hover:text-slate-900 transition-colors">{activity.message}</p>
                </div>
              ))}
            </div>
            <button className="w-full mt-8 py-2 text-xs font-bold text-emerald-500 hover:text-emerald-600 transition-colors">
              View All Events
            </button>
          </div>
        </div>
      </div>

      {/* FAB */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onNewRFQ}
        className="fixed bottom-8 right-8 w-16 h-16 bg-brand-500 text-white rounded-2xl shadow-2xl shadow-brand-500/40 flex items-center justify-center group z-50"
      >
        <Plus size={32} />
        <div className="absolute right-full mr-4 px-4 py-2 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-2xl">
          Create a new procurement event
        </div>
      </motion.button>
    </div>
  );
}
