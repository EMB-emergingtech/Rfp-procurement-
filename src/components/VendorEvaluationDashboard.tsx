import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Download, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  ShieldCheck, 
  Zap,
  TrendingUp,
  TrendingDown,
  Info,
  ChevronRight,
  MoreVertical,
  Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Cell
} from 'recharts';
import { 
  VENDOR_SUBMISSIONS, 
  TECHNICAL_SCORES, 
  BOQ_ITEMS, 
  COMMERCIAL_TERMS 
} from '../constants';

interface VendorEvaluationDashboardProps {
  vendorId: string;
  projectId: string;
  onBack: () => void;
  onVendorChange: (vendorId: string) => void;
}

export default function VendorEvaluationDashboard({ 
  vendorId, 
  projectId, 
  onBack,
  onVendorChange 
}: VendorEvaluationDashboardProps) {
  const [activeTab, setActiveTab] = useState('All Items');
  const [isSending, setIsSending] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const activeVendor = VENDOR_SUBMISSIONS.find(v => v.id === vendorId)!;
  const activeScore = TECHNICAL_SCORES.find(s => s.vendorId === vendorId)!;

  // Mock data for charts based on vendor
  const bidData = [
    { name: 'Total Bid', v1: 4250000, v2: 3890000, v3: 4780000 },
    { name: 'Estimate', v1: 4150000, v2: 4150000, v3: 4150000 },
    { name: 'Budget', v1: 4500000, v2: 4500000, v3: 4500000 },
  ];

  const radarData = [
    { subject: 'Technical Score', v1: 91, v2: 73, v3: 86, fullMark: 100 },
    { subject: 'Commercial Score', v1: 87, v2: 95, v3: 70, fullMark: 100 },
    { subject: 'RFQ Alignment', v1: 94, v2: 61, v3: 88, fullMark: 100 },
    { subject: 'Terms Compliance', v1: 80, v2: 65, v3: 90, fullMark: 100 },
    { subject: 'Risk Rating', v1: 90, v2: 40, v3: 75, fullMark: 100 },
  ];

  const alignmentData = [
    { name: 'Al Faris', scope: 96, docs: 100, commercial: 91, technical: 94, overall: 94 },
    { name: 'Gulf Tech', scope: 71, docs: 50, commercial: 58, technical: 63, overall: 61 },
    { name: 'Arabian', scope: 90, docs: 100, commercial: 85, technical: 88, overall: 88 },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical': return 'bg-red-100 text-red-700 border-red-200';
      case 'Minor': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'Compliant': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const getKPIColor = (label: string, value: string | number) => {
    if (label === 'Overall Score') return 'text-brand-500';
    if (label === 'Risk') return value === 'Low' ? 'text-emerald-500' : 'text-brand-500';
    const num = typeof value === 'string' ? parseInt(value) : value;
    if (num >= 90) return 'text-emerald-500';
    if (num >= 80) return 'text-brand-500';
    return 'text-red-500';
  };

  const getKPIProgressColor = (label: string, value: string | number) => {
    if (label === 'Overall Score') return 'bg-brand-500';
    if (label === 'Risk') return 'bg-emerald-500';
    const num = typeof value === 'string' ? parseInt(value) : value;
    if (num >= 90) return 'bg-emerald-500';
    if (num >= 80) return 'bg-brand-500';
    return 'bg-red-500';
  };

  return (
    <div className="h-full flex flex-col bg-[#F8FAFC] overflow-hidden font-sans">
      {/* Top Bar / Breadcrumb */}
      <div className="px-8 py-4 bg-white/80 backdrop-blur-md border-b border-slate-200/60 flex items-center justify-between flex-shrink-0 sticky top-0 z-30">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500">
            <ArrowLeft size={20} />
          </button>
          <div className="flex flex-col">
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              <span>Home</span>
              <ChevronRight size={10} />
              <span>Al Wasl Pipeline Extension</span>
              <ChevronRight size={10} />
              <span>Project Report</span>
              <ChevronRight size={10} />
              <span className="text-brand-500">{activeVendor.name}</span>
            </div>
            <h1 className="text-lg font-black text-slate-900 tracking-tight">Vendor Evaluation Dashboard</h1>
          </div>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => { setIsSending(true); setTimeout(() => setIsSending(false), 1500); }}
            className="px-4 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center gap-2 shadow-sm"
          >
            {isSending ? <Loader2 className="animate-spin" size={14} /> : <Send size={14} />}
            Send Report to Admin
          </button>
          <button 
            onClick={() => { setIsDownloading(true); setTimeout(() => setIsDownloading(false), 1500); }}
            className="px-4 py-2.5 bg-slate-900 text-white rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all flex items-center gap-2 shadow-lg shadow-slate-900/20"
          >
            {isDownloading ? <Loader2 className="animate-spin" size={14} /> : <Download size={14} />}
            Download PDF
          </button>
        </div>
      </div>

      {/* Vendor Tabs */}
      <div className="px-8 py-3 bg-white border-b border-slate-200/60 flex-shrink-0 shadow-sm">
        <div className="flex bg-slate-100 p-1 rounded-2xl w-full">
          {VENDOR_SUBMISSIONS.slice(0, 3).map((v) => (
            <button
              key={v.id}
              onClick={() => onVendorChange(v.id)}
              className={`flex-1 py-3 px-4 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${vendorId === v.id ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/20' : 'text-slate-500 hover:text-slate-700'}`}
            >
              {v.name}
              {v.id === 'v1' && (
                <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-tighter ${vendorId === v.id ? 'bg-white text-brand-600' : 'bg-brand-500 text-white'}`}>
                  Recommended
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Dashboard Grid */}
      <div className="flex-1 p-6 overflow-hidden grid grid-cols-12 grid-rows-[auto_1fr_1fr_1fr] gap-4">
        
        {/* ROW 1 — Vendor Scorecard */}
        <div className="col-span-12 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-12 flex-1">
            {[
              { label: 'Overall Score', value: vendorId === 'v1' ? '89 / 100' : vendorId === 'v2' ? '61 / 100' : '74 / 100', progress: vendorId === 'v1' ? 89 : vendorId === 'v2' ? 61 : 74 },
              { label: 'RFQ Alignment', value: `${activeVendor.alignmentScore}%`, progress: activeVendor.alignmentScore },
              { label: 'Technical', value: `${activeScore.overall}%`, progress: activeScore.overall },
              { label: 'Commercial', value: vendorId === 'v1' ? '87%' : vendorId === 'v2' ? '95%' : '70%', progress: vendorId === 'v1' ? 87 : vendorId === 'v2' ? 95 : 70 },
              { label: 'Risk', value: vendorId === 'v1' ? 'Low' : vendorId === 'v2' ? 'High' : 'Medium', progress: vendorId === 'v1' ? 90 : vendorId === 'v2' ? 30 : 60 },
            ].map((kpi) => (
              <div key={kpi.label} className="flex-1 space-y-2">
                <div className="flex justify-between items-end">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{kpi.label}</span>
                  <span className={`text-sm font-bold ${getKPIColor(kpi.label, kpi.value)}`}>{kpi.value}</span>
                </div>
                <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full ${getKPIProgressColor(kpi.label, kpi.value)}`} style={{ width: `${kpi.progress}%` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="ml-12 pl-12 border-l border-slate-100">
            <span className={`text-lg font-black uppercase tracking-tighter ${vendorId === 'v1' ? 'text-amber-500' : 'text-slate-300'}`}>
              {vendorId === 'v1' ? 'Recommended for Award' : 'Not Recommended'}
            </span>
          </div>
        </div>

        {/* ROW 2 */}
        {/* CARD A — Total Bid vs Benchmark */}
        <div className="col-span-4 bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col min-h-0">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest mb-4">Total Bid vs Benchmark</h3>
          <div className="flex-1 min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={bidData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                <YAxis hide />
                <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                <Bar dataKey="v1" radius={[4, 4, 0, 0]}>
                  {bidData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={vendorId === 'v1' ? '#f59e0b' : '#e2e8f0'} />
                  ))}
                </Bar>
                <Bar dataKey="v2" radius={[4, 4, 0, 0]}>
                  {bidData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={vendorId === 'v2' ? '#f59e0b' : '#e2e8f0'} />
                  ))}
                </Bar>
                <Bar dataKey="v3" radius={[4, 4, 0, 0]}>
                  {bidData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={vendorId === 'v3' ? '#f59e0b' : '#e2e8f0'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex gap-2 mt-4">
            {[
              { label: 'vs Estimate', val: vendorId === 'v1' ? '+2.4%' : vendorId === 'v2' ? '-6.3%' : '+14.9%' },
              { label: 'vs Budget', val: vendorId === 'v1' ? '-5.6%' : vendorId === 'v2' ? '-13.5%' : '+6.2%' },
              { label: 'Status', val: vendorId === 'v3' ? 'Over Budget' : 'Within Budget' },
            ].map((pill) => (
              <div key={pill.label} className="flex-1 px-2 py-1.5 bg-slate-50 rounded-lg border border-slate-100 text-center">
                <p className="text-[8px] font-bold text-slate-400 uppercase">{pill.label}</p>
                <p className="text-[10px] font-bold text-slate-900">{pill.val}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CARD B — Technical vs Commercial Score */}
        <div className="col-span-4 bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col min-h-0">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest mb-4">Technical vs Commercial Score</h3>
          <div className="flex-1 min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="#f1f5f9" />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 8, fill: '#64748b', fontWeight: 600 }} />
                <Radar name="Al Faris" dataKey="v1" stroke="#f59e0b" fill="#f59e0b" fillOpacity={vendorId === 'v1' ? 0.4 : 0.1} strokeWidth={vendorId === 'v1' ? 2 : 1} />
                <Radar name="Gulf Tech" dataKey="v2" stroke="#3b82f6" fill="#3b82f6" fillOpacity={vendorId === 'v2' ? 0.4 : 0.1} strokeWidth={vendorId === 'v2' ? 2 : 1} />
                <Radar name="Arabian" dataKey="v3" stroke="#94a3b8" fill="#94a3b8" fillOpacity={vendorId === 'v3' ? 0.4 : 0.1} strokeWidth={vendorId === 'v3' ? 2 : 1} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: 10, paddingTop: 10 }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* CARD C — RFQ Alignment Breakdown */}
        <div className="col-span-4 bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col min-h-0">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest mb-4">RFQ Alignment Breakdown</h3>
          <div className="space-y-4 flex-1 overflow-y-auto pr-2">
            {alignmentData.map((item, idx) => {
              const vId = idx === 0 ? 'v1' : idx === 1 ? 'v2' : 'v3';
              const isActive = vendorId === vId;
              return (
                <div key={item.name} className={`p-3 rounded-xl border transition-all ${isActive ? 'bg-amber-50 border-amber-200' : 'bg-slate-50 border-slate-100 opacity-60'}`}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] font-bold text-slate-900 uppercase">{item.name}</span>
                    <span className="text-xs font-black text-slate-900">{item.overall}%</span>
                  </div>
                  <div className="flex h-1.5 rounded-full overflow-hidden gap-0.5">
                    <div className="bg-emerald-500" style={{ width: `${item.scope / 4}%` }} />
                    <div className="bg-blue-500" style={{ width: `${item.docs / 4}%` }} />
                    <div className="bg-indigo-500" style={{ width: `${item.commercial / 4}%` }} />
                    <div className="bg-purple-500" style={{ width: `${item.technical / 4}%` }} />
                  </div>
                  <div className="flex justify-between mt-1.5">
                    <span className="text-[8px] text-slate-400 font-bold">S: {item.scope}%</span>
                    <span className="text-[8px] text-slate-400 font-bold">D: {item.docs}%</span>
                    <span className="text-[8px] text-slate-400 font-bold">C: {item.commercial}%</span>
                    <span className="text-[8px] text-slate-400 font-bold">T: {item.technical}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ROW 3 */}
        {/* CARD D — BoQ Rate Comparison */}
        <div className="col-span-7 bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col min-h-0">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest">BoQ Rate Comparison</h3>
            <div className="flex bg-slate-100 p-0.5 rounded-lg">
              <button onClick={() => setActiveTab('All Items')} className={`px-3 py-1 rounded-md text-[10px] font-bold transition-all ${activeTab === 'All Items' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400'}`}>All Items</button>
              <button onClick={() => setActiveTab('Flagged Only')} className={`px-3 py-1 rounded-md text-[10px] font-bold transition-all ${activeTab === 'Flagged Only' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400'}`}>Flagged Only</button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto pr-2">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="pb-2 text-[9px] font-bold text-slate-400 uppercase">Line Item</th>
                  <th className={`pb-2 text-[9px] font-bold uppercase text-center ${vendorId === 'v1' ? 'text-amber-600' : 'text-slate-400'}`}>Al Faris</th>
                  <th className={`pb-2 text-[9px] font-bold uppercase text-center ${vendorId === 'v2' ? 'text-amber-600' : 'text-slate-400'}`}>Gulf Tech</th>
                  <th className={`pb-2 text-[9px] font-bold uppercase text-center ${vendorId === 'v3' ? 'text-amber-600' : 'text-slate-400'}`}>Arabian</th>
                  <th className="pb-2 text-[9px] font-bold text-slate-400 uppercase text-center">Estimate</th>
                  <th className="pb-2 text-[9px] font-bold text-slate-400 uppercase text-right">Variance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {BOQ_ITEMS.map((item) => {
                  const activeRate = item.vendors[vendorId as keyof typeof item.vendors];
                  const variance = ((activeRate - item.estimateRate) / item.estimateRate) * 100;
                  return (
                    <tr key={item.id} className="group hover:bg-slate-50/50 transition-colors">
                      <td className="py-2.5 text-[11px] font-bold text-slate-900">{item.description}</td>
                      <td className={`py-2.5 text-[11px] text-center ${vendorId === 'v1' ? 'bg-amber-50/50 font-bold text-amber-600' : 'text-slate-600'}`}>{item.vendors.v1.toLocaleString()}</td>
                      <td className={`py-2.5 text-[11px] text-center ${vendorId === 'v2' ? 'bg-amber-50/50 font-bold text-amber-600' : 'text-slate-600'}`}>{item.vendors.v2.toLocaleString()}</td>
                      <td className={`py-2.5 text-[11px] text-center ${vendorId === 'v3' ? 'bg-amber-50/50 font-bold text-amber-600' : 'text-slate-600'}`}>{item.vendors.v3.toLocaleString()}</td>
                      <td className="py-2.5 text-[11px] text-center text-slate-400">{item.estimateRate.toLocaleString()}</td>
                      <td className="py-2.5 text-right">
                        <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${variance > 10 ? 'bg-red-50 text-red-600' : variance < -5 ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'}`}>
                          {variance > 0 ? '+' : ''}{variance.toFixed(1)}%
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* CARD E — Commercial Terms */}
        <div className="col-span-5 bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col min-h-0">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest mb-4">Commercial Terms</h3>
          <div className="flex-1 overflow-y-auto pr-2">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="pb-2 text-[9px] font-bold text-slate-400 uppercase">Term</th>
                  <th className="pb-2 text-[9px] font-bold text-slate-400 uppercase">Required</th>
                  <th className="pb-2 text-[9px] font-bold text-amber-600 uppercase">Active Vendor</th>
                  <th className="pb-2 text-[9px] font-bold text-slate-400 uppercase text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {COMMERCIAL_TERMS.map((term) => {
                  const vTerm = term.vendors[vendorId as keyof typeof term.vendors];
                  return (
                    <tr key={term.id}>
                      <td className="py-3 text-[11px] font-bold text-slate-900">{term.term}</td>
                      <td className="py-3 text-[11px] text-slate-500 italic">{term.requirement}</td>
                      <td className="py-3 text-[11px] font-bold text-slate-900">{vTerm.value}</td>
                      <td className="py-3 text-right">
                        <span className={`px-2 py-1 rounded-lg text-[9px] font-bold border ${getSeverityColor(vTerm.severity)}`}>
                          {vTerm.severity === 'Compliant' ? 'Compliant' : `${vTerm.severity} Deviation`}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* ROW 4 */}
        {/* CARD F — Technical Compliance */}
        <div className="col-span-4 bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col min-h-0">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest mb-4">Technical Compliance</h3>
          <div className="flex gap-2 mb-4">
            {TECHNICAL_SCORES.map((score) => {
              const v = VENDOR_SUBMISSIONS.find(vs => vs.id === score.vendorId)!;
              const isActive = vendorId === score.vendorId;
              return (
                <div key={score.vendorId} className={`flex-1 p-2 rounded-xl border transition-all ${isActive ? 'bg-amber-50 border-amber-400 ring-2 ring-amber-100' : 'bg-slate-50 border-slate-100 opacity-60'}`}>
                  <p className="text-[8px] font-bold text-slate-500 uppercase truncate">{v.name}</p>
                  <p className="text-sm font-black text-slate-900 mb-1">{score.overall}%</p>
                  <div className="space-y-1">
                    <div className="h-1 bg-white rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500" style={{ width: `${(score.mandatory.met / score.mandatory.total) * 100}%` }} />
                    </div>
                    <div className="h-1 bg-white rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500" style={{ width: `${(score.preferred.met / score.preferred.total) * 100}%` }} />
                    </div>
                  </div>
                  <div className="flex justify-between mt-1 text-[7px] font-bold text-slate-400">
                    <span>M: {score.mandatory.met}/10</span>
                    <span>P: {score.preferred.met}/9</span>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex-1 overflow-y-auto bg-slate-50 p-3 rounded-xl border border-slate-100">
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-2">Active Deviations</p>
            {activeScore.deviations.length > 0 ? (
              <div className="space-y-2">
                {activeScore.deviations.map((dev, i) => (
                  <div key={i} className="p-2 bg-white rounded-lg border border-slate-200">
                    <p className="text-[10px] font-bold text-slate-900 mb-1">Deviation: {dev.label}</p>
                    <p className="text-[9px] text-slate-500 leading-tight mb-2">{dev.detail.split('|')[1]?.trim()}</p>
                    <span className="text-[8px] font-bold text-amber-600 uppercase bg-amber-50 px-1.5 py-0.5 rounded">Engineer Review Required</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-slate-300 italic text-[10px]">No deviations recorded</div>
            )}
          </div>
        </div>

        {/* CARD G — Risk Matrix */}
        <div className="col-span-4 bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col min-h-0">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest mb-4">Risk Matrix</h3>
          <div className="flex-1 min-h-0 bg-slate-50 rounded-xl border border-slate-100 relative p-4">
            <div className="absolute inset-0 flex flex-col">
              <div className="flex-1 border-b border-slate-200" />
              <div className="flex-1" />
            </div>
            <div className="absolute inset-0 flex">
              <div className="flex-1 border-r border-slate-200" />
              <div className="flex-1" />
            </div>
            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[7px] font-bold text-slate-400 uppercase tracking-widest">Likelihood</div>
            <div className="absolute left-1 top-1/2 -translate-y-1/2 -rotate-90 text-[7px] font-bold text-slate-400 uppercase tracking-widest">Impact</div>
            
            {/* Plotted items */}
            {[
              { id: 'v1-1', label: 'Adv. Pay', x: 20, y: 20, v: 'v1' },
              { id: 'v1-2', label: 'Tech Sub', x: 40, y: 30, v: 'v1' },
              { id: 'v1-3', label: 'Insurance', x: 60, y: 10, v: 'v1', resolved: true },
              { id: 'v2-1', label: 'Retention', x: 80, y: 70, v: 'v2' },
              { id: 'v2-2', label: 'Validity', x: 30, y: 80, v: 'v2' },
              { id: 'v2-3', label: 'Pricing', x: 70, y: 80, v: 'v2' },
              { id: 'v3-1', label: 'Budget', x: 90, y: 90, v: 'v3' },
              { id: 'v3-2', label: 'Warranty', x: 20, y: 20, v: 'v3' },
            ].map((risk) => (
              <motion.div
                key={risk.id}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className={`absolute w-2 h-2 rounded-full cursor-help ${risk.v === vendorId ? 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]' : 'bg-slate-300'}`}
                style={{ left: `${risk.x}%`, bottom: `${risk.y}%` }}
              >
                <div className="absolute top-full mt-1 left-1/2 -translate-x-1/2 whitespace-nowrap text-[6px] font-bold text-slate-500">{risk.label}</div>
              </motion.div>
            ))}
          </div>
          <div className="flex justify-between mt-4">
            <div className="flex gap-4">
              <div className="text-center">
                <p className="text-[8px] font-bold text-slate-400 uppercase">Critical</p>
                <p className="text-xs font-black text-red-500">{vendorId === 'v2' ? 2 : vendorId === 'v3' ? 1 : 0}</p>
              </div>
              <div className="text-center">
                <p className="text-[8px] font-bold text-slate-400 uppercase">Minor</p>
                <p className="text-xs font-black text-amber-500">{vendorId === 'v1' ? 2 : 1}</p>
              </div>
              <div className="text-center">
                <p className="text-[8px] font-bold text-slate-400 uppercase">Resolved</p>
                <p className="text-xs font-black text-emerald-500">{vendorId === 'v1' ? 1 : 0}</p>
              </div>
            </div>
          </div>
        </div>

        {/* CARD H — Recommendation */}
        <div className={`col-span-4 p-5 rounded-2xl border shadow-xl flex flex-col min-h-0 relative overflow-hidden ${vendorId === 'v1' ? 'bg-amber-500 border-amber-600 text-white' : 'bg-white border-slate-100 text-slate-900'}`}>
          {vendorId === 'v1' && <div className="absolute right-[-10%] top-[-10%] w-32 h-32 bg-white/10 rounded-full blur-2xl" />}
          
          <div className="flex justify-between items-start mb-4 relative z-10">
            <h3 className="text-sm font-black uppercase tracking-tighter">{vendorId === 'v1' ? 'Recommended for Award' : 'Not Recommended'}</h3>
            <div className="w-12 h-12 relative">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="4" fill="transparent" className={vendorId === 'v1' ? 'text-amber-600' : 'text-slate-100'} />
                <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="4" fill="transparent" className={vendorId === 'v1' ? 'text-white' : 'text-amber-500'} style={{ strokeDasharray: `${(activeScore.overall / 100) * 126} 126` }} />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-[10px] font-black">{activeScore.overall}</div>
            </div>
          </div>

          <div className="space-y-2 mb-6 relative z-10">
            {[
              { label: 'Technical', val: vendorId === 'v1' ? 'Highest compliance across all vendors' : 'Lower compliance than leading bidder' },
              { label: 'Commercial', val: vendorId === 'v1' ? 'Within budget, rates aligned' : 'Rates significantly higher than estimate' },
              { label: 'Risk', val: vendorId === 'v1' ? 'Low — one minor term for negotiation' : 'High risk profile detected' },
            ].map((bullet, i) => (
              <div key={i} className="flex gap-2 items-start">
                <div className={`w-1.5 h-1.5 rounded-full mt-1 flex-shrink-0 ${vendorId === 'v1' ? 'bg-white' : 'bg-amber-500'}`} />
                <p className="text-[10px] leading-tight font-medium opacity-90">{bullet.val}</p>
              </div>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto mb-4 relative z-10">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className={vendorId === 'v1' ? 'border-b border-white/20' : 'border-b border-slate-100'}>
                  <th className="pb-1 text-[8px] font-bold uppercase opacity-60">Vendor</th>
                  <th className="pb-1 text-[8px] font-bold uppercase opacity-60 text-center">Rank</th>
                  <th className="pb-1 text-[8px] font-bold uppercase opacity-60 text-right">Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {[
                  { name: 'Al Faris', rank: '1st', score: 89, id: 'v1' },
                  { name: 'Arabian', rank: '2nd', score: 74, id: 'v3' },
                  { name: 'Gulf Tech', rank: '3rd', score: 61, id: 'v2' },
                ].map((row) => (
                  <tr key={row.id} className={row.id === vendorId ? 'font-black' : 'opacity-60'}>
                    <td className="py-1.5 text-[10px]">{row.name}</td>
                    <td className="py-1.5 text-[10px] text-center">{row.rank}</td>
                    <td className="py-1.5 text-[10px] text-right">{row.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button className={`w-full py-3 rounded-xl font-bold text-xs transition-all relative z-10 ${vendorId === 'v1' ? 'bg-white text-amber-600 hover:bg-amber-50' : 'bg-amber-500 text-white hover:bg-amber-600'}`}>
            Send Report to Admin
          </button>
        </div>

      </div>
    </div>
  );
}
