import React from 'react'
import { motion } from 'framer-motion'
import { Clock, CheckCircle, AlertCircle, Search, Hash } from 'lucide-react'

export default function Progress({ reports }) {
  return (
    <div className="space-y-8 animate-slide-up">
      <div className="pt-4 space-y-2">
        <h2 className="text-4xl font-black tracking-tighter text-gradient">Laporan Anda</h2>
        <p className="text-text-dim text-[10px] font-black uppercase tracking-[0.3em]">Monitoring Status Real-time</p>
      </div>

      <div className="card glass-dark border-primary/10 p-0 overflow-hidden group focus-within:border-primary/40 transition-colors">
        <div className="flex items-center px-6 h-16 gap-4">
          <Search size={20} className="text-primary" />
          <input 
            type="text" 
            placeholder="Cari berdasarkan ID Laporan..." 
            className="bg-transparent border-none outline-none text-white w-full font-bold placeholder:text-text-dim/40 py-4 text-sm"
          />
        </div>
      </div>

      <div className="space-y-5">
        {reports.length === 0 ? (
          <div className="card glass-dark text-center py-24 flex flex-col items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center text-primary/20">
              <Hash size={40} />
            </div>
            <div className="space-y-2">
              <p className="text-text-dim font-black uppercase tracking-widest text-[10px]">Belum ada laporan aktif</p>
              <p className="text-[11px] text-text-muted max-w-[200px]">Laporan yang Anda kirim akan muncul di sini.</p>
            </div>
          </div>
        ) : (
          reports.map((report, idx) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              key={report.id} 
              className="card glass border-l-4 border-l-primary"
            >
              <div className="flex justify-between items-center mb-5">
                 <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                    {report.status === 'Pending' ? (
                      <Clock size={12} className="text-amber-500" />
                    ) : (
                      <CheckCircle size={12} className="text-emerald-500" />
                    )}
                    <span className={`text-[10px] font-black uppercase tracking-widest ${report.status === 'Pending' ? 'text-amber-500' : 'text-emerald-500'}`}>
                      {report.status}
                    </span>
                 </div>
                 <span className="text-[10px] text-text-dim font-black tracking-widest opacity-60">
                    #{report.id.toString().slice(-6)}
                 </span>
              </div>
              
              <div className="space-y-1 mb-6">
                <h3 className="font-black text-xl leading-tight text-white">{report.title}</h3>
                <p className="text-[10px] text-text-muted font-bold uppercase tracking-wider">{new Date(report.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-end">
                   <p className="text-[10px] font-black uppercase tracking-widest text-text-dim">Progres Verifikasi</p>
                   <p className="text-[10px] font-black text-primary">{report.status === 'Pending' ? '35%' : '100%'}</p>
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: report.status === 'Pending' ? '35%' : '100%' }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className={`h-full relative ${report.status === 'Pending' ? 'bg-amber-500' : 'bg-emerald-500'}`}
                  >
                    <div className="absolute inset-0 bg-white/20 animate-pulse" />
                  </motion.div>
                </div>
                <p className="text-[10px] font-bold text-text-muted leading-relaxed italic mt-2">
                  {report.status === 'Pending' 
                    ? 'Tim GNPK RI sedang meninjau dokumen pendukung Anda.' 
                    : 'Laporan telah diverifikasi dan masuk tahap investigasi.'}
                </p>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  )
}

