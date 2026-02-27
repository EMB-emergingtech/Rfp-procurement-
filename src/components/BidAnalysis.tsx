import React, { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle2, 
  Info,
  ChevronRight,
  Radar,
  ArrowRight,
  Filter,
  Download,
  MessageSquare
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Radar as RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  RadarChart as RechartsRadarChart, 
  ResponsiveContainer,
  Tooltip,
  Legend
} from 'recharts';
import { BOQ_ITEMS, COMMERCIAL_TERMS, TECHNICAL_SCORES, VENDOR_SUBMISSIONS } from '../constants';

export default function BidAnalysis() {
  const [activeTab, setActiveTab] = useState('All Items');
  const [showDrawer, setShowDrawer] = useState<any>(null);

  const radarData = [
    { subject: 'Commercial Score', v1: 85, v2: 95, v3: 70, fullMark: 100 },
    { subject: 'Technical Score', v1: 91, v2: 73, v3: 86, fullMark: 100 },
    { subject: 'RFQ Alignment', v1: 94, v2: 61, v3: 88, fullMark: 100 },
    { subject: 'Terms Compliance', v1: 80, v2: 65, v3: 90, fullMark: 100 },
    { subject: 'Risk Rating', v1: 90, v2: 40, v3: 75, fullMark: 100 },
  ];

  const getVarianceColor = (variance: number) => {
    if (variance > 10) return 'text-red-500 bg-red-50 border-red-100';
    if (variance < -5) return 'text-amber-500 bg-amber-50 border-amber-100';
    return 'text-emerald-500 bg-emerald-50 border-emerald-100';
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical': return 'bg-red-100 text-red-700 border-red-200';
      case 'Minor': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'Compliant': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="p-8 max-w-[1600px] mx-auto space-y-12">
      {/* Top Bar Stats */}
      <div className="bg-[#0F172A] text-white p-10 rounded-[2.5rem] shadow-2xl flex flex-wrap items-center justify-between gap-8 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-brand-500/10 blur-[100px] rounded-full -mr-32 -mt-32" />
        <div className="space-y-2 relative z-10">
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Active Analysis Session</p>
          <h2 className="text-3xl font-black tracking-tight">RFQ-2025-041 | Al Wasl Pipeline Extension</h2>
        </div>
        <div className="flex gap-16 relative z-10">
          <div className="space-y-2">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Engineer's Estimate</p>
            <p className="text-2xl font-black tracking-tight">AED 4,150,000</p>
          </div>
          <div className="space-y-2">
            <p className="text-[10px] font-black text-brand-400 uppercase tracking-widest">Approved Budget</p>
            <p className="text-2xl font-black tracking-tight text-brand-400">AED 4,500,000</p>
          </div>
        </div>
      </div>

      {/* SECTION A — BoQ Commercial Comparison */}
      <section className="space-y-8">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-black text-slate-900 flex items-center gap-4 tracking-tight">
            <div className="w-2.5 h-10 bg-brand-500 rounded-full shadow-lg shadow-brand-500/20" />
            BoQ Commercial Comparison
          </h3>
          <div className="flex bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm">
            {['All Items', 'Flagged Only', 'Within Range'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-400 hover:text-slate-600'}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-[2rem] border border-slate-200/60 shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200/60">
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Line Item</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Unit</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Qty</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Al Faris Rate</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Gulf Tech Rate</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Arabian Rate</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Estimate Rate</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Variance</th>
              </tr>
            </thead>
            <tbody>
              {BOQ_ITEMS.map((item) => {
                const v1Var = ((item.vendors.v1 - item.estimateRate) / item.estimateRate) * 100;
                const v2Var = ((item.vendors.v2 - item.estimateRate) / item.estimateRate) * 100;
                const v3Var = ((item.vendors.v3 - item.estimateRate) / item.estimateRate) * 100;
                
                return (
                  <tr key={item.id} className="border-b border-slate-100/60 last:border-0 hover:bg-slate-50/50 transition-colors group">
                    <td className="px-8 py-6 text-sm font-black text-slate-900 tracking-tight">{item.description}</td>
                    <td className="px-8 py-6 text-sm text-slate-500 font-medium">{item.unit}</td>
                    <td className="px-8 py-6 text-sm text-slate-500 font-medium">{item.qty.toLocaleString()}</td>
                    <td className="px-8 py-6">
                      <div className="flex flex-col">
                        <span className="text-sm font-black text-slate-900">{item.vendors.v1.toLocaleString()}</span>
                        <span className={`text-[10px] font-black ${v1Var > 0 ? 'text-red-500' : 'text-emerald-500'}`}>
                          {v1Var > 0 ? '+' : ''}{v1Var.toFixed(1)}%
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex flex-col">
                        <span className="text-sm font-black text-slate-900">{item.vendors.v2.toLocaleString()}</span>
                        <span className={`text-[10px] font-black ${v2Var > 0 ? 'text-red-500' : 'text-emerald-500'}`}>
                          {v2Var > 0 ? '+' : ''}{v2Var.toFixed(1)}%
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex flex-col">
                        <span className="text-sm font-black text-slate-900">{item.vendors.v3.toLocaleString()}</span>
                        <span className={`text-[10px] font-black ${v3Var > 0 ? 'text-red-500' : 'text-emerald-500'}`}>
                          {v3Var > 0 ? '+' : ''}{v3Var.toFixed(1)}%
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-sm font-black text-slate-300">{item.estimateRate.toLocaleString()}</td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black border ${getVarianceColor(v1Var)}`}>{v1Var > 0 ? '+' : ''}{v1Var.toFixed(1)}%</span>
                        <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black border ${getVarianceColor(v2Var)}`}>{v2Var > 0 ? '+' : ''}{v2Var.toFixed(1)}%</span>
                        <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black border ${getVarianceColor(v3Var)}`}>{v3Var > 0 ? '+' : ''}{v3Var.toFixed(1)}%</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Total Bid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: 'Al Faris', value: '4,250,000', var: '+2.4%', status: 'Within Budget', color: 'emerald' },
            { name: 'Gulf Tech', value: '3,890,000', var: '-6.3%', status: 'Abnormally Low', color: 'amber', warning: 'Risk of scope compromise' },
            { name: 'Arabian', value: '4,780,000', var: '+14.9%', status: 'Over Budget', color: 'red' },
          ].map((card) => (
            <div key={card.name} className={`bg-white p-8 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden group`}>
              <div className={`absolute left-0 top-0 bottom-0 w-2 bg-${card.color}-500`} />
              <div className="flex justify-between items-start mb-6">
                <h4 className="font-bold text-slate-900">{card.name} Contracting</h4>
                <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-${card.color}-50 text-${card.color}-700 border border-${card.color}-100`}>
                  {card.status}
                </div>
              </div>
              <p className="text-3xl font-bold text-slate-900 mb-1">AED {card.value}</p>
              <p className={`text-sm font-bold text-${card.color}-500 mb-4`}>{card.var} vs estimate</p>
              {card.warning && (
                <div className="flex items-center gap-2 p-3 bg-amber-50 text-amber-700 rounded-xl text-xs font-medium border border-amber-100">
                  <AlertTriangle size={14} />
                  {card.warning}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* SECTION B — Commercial Terms Deviation */}
      <section className="space-y-6">
        <h3 className="text-xl font-bold text-slate-900 flex items-center gap-3">
          <div className="w-2 h-8 bg-blue-500 rounded-full" />
          Commercial Terms Deviation
        </h3>
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Term</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">RFQ Requirement</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Al Faris</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Gulf Tech</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Arabian</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider text-right">Severity</th>
              </tr>
            </thead>
            <tbody>
              {COMMERCIAL_TERMS.map((term) => (
                <tr key={term.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-5 text-sm font-bold text-slate-900">{term.term}</td>
                  <td className="px-6 py-5 text-sm text-slate-500 italic">{term.requirement}</td>
                  <td className="px-6 py-5 text-sm text-slate-600">{term.vendors.v1.value}</td>
                  <td className="px-6 py-5 text-sm text-slate-600">{term.vendors.v2.value}</td>
                  <td className="px-6 py-5 text-sm text-slate-600">{term.vendors.v3.value}</td>
                  <td className="px-6 py-5 text-right">
                    <div className="flex items-center justify-end gap-1">
                      {[term.vendors.v1, term.vendors.v2, term.vendors.v3].map((v, i) => (
                        <button 
                          key={i}
                          onClick={() => setShowDrawer({ term: term.term, vendor: i === 0 ? 'Al Faris' : i === 1 ? 'Gulf Tech' : 'Arabian', severity: v.severity, value: v.value })}
                          className={`px-2 py-1 rounded-lg text-[10px] font-bold border ${getSeverityColor(v.severity)} hover:scale-110 transition-transform`}
                        >
                          {v.severity}
                        </button>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* SECTION C & D — Technical Scorecards & Radar */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <section className="space-y-6">
          <h3 className="text-xl font-bold text-slate-900 flex items-center gap-3">
            <div className="w-2 h-8 bg-indigo-500 rounded-full" />
            Technical Compliance Scorecards
          </h3>
          <div className="space-y-4">
            {TECHNICAL_SCORES.map((score) => {
              const vendor = VENDOR_SUBMISSIONS.find(v => v.id === score.vendorId);
              return (
                <div key={score.vendorId} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-8 group hover:border-indigo-200 transition-all">
                  <div className="relative w-24 h-24 flex-shrink-0">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-100" />
                      <motion.circle 
                        initial={{ strokeDasharray: "0 251" }}
                        animate={{ strokeDasharray: `${(score.overall / 100) * 251} 251` }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-indigo-500" 
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xl font-bold text-slate-900">{score.overall}%</span>
                    </div>
                  </div>
                  <div className="flex-1 space-y-4">
                    <div className="flex justify-between items-center">
                      <h4 className="font-bold text-slate-900">{vendor?.name}</h4>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Overall Score</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase">
                          <span>Mandatory</span>
                          <span>{score.mandatory.met}/{score.mandatory.total}</span>
                        </div>
                        <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-500" style={{ width: `${(score.mandatory.met / score.mandatory.total) * 100}%` }} />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase">
                          <span>Preferred</span>
                          <span>{score.preferred.met}/{score.preferred.total}</span>
                        </div>
                        <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-indigo-500" style={{ width: `${(score.preferred.met / score.preferred.total) * 100}%` }} />
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {score.deviations.map((dev, i) => (
                        <div key={i} className="px-2 py-1 bg-slate-50 text-slate-600 rounded-lg text-[10px] font-medium border border-slate-100 cursor-help hover:bg-slate-100 transition-colors">
                          {dev.label}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="space-y-6">
          <h3 className="text-xl font-bold text-slate-900 flex items-center gap-3">
            <div className="w-2 h-8 bg-purple-500 rounded-full" />
            Vendor Comparison Radar
          </h3>
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsRadarChart data={radarData}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 10, fontWeight: 600 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <RadarChart name="Al Faris" dataKey="v1" stroke="#10b981" fill="#10b981" fillOpacity={0.4} />
                <RadarChart name="Gulf Tech" dataKey="v2" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.4} />
                <RadarChart name="Arabian" dataKey="v3" stroke="#f43f5e" fill="#f43f5e" fillOpacity={0.4} />
                <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
              </RechartsRadarChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>

      {/* SECTION E — Recommendation Banner */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-gradient-to-r from-emerald-600 to-emerald-500 p-12 rounded-[3rem] text-white shadow-2xl relative overflow-hidden"
      >
        <div className="absolute right-[-10%] top-[-20%] w-[40%] h-[150%] bg-white/10 blur-3xl rounded-full rotate-12" />
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-widest">
              <CheckCircle2 size={16} />
              System Recommendation
            </div>
            <h2 className="text-5xl font-bold leading-tight">Al Faris Contracting</h2>
            <p className="text-emerald-50 text-lg leading-relaxed max-w-md">
              Recommended for award based on superior technical compliance and commercial alignment within approved budget parameters.
            </p>
            <div className="flex gap-4">
              <button className="px-8 py-4 bg-white text-emerald-600 rounded-2xl font-bold hover:bg-emerald-50 transition-all shadow-xl shadow-emerald-900/20">
                Generate Full Report
              </button>
              <button className="px-8 py-4 bg-emerald-700/30 backdrop-blur-md text-white border border-white/20 rounded-2xl font-bold hover:bg-emerald-700/50 transition-all">
                Download Analysis Data
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Commercial', val: 'Within budget, rates aligned' },
              { label: 'Technical', val: 'Highest compliance (91%)' },
              { label: 'Terms', val: 'Advance payment negotiable' },
              { label: 'Risk', val: 'Low overall risk profile' },
            ].map((item) => (
              <div key={item.label} className="p-6 bg-white/10 backdrop-blur-md rounded-3xl border border-white/10">
                <p className="text-[10px] font-bold text-emerald-200 uppercase tracking-widest mb-2">{item.label}</p>
                <p className="text-sm font-bold">{item.val}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Side Drawer for Severity */}
      <AnimatePresence>
        {showDrawer && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowDrawer(null)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60]"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="fixed right-0 top-0 bottom-0 w-96 bg-white shadow-2xl z-[70] p-8"
            >
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-bold text-slate-900">Deviation Analysis</h3>
                <button onClick={() => setShowDrawer(null)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                  <ArrowRight size={20} />
                </button>
              </div>
              <div className="space-y-8">
                <div className="space-y-2">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Vendor</p>
                  <p className="text-lg font-bold text-slate-900">{showDrawer.vendor}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Term</p>
                  <p className="text-lg font-bold text-slate-900">{showDrawer.term}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Proposed Value</p>
                  <p className="text-lg font-bold text-slate-900">{showDrawer.value}</p>
                </div>
                <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 space-y-4">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${getSeverityColor(showDrawer.severity)}`} />
                    <span className="text-xs font-bold uppercase tracking-widest">{showDrawer.severity} Risk</span>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {showDrawer.severity === 'Critical' 
                      ? 'This deviation significantly impacts the project timeline or legal standing. Immediate negotiation or disqualification review is required.' 
                      : showDrawer.severity === 'Minor' 
                      ? 'This deviation is outside standard parameters but manageable through post-bid negotiation. No immediate risk to project viability.'
                      : 'Proposed term is fully compliant with RFQ requirements.'}
                  </p>
                </div>
                <button className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-2">
                  Flag for Clarification
                  <MessageSquare size={18} />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

