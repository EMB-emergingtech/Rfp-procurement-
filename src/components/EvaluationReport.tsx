import React, { useState } from 'react';
import { 
  CheckCircle2, 
  AlertCircle, 
  FileText, 
  Download, 
  Send, 
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  TrendingUp,
  ShieldCheck,
  Zap,
  Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { VENDOR_SUBMISSIONS, TECHNICAL_SCORES } from '../constants';

export default function EvaluationReport({ 
  onBackToAnalysis, 
  onViewDetailedDashboard 
}: { 
  onBackToAnalysis: () => void;
  onViewDetailedDashboard: (vendorId: string) => void;
}) {
  const [activeVendorId, setActiveVendorId] = useState('v1');
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isDownloaded, setIsDownloaded] = useState(false);

  const activeVendor = VENDOR_SUBMISSIONS.find(v => v.id === activeVendorId)!;
  const activeScore = TECHNICAL_SCORES.find(s => s.vendorId === activeVendorId)!;

  const handleSend = () => {
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setIsSent(true);
    }, 1500);
  };

  const handleDownload = () => {
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
      setIsDownloaded(true);
    }, 1500);
  };

  const sections = [
    {
      id: 1,
      title: 'Submission Overview',
      status: 'pass',
      content: (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-1">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Vendor</p>
            <p className="text-sm font-bold text-slate-900">{activeVendor.name}</p>
          </div>
          <div className="space-y-1">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Submitted</p>
            <p className="text-sm font-bold text-slate-900">{activeVendor.submittedAt} 2025</p>
          </div>
          <div className="space-y-1">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Bid</p>
            <p className="text-sm font-bold text-slate-900">AED {activeVendorId === 'v1' ? '4,250,000' : activeVendorId === 'v2' ? '3,890,000' : '4,780,000'}</p>
          </div>
          <div className="space-y-1">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Submission ID</p>
            <p className="text-sm font-bold text-slate-900">SUB-2025-041-00{activeVendorId.slice(1)}</p>
          </div>
        </div>
      )
    },
    {
      id: 2,
      title: 'RFQ Alignment',
      status: 'pass',
      score: activeVendor.alignmentScore,
      content: (
        <div className="flex items-center gap-12">
          <div className="relative w-20 h-20">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="40" cy="40" r="36" stroke="currentColor" strokeWidth="6" fill="transparent" className="text-slate-100" />
              <circle cx="40" cy="40" r="36" stroke="currentColor" strokeWidth="6" fill="transparent" className="text-emerald-500" style={{ strokeDasharray: `${(activeVendor.alignmentScore / 100) * 226} 226` }} />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-sm font-bold">{activeVendor.alignmentScore}%</div>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-slate-600">
              {activeVendorId === 'v1' ? 'Gap identified: Insurance certificate missing. Clarification sent: 11 Mar | Resolved: 12 Mar' : 'All mandatory alignment parameters met during initial screening.'}
            </p>
            <div className="flex items-center gap-2 text-[10px] font-bold text-emerald-500 uppercase tracking-widest">
              <CheckCircle2 size={12} />
              Alignment Verified
            </div>
          </div>
        </div>
      )
    },
    {
      id: 3,
      title: 'Commercial Compliance',
      status: activeVendorId === 'v1' ? 'warning' : 'pass',
      content: (
        <div className="space-y-4">
          <p className="text-sm text-slate-600">
            {activeVendorId === 'v1' 
              ? 'Advance payment: 30% requested vs standard 20% — Minor deviation. Requires commercial negotiation.' 
              : 'Full compliance with all commercial terms and conditions specified in the RFQ.'}
          </p>
          <div className="grid grid-cols-3 gap-4">
            {['Bid Bond: Confirmed', 'Currency: AED', 'Validity: 90 days'].map(tag => (
              <div key={tag} className="px-3 py-2 bg-slate-50 border border-slate-100 rounded-xl text-[10px] font-bold text-slate-600 uppercase tracking-wider text-center">
                {tag}
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      id: 4,
      title: 'Unit Rate Assessment',
      status: 'pass',
      content: (
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-4 bg-emerald-50 border border-emerald-100 rounded-2xl">
            <TrendingUp className="text-emerald-600" size={20} />
            <p className="text-sm font-medium text-emerald-900">
              Rates within {activeVendorId === 'v1' ? '2.4%' : activeVendorId === 'v2' ? '6.3%' : '14.9%'} of estimate overall.
            </p>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">
            Pipe supply rate {activeVendorId === 'v1' ? '+4.1%' : '-10%'} vs benchmark — within acceptable range. No outlier line items detected. Budget position: AED 250,000 under approved budget.
          </p>
        </div>
      )
    },
    {
      id: 5,
      title: 'Technical Compliance',
      status: 'pass',
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                <span>Mandatory</span>
                <span>{activeScore.mandatory.met}/{activeScore.mandatory.total}</span>
              </div>
              <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500" style={{ width: `${(activeScore.mandatory.met / activeScore.mandatory.total) * 100}%` }} />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                <span>Preferred</span>
                <span>{activeScore.preferred.met}/{activeScore.preferred.total}</span>
              </div>
              <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500" style={{ width: `${(activeScore.preferred.met / activeScore.preferred.total) * 100}%` }} />
              </div>
            </div>
          </div>
          {activeScore.deviations.length > 0 && (
            <div className="p-4 bg-amber-50 border border-amber-100 rounded-2xl space-y-2">
              <p className="text-[10px] font-bold text-amber-700 uppercase tracking-widest">Active Deviation</p>
              <p className="text-xs text-amber-900 font-medium">{activeScore.deviations[0].detail}</p>
            </div>
          )}
        </div>
      )
    },
    {
      id: 6,
      title: 'Cross-Bidder Standing',
      status: 'pass',
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: 'Commercial Rank', val: activeVendorId === 'v2' ? '1st' : activeVendorId === 'v1' ? '2nd' : '3rd' },
              { label: 'Technical Rank', val: activeVendorId === 'v1' ? '1st' : activeVendorId === 'v3' ? '2nd' : '3rd' },
              { label: 'Overall Rank', val: activeVendorId === 'v1' ? '1st' : activeVendorId === 'v3' ? '2nd' : '3rd' },
            ].map(rank => (
              <div key={rank.label} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-center">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{rank.label}</p>
                <p className="text-xl font-bold text-slate-900">{rank.val}</p>
              </div>
            ))}
          </div>
          <div className="space-y-3">
            {VENDOR_SUBMISSIONS.slice(0, 3).map(v => (
              <div key={v.id} className="space-y-1">
                <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase">
                  <span>{v.name}</span>
                  <span>{v.id === 'v1' ? '89' : v.id === 'v2' ? '72' : '84'}/100</span>
                </div>
                <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full ${v.id === activeVendorId ? 'bg-emerald-500' : 'bg-slate-300'}`} style={{ width: `${v.id === 'v1' ? 89 : v.id === 'v2' ? 72 : 84}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      id: 7,
      title: 'Risk Summary',
      status: 'pass',
      content: (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="aspect-square bg-slate-50 rounded-2xl border border-slate-100 relative p-4">
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
            
            {/* Plotted items */}
            <div className="absolute bottom-[20%] left-[20%] w-3 h-3 bg-emerald-500 rounded-full shadow-lg shadow-emerald-500/40" />
            <div className="absolute bottom-[30%] left-[40%] w-3 h-3 bg-blue-500 rounded-full shadow-lg shadow-blue-500/40" />
            <div className="absolute bottom-[10%] left-[60%] w-3 h-3 bg-indigo-500 rounded-full shadow-lg shadow-indigo-500/40" />
          </div>
          <div className="space-y-3">
            {[
              'Advance payment deviation: Low impact, Low likelihood',
              'Technical substitution: Low impact, Low likelihood',
              'Insurance document gap: Resolved'
            ].map((risk, i) => (
              <div key={i} className="flex items-center gap-3 text-xs text-slate-600">
                <div className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-emerald-500' : i === 1 ? 'bg-blue-500' : 'bg-indigo-500'}`} />
                {risk}
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      id: 8,
      title: 'Recommendation',
      status: 'pass',
      content: (
        <div className={`p-8 rounded-[2rem] ${activeVendorId === 'v1' ? 'bg-gradient-to-br from-amber-500 to-amber-600 text-white' : 'bg-slate-100 text-slate-600'} shadow-xl`}>
          <div className="flex items-center gap-3 mb-4">
            <Zap size={24} className={activeVendorId === 'v1' ? 'text-amber-200' : 'text-slate-400'} />
            <h4 className="text-xl font-bold">Award Recommendation</h4>
          </div>
          <p className="text-sm font-medium leading-relaxed opacity-90">
            {activeVendorId === 'v1' 
              ? 'Al Faris Contracting is recommended for award. Strongest technical compliance across all bidders. Within budget with lowest risk profile. Advance payment term requires negotiation before contract execution.' 
              : `${activeVendor.name} is not recommended for primary award at this stage due to lower technical compliance scores compared to the leading bidder.`}
          </p>
        </div>
      )
    }
  ];

  return (
    <div className="p-8 max-w-5xl mx-auto pb-24">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
        <div className="flex items-center gap-6">
          <button 
            onClick={onBackToAnalysis}
            className="p-3 bg-white border border-slate-200 text-slate-500 rounded-2xl hover:bg-slate-50 transition-colors shadow-sm"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Evaluation Report</h1>
            <p className="text-slate-500 text-sm">Comprehensive assessment and award recommendation summary.</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handleDownload}
            disabled={isDownloading}
            className="px-6 py-3 bg-white border border-slate-200 text-slate-700 rounded-2xl text-sm font-bold hover:bg-slate-50 transition-all shadow-sm flex items-center gap-2 disabled:opacity-50"
          >
            {isDownloading ? <Loader2 className="animate-spin" size={18} /> : isDownloaded ? <CheckCircle2 className="text-emerald-500" size={18} /> : <Download size={18} />}
            {isDownloading ? 'Downloading...' : isDownloaded ? 'Downloaded' : 'Download PDF'}
          </button>
          <button 
            onClick={handleSend}
            disabled={isSending || isSent}
            className="px-6 py-3 bg-slate-900 text-white rounded-2xl text-sm font-bold hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 flex items-center gap-2 disabled:opacity-50"
          >
            {isSending ? <Loader2 className="animate-spin" size={18} /> : isSent ? <CheckCircle2 size={18} /> : <Send size={18} />}
            {isSending ? 'Sending...' : isSent ? 'Report Sent' : 'Send to Admin'}
          </button>
        </div>
      </div>

      {isSent && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 p-4 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center gap-4 text-emerald-700"
        >
          <CheckCircle2 size={20} />
          <p className="text-sm font-bold">Report successfully dispatched to admin@company.com</p>
        </motion.div>
      )}

      {/* Vendor Selector Tabs */}
      <div className="flex flex-col md:flex-row gap-4 mb-12">
        <div className="flex-1 flex bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm">
          {VENDOR_SUBMISSIONS.slice(0, 3).map((v) => (
            <button
              key={v.id}
              onClick={() => setActiveVendorId(v.id)}
              className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${activeVendorId === v.id ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-400 hover:text-slate-600'}`}
            >
              {v.name}
              {v.id === 'v1' && <span className="px-2 py-0.5 bg-amber-500 text-[8px] rounded-full text-white uppercase tracking-widest">Recommended</span>}
            </button>
          ))}
        </div>
        <button 
          onClick={() => onViewDetailedDashboard(activeVendorId)}
          className="px-8 py-3 bg-amber-500 text-white rounded-2xl text-sm font-bold hover:bg-amber-600 transition-all shadow-lg shadow-amber-500/20 flex items-center gap-2"
        >
          View Detailed Dashboard
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Report Sections */}
      <div className="space-y-6">
        {sections.map((section) => (
          <motion.div 
            key={section.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: section.id * 0.1 }}
            className={`bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden relative`}
          >
            <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${section.status === 'pass' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
            <div className="p-8">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${section.status === 'pass' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                    {section.status === 'pass' ? <ShieldCheck size={18} /> : <AlertCircle size={18} />}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">Section {section.id} — {section.title}</h3>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-bold uppercase tracking-widest ${section.status === 'pass' ? 'text-emerald-500' : 'text-amber-500'}`}>
                    {section.status === 'pass' ? 'Requirement Met' : 'Minor Issue Detected'}
                  </span>
                </div>
              </div>
              <div className="pl-11">
                {section.content}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
