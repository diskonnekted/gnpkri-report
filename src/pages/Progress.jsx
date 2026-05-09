import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Hash, Clock, CheckCircle2, AlertCircle, Eye } from 'lucide-react'
import { Card, AnimatedCard } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'
import { Input } from '../components/ui/Input'
import { Button } from '../components/ui/Button'

export default function Progress({ reports }) {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredReports = reports.filter(r => 
    r.id.toString().includes(searchTerm) || 
    r.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const renderTimeline = (status) => {
    const statusScores = { 'Pending': 1, 'Investigasi': 2, 'Verifikasi': 3, 'Selesai': 4 }
    const currentScore = statusScores[status] || 1

    const steps = [
      { id: 1, title: 'Laporan Diterima', desc: 'Sistem mencatat laporan Anda', active: currentScore >= 1, icon: CheckCircle2 },
      { id: 2, title: 'Investigasi', desc: 'Tim melakukan pendalaman bukti', active: currentScore >= 2, icon: currentScore === 1 ? Clock : CheckCircle2, pulse: currentScore === 1 },
      { id: 3, title: 'Verifikasi Berkas', desc: 'Validasi untuk pelaporan APH', active: currentScore >= 3, icon: currentScore < 3 ? AlertCircle : CheckCircle2, pulse: currentScore === 2 },
      { id: 4, title: 'Selesai & Lapor APH', desc: 'Tindak lanjut dan laporan ditutup', active: currentScore === 4, icon: currentScore < 4 ? AlertCircle : CheckCircle2, pulse: currentScore === 3 },
    ]

    return (
      <div style={{ position: 'relative', paddingLeft: '32px', marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Vertical Line */}
        <div style={{ position: 'absolute', left: '11px', top: '0', bottom: '0', width: '2px', background: 'linear-gradient(to bottom, rgba(227, 30, 36, 0.5), transparent)', zIndex: 1 }} />
        
        {steps.map((step, idx) => (
          <div key={step.id} style={{ position: 'relative', display: 'flex', alignItems: 'flex-start' }}>
            <div 
              style={{
                position: 'absolute',
                left: '-32px',
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                border: '4px solid var(--bg-surface-elevated)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: step.active ? 'var(--primary)' : 'var(--bg-base)',
                color: step.active ? 'white' : 'var(--text-muted)',
                boxShadow: step.active ? '0 0 10px rgba(227,30,36,0.5)' : 'none',
                zIndex: 2
              }}
              className={step.pulse ? 'animate-pulse-slow' : ''}
            >
              <step.icon size={10} />
            </div>
            <div style={{ opacity: step.active ? 1 : 0.4, paddingTop: '2px' }}>
              <h4 className="text-xs font-bold text-white m-0">{step.title}</h4>
              <p className="text-[10px] text-text-muted mt-1 leading-tight">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6 pb-6 animate-slide-up">
      <div className="pt-2">
        <h2 className="text-3xl font-black tracking-tighter text-white">Lacak Laporan</h2>
        <p className="text-text-dim text-[10px] font-black uppercase tracking-[0.3em] mt-1">Real-time Monitoring</p>
      </div>

      <div className="sticky top-[80px] z-40 bg-bg-base/80 backdrop-blur-xl py-2 -mx-4 px-4">
        <Input 
          icon={Search}
          placeholder="Masukkan ID Laporan..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="space-y-4">
        <AnimatePresence>
          {filteredReports.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="py-12 flex flex-col items-center justify-center text-center gap-4"
            >
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-text-muted">
                <Hash size={24} />
              </div>
              <div>
                <p className="text-xs font-bold text-white">Tidak Ada Laporan</p>
                <p className="text-[10px] text-text-dim mt-1 max-w-[200px]">Coba cari dengan kata kunci lain atau buat laporan baru.</p>
              </div>
            </motion.div>
          ) : (
            filteredReports.map((report, idx) => (
              <AnimatedCard delay={idx * 0.1} key={report.id} className="border-t-4 border-t-primary">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-[9px] font-black uppercase tracking-widest text-text-dim">ID Laporan</span>
                    <p className="font-bold text-white text-sm">GNPK-{report.id.toString().slice(-6)}</p>
                  </div>
                  <Badge variant={report.status === 'Pending' ? 'warning' : 'success'}>
                    {report.status}
                  </Badge>
                </div>

                <h3 className="font-bold text-lg text-white leading-tight mb-2">{report.title}</h3>
                <p className="text-xs text-text-muted flex items-center gap-1.5">
                  <Clock size={12} />
                  {new Date(report.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                </p>

                <div className="mt-6 pt-6 border-t border-border-glass">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-text-dim mb-4">Status Verifikasi</h4>
                  {renderTimeline(report.status)}
                </div>

                <div className="mt-6">
                  <Button variant="ghost" fullWidth className="text-[10px]">
                    <Eye size={14} /> Lihat Detail Lengkap
                  </Button>
                </div>
              </AnimatedCard>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
