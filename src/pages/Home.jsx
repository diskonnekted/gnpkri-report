import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Shield, FileText, Upload, ChevronRight, Send, CheckCircle2, AlertTriangle, Image as ImageIcon, MapPin, User, Phone, Fingerprint } from 'lucide-react'
import { Card, AnimatedCard } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Input, Textarea } from '../components/ui/Input'
import { Badge } from '../components/ui/Badge'

export default function Home({ onSubmit }) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: '', nik: '', phone: '',
    title: '', location: '', date: '', description: '',
    evidence: null
  })

  const handleNext = () => setStep(s => Math.min(s + 1, 3))
  const handlePrev = () => setStep(s => Math.max(s - 1, 1))

  const handleSubmit = (e) => {
    e.preventDefault()
    if (step < 3) {
      handleNext()
      return
    }
    onSubmit(formData)
  }

  // Bento Box Info Cards for Step 1
  const renderBentoInfo = () => (
    <div className="grid grid-cols-2 gap-3 mt-6">
      <Card className="col-span-2 bg-primary/10 border-primary/30 flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0">
          <Shield size={24} />
        </div>
        <div>
          <h3 className="font-bold text-white text-sm">Identitas Terlindungi</h3>
          <p className="text-xs text-text-dim mt-1">Sistem enkripsi end-to-end kami menjamin kerahasiaan Anda.</p>
        </div>
      </Card>
      
      <Card className="p-4 flex flex-col justify-between gap-3">
        <Fingerprint className="text-primary" size={20} />
        <div>
          <h3 className="font-bold text-white text-xs">Validasi NIK</h3>
          <p className="text-[10px] text-text-muted mt-1">Wajib untuk internal</p>
        </div>
      </Card>
      
      <Card className="p-4 flex flex-col justify-between gap-3">
        <AlertTriangle className="text-amber-400" size={20} />
        <div>
          <h3 className="font-bold text-white text-xs">Anti Fitnah</h3>
          <p className="text-[10px] text-text-muted mt-1">Laporan berbasis bukti</p>
        </div>
      </Card>
    </div>
  )

  return (
    <div className="space-y-6 pb-6 animate-slide-up">
      {/* Hero Header */}
      <section className="text-center pt-2 pb-4 space-y-4">
        <Badge variant="primary" className="animate-pulse-slow">
          <Shield size={12} /> Portal Pengaduan Resmi
        </Badge>
        <h1 className="text-4xl font-black tracking-tighter leading-tight text-white">
          Berani Lapor,<br/>
          <span className="text-gradient-primary">Cegah Korupsi.</span>
        </h1>
        <p className="text-text-dim text-sm max-w-[280px] mx-auto leading-relaxed">
          Platform pelaporan tindak pidana korupsi yang aman, rahasia, dan terintegrasi.
        </p>
      </section>

      {/* Progress Indicator */}
      <div className="flex justify-between items-center px-2 mb-2 relative">
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-border-glass -z-10" />
        {[1, 2, 3].map((num) => (
          <div key={num} className="flex flex-col items-center gap-2 bg-bg-base py-1 px-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-500 ${
              step >= num 
                ? 'bg-primary text-white shadow-glow border-2 border-primary' 
                : 'bg-bg-surface border-2 border-border-glass text-text-muted'
            }`}>
              {step > num ? <CheckCircle2 size={16} /> : num}
            </div>
            <span className={`text-[9px] font-black uppercase tracking-widest ${step >= num ? 'text-white' : 'text-text-muted'}`}>
              {num === 1 ? 'Identitas' : num === 2 ? 'Detail' : 'Bukti'}
            </span>
          </div>
        ))}
      </div>

      {/* Form Container */}
      <form onSubmit={handleSubmit}>
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-4"
            >
              <AnimatedCard delay={0.1}>
                <div className="space-y-4">
                  <Input 
                    label="Nama Lengkap Sesuai KTP" 
                    icon={User}
                    placeholder="Contoh: Budi Santoso"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    required
                  />
                  <Input 
                    label="Nomor Induk Kependudukan (NIK)" 
                    icon={Fingerprint}
                    type="number"
                    placeholder="16 Digit NIK"
                    value={formData.nik}
                    onChange={e => setFormData({...formData, nik: e.target.value})}
                    required
                  />
                  <Input 
                    label="Nomor WhatsApp/Telepon" 
                    icon={Phone}
                    type="tel"
                    placeholder="08123456789"
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                    required
                  />
                </div>
              </AnimatedCard>
              {renderBentoInfo()}
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-4"
            >
              <AnimatedCard delay={0.1}>
                <div className="space-y-4">
                  <Input 
                    label="Judul Laporan" 
                    icon={FileText}
                    placeholder="Singkat dan jelas..."
                    value={formData.title}
                    onChange={e => setFormData({...formData, title: e.target.value})}
                    required
                  />
                  <Input 
                    label="Lokasi Kejadian" 
                    icon={MapPin}
                    placeholder="Nama instansi/desa/kecamatan..."
                    value={formData.location}
                    onChange={e => setFormData({...formData, location: e.target.value})}
                    required
                  />
                  <Input 
                    label="Tanggal Perkiraan Kejadian" 
                    type="date"
                    value={formData.date}
                    onChange={e => setFormData({...formData, date: e.target.value})}
                    required
                  />
                  <Textarea 
                    label="Uraian Kejadian (Kronologi)"
                    placeholder="Ceritakan kronologi sedetail mungkin. Siapa yang terlibat, bagaimana modusnya, dan kapan terjadinya..."
                    value={formData.description}
                    onChange={e => setFormData({...formData, description: e.target.value})}
                    required
                  />
                </div>
              </AnimatedCard>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-4"
            >
              <AnimatedCard delay={0.1} className="text-center py-8">
                <div className="w-20 h-20 mx-auto bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4 border border-primary/20">
                  <Upload size={32} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Unggah Bukti Pendukung</h3>
                <p className="text-xs text-text-dim mb-6 px-4">
                  Lampirkan dokumen, foto, atau bukti transfer. Format: PDF, JPG, PNG (Maks 10MB).
                </p>
                
                <div className="relative">
                  <input 
                    type="file" 
                    id="evidence" 
                    className="hidden" 
                    onChange={e => {
                      const file = e.target.files[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setFormData({...formData, evidenceName: file.name, evidenceData: reader.result});
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                  <label 
                    htmlFor="evidence" 
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl text-sm font-bold cursor-pointer transition-all"
                  >
                    <ImageIcon size={18} />
                    {formData.evidenceName ? formData.evidenceName : 'Pilih File'}
                  </label>
                </div>
              </AnimatedCard>

              <div className="flex items-start gap-3 p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl">
                <AlertTriangle className="text-amber-400 shrink-0" size={18} />
                <p className="text-[10px] text-amber-400 font-medium leading-relaxed">
                  <strong>Peringatan Hukum:</strong> Laporan palsu atau fitnah dapat dituntut sesuai undang-undang yang berlaku. Pastikan data yang Anda berikan adalah benar.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-6">
          {step > 1 && (
            <Button type="button" variant="secondary" onClick={handlePrev}>
              Kembali
            </Button>
          )}
          <Button type="submit" variant="primary" fullWidth>
            {step < 3 ? (
              <>Lanjutkan <ChevronRight size={18} /></>
            ) : (
              <>Kirim Laporan <Send size={18} /></>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
