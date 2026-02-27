import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  Database, 
  X, 
  Loader2, 
  Info,
  ChevronRight,
  PieChart as PieChartIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

export default function RFQSetup() {
  const [commercialWeight, setCommercialWeight] = useState(60);
  const [technicalWeight, setTechnicalWeight] = useState(40);
  const [isIssuing, setIsIssuing] = useState(false);
  const [isIssued, setIsIssued] = useState(false);
  const [vendors, setVendors] = useState([
    'Al Faris Contracting',
    'Gulf Tech Solutions',
    'Arabian Industrial Co',
    'Nasser Engineering'
  ]);

  const handleCommercialChange = (val: number) => {
    setCommercialWeight(val);
    setTechnicalWeight(100 - val);
  };

  const handleTechnicalChange = (val: number) => {
    setTechnicalWeight(val);
    setCommercialWeight(100 - val);
  };

  const handleIssue = () => {
    setIsIssuing(true);
    setTimeout(() => {
      setIsIssuing(false);
      setIsIssued(true);
    }, 1500);
  };

  const chartData = [
    { name: 'Commercial', value: commercialWeight, color: '#10b981' },
    { name: 'Technical', value: technicalWeight, color: '#3b82f6' },
  ];

  const dataSources = [
    { name: 'Technical Specifications', status: 'Loaded (47 requirements)' },
    { name: 'BoQ Template', status: 'Loaded (10 line items)' },
    { name: 'Engineer\'s Estimate', status: 'Loaded (AED 4,150,000)' },
    { name: 'Commercial Terms Library', status: 'Loaded' },
    { name: 'Approved Manufacturer List', status: 'Loaded (124 entries)' },
    { name: 'Historical Rate Database', status: 'Loaded (3,847 records)' },
    { name: 'Vendor Profiles', status: 'Loaded (4 vendors)' },
  ];

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">RFQ Setup and Configuration</h1>
          <p className="text-slate-500 text-sm font-medium">Configure your procurement event parameters and evaluation criteria.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-6 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all shadow-sm">
            Save Draft
          </button>
          <button 
            onClick={handleIssue}
            disabled={isIssuing || isIssued}
            className="px-6 py-2.5 bg-brand-500 text-white rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-brand-600 transition-all shadow-lg shadow-brand-500/20 flex items-center gap-2 disabled:opacity-50"
          >
            {isIssuing ? <Loader2 className="animate-spin" size={16} /> : isIssued ? <CheckCircle2 size={16} /> : null}
            {isIssuing ? 'Issuing RFQ...' : isIssued ? 'RFQ Issued' : 'Issue RFQ'}
          </button>
        </div>
      </div>

      {isIssued && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 p-4 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center gap-4 text-emerald-700"
        >
          <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-white">
            <CheckCircle2 size={24} />
          </div>
          <div>
            <p className="font-bold">RFQ-2025-041 issued to 4 vendors</p>
            <p className="text-xs opacity-80">Confirmation emails dispatched to all participants.</p>
          </div>
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Section */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm space-y-6">
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Project Name</label>
                <input 
                  type="text" 
                  defaultValue="Al Wasl Pipeline Extension"
                  className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl text-sm font-bold text-slate-900 focus:ring-2 focus:ring-brand-500 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">RFQ Reference</label>
                <input 
                  type="text" 
                  defaultValue="RFQ-2025-041"
                  className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl text-sm font-bold text-slate-900 focus:ring-2 focus:ring-brand-500 transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Submission Deadline</label>
              <input 
                type="text" 
                defaultValue="15 March 2025"
                className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Scope of Work</label>
              <textarea 
                rows={4}
                defaultValue="Supply and install of 12km pipeline including civil, mechanical and electrical works"
                className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 resize-none"
              />
            </div>

            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Vendor List</label>
              <div className="flex flex-wrap gap-2">
                {vendors.map((vendor, idx) => (
                  <motion.div 
                    key={vendor} 
                    animate={isIssued ? { scale: [1, 1.1, 1] } : {}}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 text-slate-700 rounded-full text-xs font-bold border border-slate-200 group"
                  >
                    {vendor}
                    <button 
                      onClick={() => setVendors(vendors.filter(v => v !== vendor))}
                      className="text-slate-400 hover:text-red-500 transition-colors"
                    >
                      <X size={14} />
                    </button>
                  </motion.div>
                ))}
                <button className="px-3 py-1.5 border border-dashed border-slate-300 text-slate-400 rounded-full text-xs font-bold hover:border-emerald-500 hover:text-emerald-500 transition-all">
                  + Add Vendor
                </button>
              </div>
            </div>
          </div>

          {/* Evaluation Weightings */}
          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <PieChartIcon className="text-emerald-500" size={20} />
              <h3 className="font-bold text-slate-900">Evaluation Weightings</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-slate-700">Commercial</span>
                    <span className="text-sm font-bold text-emerald-500">{commercialWeight}%</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={commercialWeight}
                    onChange={(e) => handleCommercialChange(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-100 rounded-full appearance-none cursor-pointer accent-emerald-500"
                  />
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-slate-700">Technical</span>
                    <span className="text-sm font-bold text-blue-500">{technicalWeight}%</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={technicalWeight}
                    onChange={(e) => handleTechnicalChange(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-100 rounded-full appearance-none cursor-pointer accent-blue-500"
                  />
                </div>
              </div>

              <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Sliders Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-bold text-slate-700">Mandatory Technical Threshold</span>
                <span className="text-sm font-bold text-slate-900">80%</span>
              </div>
              <input type="range" defaultValue="80" className="w-full h-1.5 bg-slate-100 rounded-full appearance-none cursor-pointer accent-slate-900" />
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-bold text-slate-700">Budget Tolerance</span>
                <span className="text-sm font-bold text-slate-900">10%</span>
              </div>
              <input type="range" defaultValue="10" className="w-full h-1.5 bg-slate-100 rounded-full appearance-none cursor-pointer accent-slate-900" />
            </div>
          </div>
        </div>

        {/* Sidebar Panel */}
        <div className="space-y-6">
          <div className="bg-[#0F172A] text-white p-8 rounded-2xl shadow-2xl">
            <div className="flex items-center gap-3 mb-8">
              <Database className="text-brand-400" size={20} />
              <h3 className="font-black uppercase tracking-widest text-sm">Connected Data Sources</h3>
            </div>
            <div className="space-y-5">
              {dataSources.map((source) => (
                <div key={source.name} className="flex items-start gap-4 group">
                  <div className="mt-1.5 w-2 h-2 rounded-full bg-brand-400 shadow-[0_0_12px_rgba(245,158,11,0.6)]" />
                  <div>
                    <p className="text-xs font-black text-white group-hover:text-brand-400 transition-colors tracking-tight">{source.name}</p>
                    <p className="text-[10px] text-slate-500 font-medium">{source.status}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 p-4 bg-slate-800 rounded-xl border border-slate-700">
              <div className="flex items-center gap-2 mb-2">
                <Info size={14} className="text-blue-400" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">System Note</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                All data sources are automatically synchronized with the enterprise resource planning system. No manual uploads required.
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-4">Commercial Sensitivity</h3>
            <select className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-emerald-500">
              <option>Low</option>
              <option selected>Medium</option>
              <option>High</option>
            </select>
            <p className="mt-4 text-[11px] text-slate-500 leading-relaxed">
              Medium sensitivity applies standard historical rate benchmarks for outlier detection.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
