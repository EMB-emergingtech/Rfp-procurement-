import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  ChevronDown, 
  ChevronUp, 
  FileText, 
  MessageSquare, 
  CheckCircle2, 
  AlertCircle,
  Clock,
  ArrowRight,
  ExternalLink,
  Users
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { VENDOR_SUBMISSIONS } from '../constants';
import { VendorSubmission } from '../types';

export default function SubmissionTracker() {
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredSubmissions = VENDOR_SUBMISSIONS.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = statusFilter === 'All' || s.status === statusFilter;
    return matchesSearch && matchesFilter;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Received': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'Incomplete': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'Late': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-emerald-500';
    if (score >= 70) return 'text-amber-500';
    return 'text-red-500';
  };

  const getScoreBg = (score: number) => {
    if (score >= 90) return 'bg-emerald-500';
    if (score >= 70) return 'bg-amber-500';
    return 'bg-red-500';
  };

  return (
    <div className="p-8 max-w-[1400px] mx-auto">
      <div className="mb-10">
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Vendor Submission Tracker</h1>
        <p className="text-slate-500 text-sm font-medium">Monitor real-time bid submissions and automated alignment scoring.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        {[
          { label: 'Total Vendors', value: '4', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Submissions Received', value: '3', icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Incomplete', value: '1', icon: AlertCircle, color: 'text-brand-600', bg: 'bg-brand-50' },
          { label: 'Late', value: '1', icon: Clock, color: 'text-red-600', bg: 'bg-red-50' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm flex items-center gap-5">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color} shadow-sm`}>
              <stat.icon size={22} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
              <p className="text-2xl font-black text-slate-900 tracking-tight">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/60 shadow-sm mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by vendor name..." 
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-brand-500 transition-all placeholder:text-slate-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-3">
          <select 
            className="bg-slate-50 border-none rounded-xl text-sm px-4 py-2.5 focus:ring-2 focus:ring-brand-500 font-bold text-slate-600 cursor-pointer"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option>All Statuses</option>
            <option>Received</option>
            <option>Incomplete</option>
            <option>Late</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-slate-50 text-slate-600 rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-slate-100 transition-colors border border-slate-200/40">
            <Filter size={16} />
            Show Flagged Only
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-100">
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Vendor</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Submitted At</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Documents</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Alignment</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Clarifications</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredSubmissions.map((sub) => (
              <React.Fragment key={sub.id}>
                <tr 
                  onClick={() => setExpandedRow(expandedRow === sub.id ? null : sub.id)}
                  className={`group cursor-pointer hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-0 ${expandedRow === sub.id ? 'bg-slate-50' : ''}`}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center text-slate-500 font-bold text-xs uppercase">
                        {sub.name.substring(0, 2)}
                      </div>
                      <span className="text-sm font-bold text-slate-900">{sub.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${getStatusBadge(sub.status)} uppercase tracking-wider`}>
                      {sub.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">{sub.submittedAt}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <FileText size={14} className="text-slate-400" />
                      {sub.docsCount} docs loaded
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-bold ${getScoreColor(sub.alignmentScore)}`}>{sub.alignmentScore}%</span>
                      <div className="w-12 h-1 bg-slate-100 rounded-full overflow-hidden">
                        <div className={`h-full ${getScoreBg(sub.alignmentScore)}`} style={{ width: `${sub.alignmentScore}%` }} />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-slate-900">{sub.clarifications}</span>
                      {sub.clarificationStatus && (
                        <span className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded ${sub.clarificationStatus === 'Resolved' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                          {sub.clarificationStatus}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-slate-400 hover:text-emerald-500 transition-colors">
                      {expandedRow === sub.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </button>
                  </td>
                </tr>
                <AnimatePresence>
                  {expandedRow === sub.id && (
                    <tr>
                      <td colSpan={7} className="px-6 py-0">
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="py-8 grid grid-cols-1 lg:grid-cols-3 gap-8 border-b border-slate-100">
                            {/* Documents */}
                            <div className="space-y-4">
                              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                                <FileText size={14} />
                                Auto-loaded Documents
                              </h4>
                              <div className="space-y-2">
                                {[
                                  'Commercial_Offer.xlsx',
                                  'Technical_Proposal.pdf',
                                  'Compliance_Statement.pdf',
                                  'BoQ_Submission.xlsx'
                                ].map((doc) => (
                                  <div key={doc} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100 group hover:border-emerald-200 transition-all">
                                    <span className="text-xs font-medium text-slate-700">{doc}</span>
                                    <ExternalLink size={14} className="text-slate-300 group-hover:text-emerald-500" />
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Clarifications */}
                            <div className="space-y-4">
                              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                                <MessageSquare size={14} />
                                Clarification Thread
                              </h4>
                              {sub.clarifications > 0 ? (
                                <div className="space-y-4">
                                  <div className="p-3 bg-slate-900 text-white rounded-2xl rounded-tl-none text-xs relative">
                                    <p className="font-bold text-emerald-400 mb-1">System (11 Mar 14:33)</p>
                                    <p className="opacity-80">Please provide insurance certificate and complete Section 4 of the technical submission.</p>
                                  </div>
                                  <div className="p-3 bg-emerald-50 text-emerald-900 rounded-2xl rounded-tr-none text-xs relative ml-8">
                                    <p className="font-bold text-emerald-600 mb-1">Vendor (12 Mar 09:10)</p>
                                    <p className="opacity-80">Documents attached. Section 4 completed.</p>
                                  </div>
                                  <div className="flex items-center gap-2 text-[10px] font-bold text-emerald-500 uppercase tracking-widest pl-8">
                                    <CheckCircle2 size={12} />
                                    Status: Resolved
                                  </div>
                                </div>
                              ) : (
                                <div className="h-32 flex flex-col items-center justify-center bg-slate-50 rounded-2xl border border-dashed border-slate-200 text-slate-400">
                                  <MessageSquare size={24} className="mb-2 opacity-20" />
                                  <p className="text-[10px] font-bold uppercase tracking-widest">No open clarifications</p>
                                </div>
                              )}
                            </div>

                            {/* Breakdown */}
                            <div className="space-y-4">
                              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                                <ArrowRight size={14} />
                                Alignment Breakdown
                              </h4>
                              <div className="space-y-6 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                                {[
                                  { label: 'Scope Coverage', val: sub.alignmentScore + 2 },
                                  { label: 'Documents Complete', val: sub.docsCount * 25 },
                                  { label: 'Commercial Items', val: sub.alignmentScore - 5 },
                                  { label: 'Technical Items', val: sub.alignmentScore + 1 },
                                ].map((item) => (
                                  <div key={item.label} className="space-y-2">
                                    <div className="flex justify-between items-center">
                                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{item.label}</span>
                                      <span className="text-xs font-bold text-slate-900">{item.val}%</span>
                                    </div>
                                    <div className="h-1.5 bg-white rounded-full overflow-hidden border border-slate-100">
                                      <motion.div 
                                        initial={{ width: 0 }}
                                        animate={{ width: `${item.val}%` }}
                                        className={`h-full ${getScoreBg(item.val)}`} 
                                      />
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      </td>
                    </tr>
                  )}
                </AnimatePresence>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

