import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Download, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck, 
  Zap,
  TrendingUp,
  Info,
  ChevronRight,
  Loader2,
  MoreVertical
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
  Cell,
  ReferenceLine
} from 'recharts';
import { 
  VENDOR_SUBMISSIONS, 
  TECHNICAL_SCORES, 
  BOQ_ITEMS, 
  COMMERCIAL_TERMS 
} from '../constants';

interface ProjectEvaluationDashboardProps {
  onBack: () => void;
  onViewVendor: (vendorId: string) => void;
}

export default function ProjectEvaluationDashboard({ onBack, onViewVendor }: ProjectEvaluationDashboardProps) {
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [activeBoQTab, setActiveBoQTab] = useState('All Items');

  const handleSend = () => {
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setIsSent(true);
      setTimeout(() => setIsSent(false), 3000);
    }, 1500);
  };

  const handleDownload = () => {
    setIsDownloading(true);
    setTimeout(() => setIsDownloading(false), 1500);
  };

  const bidVsBenchmarkData = [
    { name: 'Al Faris', value: 4250000, color: '#f59e0b' },
    { name: 'Gulf Tech', value: 3890000, color: '#3b82f6' },
    { name: 'Arabian', value: 4780000, color: '#94a3b8' },
    { name: 'Estimate', value: 4150000, color: '#64748b', isRef: true },
    { name: 'Budget', value: 4500000, color: '#10b981', isRef: true },
  ];

  const radarData = [
    { subject: 'Technical Score', v1: 91, v2: 73, v3: 86, fullMark: 100 },
    { subject: 'Commercial Score', v1: 87, v2: 95, v3: 70, fullMark: 100 },
    { subject: 'RFQ Alignment', v1: 94, v2: 61, v3: 88, fullMark: 100 },
    { subject: 'Terms Compliance', v1: 80, v2: 65, v3: 90, fullMark: 100 },
    { subject: 'Risk Rating', v1: 90, v2: 40, v3: 75, fullMark: 100 },
  ];

  const alignmentBreakdown = [
    { name: 'Al Faris', scope: 96, docs: 100, commercial: 91, technical: 94, total: 94 },
    { name: 'Gulf Tech', scope: 71, docs: 50, commercial: 58, technical: 63, total: 61 },
    { name: 'Arabian', scope: 90, docs: 100, commercial: 85, technical: 88, total: 88 },
  ];

  const risks = [
    { id: 1, label: 'Adv. Payment', x: 20, y: 20, v: 'v1', vendor: 'Al Faris', type: 'Minor' },
    { id: 2, label: 'Tech Sub', x: 40, y: 30, v: 'v1', vendor: 'Al Faris', type: 'Minor' },
    { id: 3, label: 'Insurance Gap', x: 60, y: 10, v: 'v1', vendor: 'Al Faris', type: 'Resolved' },
    { id: 4, label: 'Retention', x: 80, y: 70, v: 'v2', vendor: 'Gulf Tech', type: 'Critical' },
    { id: 5, label: 'Validity Short', x: 30, y: 80, v: 'v2', vendor: 'Gulf Tech', type: 'Critical' },
    { id: 6, label: 'Low Pricing', x: 70, y: 80, v: 'v2', vendor: 'Gulf Tech', type: 'Critical' },
    { id: 7, label: 'Over Budget', x: 90, y: 90, v: 'v3', vendor: 'Arabian', type: 'Critical' },
    { id: 8, label: 'Warranty Dev', x: 20, y: 20, v: 'v3', vendor: 'Arabian', type: 'Minor' },
  ];

  const deviations = [
    { vendor: 'Al Faris', item: 'Flange', spec: 'BS 10', prop: 'ASME B16.5', class: 'Acceptable' },
    { vendor: 'Gulf Tech', item: 'Coating', spec: 'ISO 21809', prop: 'Proprietary spec', class: 'Review Required' },
    { vendor: 'Arabian', item: 'Valve', spec: 'API 6D', prop: 'API 6A', class: 'Acceptable' },
  ];

  const getStatusColor = (status: string) => {
    if (status.includes('Within')) return 'bg-emerald-100 text-emerald-700 border-emerald-200';
    if (status.includes('Low')) return 'bg-amber-100 text-amber-700 border-amber-200';
    if (status.includes('Over')) return 'bg-red-100 text-red-700 border-red-200';
    return 'bg-slate-100 text-slate-700 border-slate-200';
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
              <span className="text-brand-500">Evaluation Report</span>
            </div>
            <h1 className="text-lg font-black text-slate-900 tracking-tight">Project Evaluation Dashboard</h1>
          </div>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handleSend}
            disabled={isSending}
            className="px-4 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center gap-2 shadow-sm"
          >
            {isSending ? <Loader2 className="animate-spin" size={14} /> : isSent ? <CheckCircle2 className="text-emerald-500" size={14} /> : <Send size={14} />}
            Send Report to Admin
          </button>
          <button 
            onClick={handleDownload}
            disabled={isDownloading}
            className="px-4 py-2.5 bg-slate-900 text-white rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all flex items-center gap-2 shadow-lg shadow-slate-900/20"
          >
            {isDownloading ? <Loader2 className="animate-spin" size={14} /> : <Download size={14} />}
            Download PDF
          </button>
        </div>
      </div>

      {/* Report Header */}
      <div className="px-8 py-5 bg-[#0F172A] text-white flex items-center justify-between flex-shrink-0 shadow-lg">
        <div className="flex gap-16">
          <div className="space-y-1">
            <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Project</p>
            <p className="text-sm font-black tracking-tight">Al Wasl Pipeline Extension</p>
          </div>
          <div className="space-y-1">
            <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">RFQ Reference</p>
            <p className="text-sm font-black tracking-tight">RFQ-2025-041</p>
          </div>
          <div className="space-y-1">
            <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Report Generated</p>
            <p className="text-sm font-black tracking-tight">16 Mar 2025 10:45</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="px-4 py-1.5 bg-white/5 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/10">
            Vendors Evaluated: <span className="text-brand-400">3 of 4</span>
          </div>
          <span className="text-[10px] text-slate-500 italic font-medium">Nasser Engineering excluded (late)</span>
        </div>
      </div>

      {/* Main Content Scrollable */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        
        {/* ROW 1 — Vendor Scorecards */}
        <div className="grid grid-cols-3 gap-6">
          {[
            { id: 'v1', name: 'Al Faris Contracting', bid: '4,250,000', score: 89, alignment: 94, tech: 91, comm: 87, risk: 'Low', status: 'Within Budget', recommended: true },
            { id: 'v2', name: 'Gulf Tech Solutions', bid: '3,890,000', score: 61, alignment: 61, tech: 73, comm: 95, risk: 'High', status: 'Abnormally Low — Flagged', recommended: false },
            { id: 'v3', name: 'Arabian Industrial Co', bid: '4,780,000', score: 74, alignment: 88, tech: 86, comm: 70, risk: 'Medium', status: 'Over Budget', recommended: false },
          ].map((vendor) => (
            <motion.div 
              key={vendor.id}
              whileHover={{ y: -8, shadow: "0 20px 25px -5px rgb(0 0 0 / 0.05), 0 8px 10px -6px rgb(0 0 0 / 0.05)" }}
              onClick={() => onViewVendor(vendor.id)}
              className={`bg-white p-6 rounded-3xl border shadow-sm cursor-pointer transition-all relative overflow-hidden flex flex-col ${vendor.recommended ? 'border-brand-400 ring-2 ring-brand-100' : 'border-slate-200/60'}`}
            >
              {vendor.recommended && (
                <div className="absolute top-0 right-0 px-4 py-1.5 bg-brand-500 text-white text-[10px] font-black uppercase tracking-widest rounded-bl-2xl shadow-lg">
                  Recommended
                </div>
              )}
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h3 className="text-lg font-black text-slate-900 tracking-tight">{vendor.name}</h3>
                  <p className="text-2xl font-black text-slate-900 mt-1 tracking-tighter">AED {vendor.bid}</p>
                </div>
                <div className="relative w-16 h-16">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="5" fill="transparent" className="text-slate-100" />
                    <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="5" fill="transparent" className={vendor.recommended ? 'text-brand-500' : 'text-slate-400'} style={{ strokeDasharray: `${(vendor.score / 100) * 176} 176` }} strokeLinecap="round" />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center text-xs font-black text-slate-900">{vendor.score}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-8">
                {[
                  { label: 'RFQ Alignment', val: `${vendor.alignment}%` },
                  { label: 'Technical Score', val: `${vendor.tech}%` },
                  { label: 'Commercial Score', val: `${vendor.comm}%` },
                  { label: 'Risk Rating', val: vendor.risk },
                ].map(item => (
                  <div key={item.label} className="space-y-1">
                    <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">{item.label}</p>
                    <p className="text-xs font-black text-slate-900">{item.val}</p>
                  </div>
                ))}
              </div>

              <div className={`w-full py-2.5 px-4 rounded-xl text-[10px] font-black text-center border uppercase tracking-widest ${getStatusColor(vendor.status)} shadow-sm`}>
                {vendor.status}
              </div>
            </motion.div>
          ))}
        </div>

        {/* ROW 2 */}
        <div className="grid grid-cols-3 gap-6">
          {/* CARD A — Total Bid vs Benchmark */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col h-[350px]">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest mb-6">Total Bid vs Benchmark</h3>
            <div className="flex-1 min-h-0">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={bidVsBenchmarkData} margin={{ top: 20, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#94a3b8', fontWeight: 600 }} />
                  <YAxis hide />
                  <Tooltip 
                    cursor={{ fill: '#f8fafc' }} 
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                    formatter={(value: number) => [`AED ${value.toLocaleString()}`, 'Value']}
                  />
                  <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                    {bidVsBenchmarkData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} fillOpacity={entry.isRef ? 0.3 : 1} />
                    ))}
                  </Bar>
                  <ReferenceLine y={4150000} stroke="#64748b" strokeDasharray="5 5" label={{ position: 'top', value: 'Estimate', fill: '#64748b', fontSize: 8, fontWeight: 700 }} />
                  <ReferenceLine y={4500000} stroke="#10b981" strokeDasharray="5 5" label={{ position: 'top', value: 'Budget', fill: '#10b981', fontSize: 8, fontWeight: 700 }} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* CARD B — Radar Chart — All Vendors */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col h-[350px]">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest mb-6">Radar Chart — All Vendors</h3>
            <div className="flex-1 min-h-0">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#f1f5f9" />
                  <PolarAngleAxis dataKey="subject" tick={{ fontSize: 8, fill: '#64748b', fontWeight: 600 }} />
                  <Radar name="Al Faris" dataKey="v1" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.4} />
                  <Radar name="Gulf Tech" dataKey="v2" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.4} />
                  <Radar name="Arabian" dataKey="v3" stroke="#94a3b8" fill="#94a3b8" fillOpacity={0.4} />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: 10, paddingTop: 20 }} />
                  <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* CARD C — RFQ Alignment Breakdown */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col h-[350px]">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest mb-6">RFQ Alignment Breakdown</h3>
            <div className="space-y-6 flex-1 overflow-y-auto pr-2">
              {alignmentBreakdown.map((item) => (
                <div key={item.name} className={`space-y-2 p-3 rounded-2xl border transition-all ${item.name === 'Al Faris' ? 'bg-amber-50 border-amber-200' : 'bg-slate-50 border-slate-100'}`}>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-slate-900 uppercase tracking-wider">{item.name}</span>
                    <span className="text-xs font-black text-slate-900">Total: {item.total}%</span>
                  </div>
                  <div className="flex h-2 rounded-full overflow-hidden gap-0.5">
                    <div className="bg-emerald-500" style={{ width: `${item.scope / 4}%` }} />
                    <div className="bg-blue-500" style={{ width: `${item.docs / 4}%` }} />
                    <div className="bg-indigo-500" style={{ width: `${item.commercial / 4}%` }} />
                    <div className="bg-purple-500" style={{ width: `${item.technical / 4}%` }} />
                  </div>
                  <div className="flex justify-between text-[7px] font-bold text-slate-400 uppercase tracking-tighter">
                    <span>Scope: {item.scope}%</span>
                    <span>Docs: {item.docs}%</span>
                    <span>Comm: {item.commercial}%</span>
                    <span>Tech: {item.technical}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ROW 3 */}
        <div className="grid grid-cols-12 gap-6">
          {/* CARD D — BoQ Rate Comparison */}
          <div className="col-span-7 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col h-[450px]">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest">BoQ Rate Comparison</h3>
              <div className="flex bg-slate-100 p-0.5 rounded-lg">
                <button onClick={() => setActiveBoQTab('All Items')} className={`px-3 py-1 rounded-md text-[10px] font-bold transition-all ${activeBoQTab === 'All Items' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400'}`}>All Items</button>
                <button onClick={() => setActiveBoQTab('Flagged Only')} className={`px-3 py-1 rounded-md text-[10px] font-bold transition-all ${activeBoQTab === 'Flagged Only' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400'}`}>Flagged Only</button>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto pr-2">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="pb-3 text-[9px] font-bold text-slate-400 uppercase tracking-wider">Line Item</th>
                    <th className="pb-3 text-[9px] font-bold text-amber-600 uppercase text-center">Al Faris</th>
                    <th className="pb-3 text-[9px] font-bold text-slate-400 uppercase text-center">Gulf Tech</th>
                    <th className="pb-3 text-[9px] font-bold text-slate-400 uppercase text-center">Arabian</th>
                    <th className="pb-3 text-[9px] font-bold text-slate-400 uppercase text-center">Estimate</th>
                    <th className="pb-3 text-[9px] font-bold text-slate-400 uppercase text-center">Lowest</th>
                    <th className="pb-3 text-[9px] font-bold text-slate-400 uppercase text-right">Variance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {BOQ_ITEMS.map((item) => {
                    const v1Var = ((item.vendors.v1 - item.estimateRate) / item.estimateRate) * 100;
                    const v2Var = ((item.vendors.v2 - item.estimateRate) / item.estimateRate) * 100;
                    const v3Var = ((item.vendors.v3 - item.estimateRate) / item.estimateRate) * 100;
                    const lowest = Math.min(item.vendors.v1, item.vendors.v2, item.vendors.v3);
                    const lowestVendor = item.vendors.v1 === lowest ? 'Al Faris' : item.vendors.v2 === lowest ? 'Gulf Tech' : 'Arabian';

                    return (
                      <tr key={item.id} className="group hover:bg-slate-50/50 transition-colors">
                        <td className="py-3 text-[11px] font-bold text-slate-900">{item.description}</td>
                        <td className={`py-3 text-[11px] text-center font-bold text-amber-600 bg-amber-50/30`}>{item.vendors.v1.toLocaleString()}</td>
                        <td className="py-3 text-[11px] text-center text-slate-600">{item.vendors.v2.toLocaleString()}</td>
                        <td className="py-3 text-[11px] text-center text-slate-600">{item.vendors.v3.toLocaleString()}</td>
                        <td className="py-3 text-[11px] text-center text-slate-400">{item.estimateRate.toLocaleString()}</td>
                        <td className="py-3 text-center">
                          <div className="flex flex-col items-center">
                            <span className="text-[10px] font-bold text-emerald-600">{lowest.toLocaleString()}</span>
                            <span className="text-[7px] text-slate-400 uppercase tracking-tighter">{lowestVendor}</span>
                          </div>
                        </td>
                        <td className="py-3 text-right">
                          <div className="flex flex-col items-end gap-0.5">
                            <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold ${v1Var > 10 ? 'bg-red-50 text-red-600' : v1Var < -5 ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'}`}>
                              {v1Var > 0 ? '+' : ''}{v1Var.toFixed(1)}%
                            </span>
                            <div className="flex gap-1">
                              <span className="text-[7px] text-slate-300 font-bold">{v2Var > 0 ? '+' : ''}{v2Var.toFixed(1)}%</span>
                              <span className="text-[7px] text-slate-300 font-bold">{v3Var > 0 ? '+' : ''}{v3Var.toFixed(1)}%</span>
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr className="bg-slate-50/50 font-black text-slate-900">
                    <td className="py-4 px-2 text-[11px] uppercase tracking-widest">Total Bid Value</td>
                    <td className="py-4 text-center text-[11px]">4,250,000</td>
                    <td className="py-4 text-center text-[11px]">3,890,000</td>
                    <td className="py-4 text-center text-[11px]">4,780,000</td>
                    <td className="py-4 text-center text-[11px] text-slate-400">4,150,000</td>
                    <td colSpan={2}></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* CARD E — Commercial Terms */}
          <div className="col-span-5 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col h-[450px]">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest mb-6">Commercial Terms Comparison</h3>
            <div className="flex-1 overflow-y-auto pr-2">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="pb-3 text-[9px] font-bold text-slate-400 uppercase tracking-wider">Term</th>
                    <th className="pb-3 text-[9px] font-bold text-slate-400 uppercase tracking-wider">Required</th>
                    <th className="pb-3 text-[9px] font-bold text-amber-600 uppercase text-center">Al Faris</th>
                    <th className="pb-3 text-[9px] font-bold text-slate-400 uppercase text-center">Gulf Tech</th>
                    <th className="pb-3 text-[9px] font-bold text-slate-400 uppercase text-center">Arabian</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {COMMERCIAL_TERMS.map((term) => (
                    <tr key={term.id}>
                      <td className="py-4 text-[11px] font-bold text-slate-900">{term.term}</td>
                      <td className="py-4 text-[11px] text-slate-500 italic">{term.requirement}</td>
                      <td className="py-4 text-center">
                        <span className={`px-2 py-1 rounded-lg text-[9px] font-bold border ${getSeverityColor(term.vendors.v1.severity)}`}>
                          {term.vendors.v1.value}
                        </span>
                      </td>
                      <td className="py-4 text-center">
                        <span className={`px-2 py-1 rounded-lg text-[9px] font-bold border ${getSeverityColor(term.vendors.v2.severity)}`}>
                          {term.vendors.v2.value}
                        </span>
                      </td>
                      <td className="py-4 text-center">
                        <span className={`px-2 py-1 rounded-lg text-[9px] font-bold border ${getSeverityColor(term.vendors.v3.severity)}`}>
                          {term.vendors.v3.value}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* ROW 4 */}
        <div className="grid grid-cols-3 gap-6">
          {/* CARD F — Technical Compliance */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col h-[450px]">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest mb-6">Technical Compliance</h3>
            <div className="flex gap-3 mb-8">
              {[
                { name: 'Al Faris', score: 91, m: 10, p: 7 },
                { name: 'Gulf Tech', score: 73, m: 8, p: 5 },
                { name: 'Arabian', score: 86, m: 9, p: 7 },
              ].map((v) => (
                <div key={v.name} className={`flex-1 p-3 rounded-2xl border ${v.name === 'Al Faris' ? 'bg-amber-50 border-amber-200' : 'bg-slate-50 border-slate-100'}`}>
                  <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mb-1">{v.name}</p>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-black text-slate-900">{v.score}%</span>
                    <div className="w-6 h-6">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle cx="12" cy="12" r="10" stroke="#e2e8f0" strokeWidth="2" fill="transparent" />
                        <circle cx="12" cy="12" r="10" stroke={v.name === 'Al Faris' ? '#f59e0b' : '#94a3b8'} strokeWidth="2" fill="transparent" style={{ strokeDasharray: `${(v.score / 100) * 63} 63` }} />
                      </svg>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="space-y-0.5">
                      <div className="flex justify-between text-[7px] font-bold text-slate-500 uppercase">
                        <span>Mandatory</span>
                        <span>{v.m}/10</span>
                      </div>
                      <div className="h-1 bg-white rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500" style={{ width: `${(v.m / 10) * 100}%` }} />
                      </div>
                    </div>
                    <div className="space-y-0.5">
                      <div className="flex justify-between text-[7px] font-bold text-slate-500 uppercase">
                        <span>Preferred</span>
                        <span>{v.p}/9</span>
                      </div>
                      <div className="h-1 bg-white rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500" style={{ width: `${(v.p / 9) * 100}%` }} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex-1 overflow-y-auto bg-slate-50 rounded-2xl border border-slate-100 p-4">
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-3">Consolidated Deviations</p>
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="pb-2 text-[8px] font-bold text-slate-500 uppercase">Vendor</th>
                    <th className="pb-2 text-[8px] font-bold text-slate-500 uppercase">Item</th>
                    <th className="pb-2 text-[8px] font-bold text-slate-500 uppercase">Class</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {deviations.map((dev, i) => (
                    <tr key={i} className="group cursor-help">
                      <td className="py-2 text-[9px] font-bold text-slate-900">{dev.vendor}</td>
                      <td className="py-2 text-[9px] text-slate-600">{dev.item}</td>
                      <td className="py-2">
                        <span className={`px-1.5 py-0.5 rounded text-[7px] font-bold uppercase tracking-tighter ${dev.class === 'Acceptable' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                          {dev.class}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* CARD G — Consolidated Risk Matrix */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col h-[450px]">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest mb-6">Consolidated Risk Matrix</h3>
            <div className="flex-1 min-h-0 bg-slate-50 rounded-2xl border border-slate-100 relative p-6">
              <div className="absolute inset-0 flex flex-col">
                <div className="flex-1 border-b border-slate-200" />
                <div className="flex-1" />
              </div>
              <div className="absolute inset-0 flex">
                <div className="flex-1 border-r border-slate-200" />
                <div className="flex-1" />
              </div>
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[8px] font-bold text-slate-400 uppercase tracking-widest">Likelihood</div>
              <div className="absolute left-2 top-1/2 -translate-y-1/2 -rotate-90 text-[8px] font-bold text-slate-400 uppercase tracking-widest">Impact</div>
              
              {risks.map((risk) => (
                <motion.div
                  key={risk.id}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className={`absolute w-3 h-3 rounded-full cursor-help shadow-lg ${risk.type === 'Resolved' ? 'opacity-30' : ''} ${risk.v === 'v1' ? 'bg-amber-500 shadow-amber-500/40' : risk.v === 'v2' ? 'bg-blue-500 shadow-blue-500/40' : 'bg-slate-400 shadow-slate-400/40'}`}
                  style={{ left: `${risk.x}%`, bottom: `${risk.y}%` }}
                >
                  <div className="absolute top-full mt-1 left-1/2 -translate-x-1/2 whitespace-nowrap text-[7px] font-bold text-slate-500">{risk.label}</div>
                </motion.div>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t border-slate-100">
              <table className="w-full text-center">
                <thead>
                  <tr>
                    <th className="text-[8px] font-bold text-slate-400 uppercase text-left">Vendor</th>
                    <th className="text-[8px] font-bold text-red-500 uppercase">Critical</th>
                    <th className="text-[8px] font-bold text-amber-500 uppercase">Minor</th>
                    <th className="text-[8px] font-bold text-emerald-500 uppercase">Resolved</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {[
                    { name: 'Al Faris', c: 0, m: 2, r: 1 },
                    { name: 'Gulf Tech', c: 3, m: 1, r: 0 },
                    { name: 'Arabian', c: 1, m: 1, r: 0 },
                  ].map(v => (
                    <tr key={v.name}>
                      <td className="py-2 text-[9px] font-bold text-slate-900 text-left">{v.name}</td>
                      <td className="py-2 text-[10px] font-black text-slate-900">{v.c}</td>
                      <td className="py-2 text-[10px] font-black text-slate-900">{v.m}</td>
                      <td className="py-2 text-[10px] font-black text-slate-900">{v.r}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* CARD H — Final Recommendation */}
          <div className="bg-white p-6 rounded-3xl border-2 border-amber-400 shadow-2xl shadow-amber-500/10 flex flex-col h-[450px] relative overflow-hidden">
            <div className="absolute right-[-10%] top-[-10%] w-48 h-48 bg-amber-500/5 rounded-full blur-3xl" />
            
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest mb-6">Final Recommendation</h3>
            
            <div className="bg-slate-50 rounded-2xl border border-slate-100 overflow-hidden mb-6">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-100/50 border-b border-slate-200">
                    <th className="px-3 py-2 text-[8px] font-bold text-slate-500 uppercase">Rank</th>
                    <th className="px-3 py-2 text-[8px] font-bold text-slate-500 uppercase">Vendor</th>
                    <th className="px-3 py-2 text-[8px] font-bold text-slate-500 uppercase text-center">Score</th>
                    <th className="px-3 py-2 text-[8px] font-bold text-slate-500 uppercase text-right">Verdict</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[
                    { rank: '1st', name: 'Al Faris', score: 89, verdict: 'Recommended', color: 'text-amber-600' },
                    { rank: '2nd', name: 'Arabian', score: 74, verdict: 'Not Recommended', color: 'text-slate-400' },
                    { rank: '3rd', name: 'Gulf Tech', score: 61, verdict: 'Not Recommended', color: 'text-slate-400' },
                  ].map(row => (
                    <tr key={row.name} className={row.rank === '1st' ? 'bg-amber-50/30' : ''}>
                      <td className="px-3 py-2 text-[10px] font-black">{row.rank}</td>
                      <td className="px-3 py-2 text-[10px] font-bold text-slate-900">{row.name}</td>
                      <td className="px-3 py-2 text-[10px] font-black text-center">{row.score}</td>
                      <td className={`px-3 py-2 text-[9px] font-bold text-right ${row.color}`}>{row.verdict}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="h-[1px] bg-slate-100 w-full mb-6" />

            <div className="flex-1 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-amber-500/20">
                  <Zap size={20} />
                </div>
                <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight">Al Faris Contracting</h4>
              </div>
              <div className="space-y-3">
                {[
                  'Strongest technical compliance (91%) across all vendors.',
                  'Within approved budget. Lowest risk profile.',
                  'One commercial term requires negotiation before contract execution.'
                ].map((point, i) => (
                  <div key={i} className="flex gap-2 items-start">
                    <CheckCircle2 className="text-emerald-500 mt-0.5 flex-shrink-0" size={14} />
                    <p className="text-xs text-slate-600 leading-tight font-medium">{point}</p>
                  </div>
                ))}
              </div>
            </div>

            <button 
              onClick={handleSend}
              disabled={isSending}
              className="w-full py-4 bg-amber-500 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-amber-600 transition-all shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2 mt-6"
            >
              {isSending ? <Loader2 className="animate-spin" size={16} /> : <Send size={16} />}
              {isSending ? 'Sending Report...' : 'Send Report to Admin'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
