import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Shield, Search, Printer, MessageCircle, CheckCircle, Clock, TrendingUp, Layers, Activity, User, Filter, MoreVertical, LogOut } from 'lucide-react'
import { Card, AnimatedCard } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { Input } from '../components/ui/Input'

export default function Admin({ reports, setReports, onLogout }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [filter, setFilter] = useState('All') // All, Pending, Selesai

  const updateStatus = (id, newStatus) => {
    const updated = reports.map(r => r.id === id ? { ...r, status: newStatus } : r)
    setReports(updated)
    localStorage.setItem('gnpk_reports', JSON.stringify(updated))
  }

  const filteredReports = reports.filter(r => {
    const matchesSearch = r.title.toLowerCase().includes(searchTerm.toLowerCase()) || r.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filter === 'All' || r.status === filter
    return matchesSearch && matchesFilter
  })

  const stats = [
    { label: 'Total Laporan', value: reports.length, icon: Layers, color: 'text-primary', bg: 'bg-primary/20', border: 'border-primary/30' },
    { label: 'Menunggu', value: reports.filter(r => r.status === 'Pending').length, icon: Clock, color: 'text-amber-400', bg: 'bg-amber-500/20', border: 'border-amber-500/30' },
    { label: 'Selesai', value: reports.filter(r => r.status === 'Selesai').length, icon: CheckCircle, color: 'text-emerald-400', bg: 'bg-emerald-500/20', border: 'border-emerald-500/30' },
  ]

  const getStatusColor = (status) => {
    switch(status) {
      case 'Pending': return 'warning'
      case 'Investigasi': return 'primary'
      case 'Verifikasi': return 'primary'
      case 'Selesai': return 'success'
      default: return 'default'
    }
  }

  const getNextStatusInfo = (status) => {
    switch(status) {
      case 'Pending': return { next: 'Investigasi', label: 'Mulai Investigasi' }
      case 'Investigasi': return { next: 'Verifikasi', label: 'Verifikasi Laporan' }
      case 'Verifikasi': return { next: 'Selesai', label: 'Tandai Selesai' }
      default: return null
    }
  }

  const handleWhatsApp = (phone, title) => {
    const formattedPhone = phone.startsWith('0') ? '62' + phone.slice(1) : phone;
    const message = encodeURIComponent(`Halo, ini dari GNPK RI Banjarnegara. Kami menghubungi Anda terkait laporan: "${title}". Proses saat ini telah mencapai tahap Pelaporan ke APH.`);
    window.open(`https://wa.me/${formattedPhone}?text=${message}`, '_blank');
  }

  const handleDownload = (evidenceData, evidenceName) => {
    try {
      if (!evidenceData.includes(',')) throw new Error("Invalid base64 string");
      const arr = evidenceData.split(',');
      const mime = arr[0].match(/:(.*?);/)[1];
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);
      while(n--){
          u8arr[n] = bstr.charCodeAt(n);
      }
      const blob = new Blob([u8arr], {type: mime});
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = evidenceName || 'lampiran_laporan';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(url), 100);
    } catch (e) {
      console.error('Download error, falling back to direct href:', e);
      const link = document.createElement('a');
      link.href = evidenceData;
      link.download = evidenceName || 'lampiran_laporan';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }

  return (
    <div className="space-y-6 pb-6 animate-slide-up">
      {/* Header Admin */}
      <div className="flex justify-between items-end pt-2">
        <div>
          <h2 className="text-3xl font-black tracking-tighter text-white">Dashboard</h2>
          <p className="text-primary text-[10px] font-black uppercase tracking-widest mt-1">Command Center</p>
        </div>
        <Button variant="secondary" className="!px-3 !py-3 rounded-xl border-border-glass text-text-muted hover:text-white" onClick={onLogout}>
          <LogOut size={18} />
        </Button>
      </div>

      {/* Analytics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {stats.map((s, i) => (
          <Card key={i} className={`p-4 ${i === 0 ? 'col-span-2 md:col-span-1 border-primary/50 bg-gradient-to-br from-primary/10 to-transparent' : ''}`}>
            <div className="flex items-center justify-between mb-3">
              <div className={`w-8 h-8 rounded-lg ${s.bg} border ${s.border} flex items-center justify-center ${s.color}`}>
                <s.icon size={16} />
              </div>
              {i === 0 && <TrendingUp size={16} className="text-primary opacity-50" />}
            </div>
            <p className="text-2xl font-black text-white">{s.value}</p>
            <p className="text-[10px] font-bold uppercase tracking-widest text-text-dim mt-1">{s.label}</p>
          </Card>
        ))}
      </div>

      {/* Toolbar */}
      <div className="sticky top-[80px] z-40 bg-bg-base/80 backdrop-blur-xl py-2 -mx-4 px-4 flex gap-2">
        <Input 
          icon={Search}
          placeholder="Cari laporan..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="flex-1"
        />
        <div className="flex items-end pb-1.5">
           <Button variant="secondary" className="!px-4 !py-4 rounded-xl" onClick={() => setFilter(filter === 'All' ? 'Pending' : filter === 'Pending' ? 'Selesai' : 'All')}>
             <Filter size={18} className={filter !== 'All' ? 'text-primary' : ''} />
           </Button>
        </div>
      </div>

      {/* Reports Feed */}
      <div className="space-y-4">
        <AnimatePresence>
          {filteredReports.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="py-12 flex flex-col items-center justify-center text-center gap-4"
            >
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-text-muted">
                <Shield size={24} />
              </div>
              <p className="text-xs font-bold text-text-muted uppercase tracking-widest">Tidak ada data</p>
            </motion.div>
          ) : (
            filteredReports.map((report, idx) => (
              <AnimatedCard delay={idx * 0.05} key={report.id} className="p-0 overflow-hidden">
                <div className="p-5">
                  <div className="flex justify-between items-start mb-4">
                    <Badge variant={getStatusColor(report.status)} className={report.status !== 'Selesai' ? 'animate-pulse-slow' : ''}>
                      {report.status}
                    </Badge>
                    <button className="text-text-muted hover:text-white transition-colors">
                      <MoreVertical size={16} />
                    </button>
                  </div>
                  
                  <h3 className="font-bold text-lg text-white leading-tight mb-2">{report.title}</h3>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-text-muted font-medium mb-4">
                    <span className="flex items-center gap-1.5"><User size={12} className="text-primary" /> {report.name}</span>
                    <span className="flex items-center gap-1.5"><Clock size={12} /> {new Date(report.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}</span>
                  </div>
                  
                  <p className="text-sm text-text-dim line-clamp-2 leading-relaxed bg-black/20 p-3 rounded-xl border border-border-glass mb-4">
                    {report.description}
                  </p>

                  {report.evidenceData && (
                    <Button 
                      variant="ghost" 
                      className="!py-2 !px-3 text-[10px] border border-border-glass bg-white/5 hover:bg-white/10"
                      onClick={() => handleDownload(report.evidenceData, report.evidenceName)}
                    >
                      <Printer size={12} className="mr-1" /> Unduh Lampiran
                    </Button>
                  )}
                </div>
                
                <div className="bg-white/5 border-t border-border-glass p-3 flex gap-2">
                  {report.status !== 'Selesai' && (
                    <Button 
                      variant="primary" 
                      className="flex-1 !py-3 text-[10px]"
                      onClick={() => updateStatus(report.id, getNextStatusInfo(report.status).next)}
                    >
                      {getNextStatusInfo(report.status).label}
                    </Button>
                  )}
                  {report.status === 'Selesai' && (
                     <Button 
                      variant="ghost" 
                      className="flex-1 !py-3 text-[10px]"
                      onClick={() => updateStatus(report.id, 'Verifikasi')}
                     >
                       Batalkan Selesai
                     </Button>
                  )}
                  <Button variant="secondary" className="!px-4 !py-3 !bg-emerald-500/20 !border-emerald-500/30 !text-emerald-400 hover:!bg-emerald-500/30" onClick={() => handleWhatsApp(report.phone, report.title)}>
                    <MessageCircle size={16} /> WA Pelapor
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
