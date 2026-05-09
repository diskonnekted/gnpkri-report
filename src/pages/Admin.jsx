import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Shield, Search, Printer, MessageCircle, CheckCircle, Clock, TrendingUp, Layers, Activity, User } from 'lucide-react'

export default function Admin({ reports, setReports }) {
  const [searchTerm, setSearchTerm] = useState('')

  const updateStatus = (id, newStatus) => {
    const updated = reports.map(r => r.id === id ? { ...r, status: newStatus } : r)
    setReports(updated)
    localStorage.setItem('gnpk_reports', JSON.stringify(updated))
  }

  const filteredReports = reports.filter(r => 
    r.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    r.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const stats = [
    { label: 'Total Lap', value: reports.length, icon: Layers, color: 'text-primary', bg: 'bg-primary/10' },
    { label: 'Pending', value: reports.filter(r => r.status === 'Pending').length, icon: Clock, color: 'text-amber-500', bg: 'bg-amber-500/10' },
    { label: 'Active', value: '14', icon: Activity, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
  ]

  return (
    <div className="space-y-8 pb-32 animate-slide-up">
      <div className="flex justify-between items-end pt-4">
        <div className="space-y-1">
          <h2 className="text-4xl font-black tracking-tighter text-gradient">Dashboard</h2>
          <p className="text-text-dim text-[10px] font-black uppercase tracking-[0.3em]">Monitoring Command Center</p>
        </div>
        <button onClick={() => window.print()} className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-text-dim hover:text-white transition-all hover:scale-110 active:scale-95 shadow-2xl">
          <Printer size={20} />
        </button>
      </div>

      {/* Modern Stats Grid */}
      <div className="grid grid-cols-3 gap-3">
        {stats.map((s, i) => (
          <div key={i} className="card glass-dark p-4 flex flex-col items-start gap-3 relative overflow-hidden group">
            <div className={`absolute -right-4 -top-4 opacity-10 group-hover:opacity-20 transition-opacity ${s.color}`}>
               <s.icon size={80} />
            </div>
            <div className={`w-8 h-8 rounded-lg ${s.bg} flex items-center justify-center ${s.color}`}>
              <s.icon size={16} />
            </div>
            <div className="space-y-0.5">
              <p className="text-2xl font-black text-white">{s.value}</p>
              <p className="text-[8px] font-black uppercase tracking-widest text-text-muted">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Search Bar */}
      <div className="card glass-dark p-0 overflow-hidden group focus-within:border-primary/40 transition-colors">
        <div className="flex items-center px-5 h-14 gap-4">
          <Search size={18} className="text-primary" />
          <input 
            type="text" 
            placeholder="Cari laporan atau pelapor..." 
            className="bg-transparent border-none outline-none text-white w-full font-bold placeholder:text-text-dim/40 text-sm"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Report List */}
      <div className="space-y-5">
        {filteredReports.length === 0 ? (
          <div className="card glass-dark text-center py-24 border-dashed border-2 border-white/5">
            <Shield size={64} className="mx-auto mb-4 opacity-5 text-primary" />
            <p className="text-text-dim font-black uppercase tracking-widest text-[10px]">Zero Reports Found</p>
          </div>
        ) : (
          filteredReports.map((report, idx) => (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
              key={report.id} 
              className="card glass border-l-4 border-l-primary hover:border-l-primary-light transition-all"
            >
              <div className="flex justify-between items-center mb-5">
                 <div className="flex items-center gap-3">
                    <div className={`w-2.5 h-2.5 rounded-full shadow-[0_0_10px_currentColor] ${report.status === 'Pending' ? 'text-amber-500 bg-amber-500 animate-pulse' : 'text-emerald-500 bg-emerald-500'}`} />
                    <span className="text-[10px] font-black uppercase tracking-widest text-text-dim">
                      {report.status}
                    </span>
                 </div>
                 <span className="text-[10px] text-text-muted font-black tracking-widest">
                    {new Date(report.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                 </span>
              </div>
              
              <div className="mb-6 space-y-2">
                <h3 className="font-black text-2xl mb-1 leading-none text-white tracking-tight">{report.title}</h3>
                <div className="flex items-center gap-2 text-[10px] text-primary font-black uppercase tracking-widest">
                  <User size={12} /> {report.name}
                </div>
              </div>
              
              <p className="text-sm text-text-dim mb-8 line-clamp-3 leading-relaxed font-medium">
                {report.description}
              </p>
              
              <div className="flex gap-3">
                <button 
                  onClick={() => updateStatus(report.id, 'Selesai')}
                  className="flex-1 glass bg-white/5 hover:bg-emerald-500/20 text-emerald-500 border border-emerald-500/20 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  Selesaikan Laporan
                </button>
                <button 
                  className="w-14 h-14 glass bg-primary/10 hover:bg-primary text-primary hover:text-white rounded-2xl transition-all flex items-center justify-center hover:scale-[1.02] active:scale-[0.98]"
                >
                  <MessageCircle size={22} />
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  )
}

