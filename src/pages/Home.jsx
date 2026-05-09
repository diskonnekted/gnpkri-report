import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { User, FileText, Upload, Send, ChevronRight, ChevronLeft, Shield, AlertTriangle, Fingerprint } from 'lucide-react'

export default function Home({ onSubmit }) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: '',
    nik: '',
    phone: '',
    title: '',
    description: '',
    location: '',
    files: []
  })

  const nextStep = () => setStep(s => s + 1)
  const prevStep = () => setStep(s => s - 1)

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files).map(f => f.name)
    setFormData({ ...formData, files: [...formData.files, ...files] })
  }

  return (
    <div className="space-y-8 pb-8 animate-slide-up">
      {/* Hero Section */}
      <section className="space-y-6 text-center pt-8">
        <div className="flex justify-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 border border-primary/20 text-white text-[10px] font-black uppercase tracking-[0.2em]"
          >
            <Fingerprint size={14} className="text-primary" />
            Safe & Anonymous Reporting
          </motion.div>

        </div>

        
        <div className="space-y-3">
          <h2 className="text-5xl font-black tracking-tighter text-gradient leading-[0.9]">
            LINDUNGI <br />
            <span className="text-primary">NEGARA.</span>
          </h2>
          <p className="text-text-dim font-medium text-sm max-w-[280px] mx-auto leading-relaxed">
            Laporkan segala bentuk penyalahgunaan wewenang dan korupsi secara aman.
          </p>
        </div>
      </section>

      {/* Guide Card */}
      <div className="card glass border-primary/20 p-6 relative overflow-hidden group">
        <div className="flex items-center gap-3 text-primary mb-6">
          <AlertTriangle size={24} />
          <h3 className="text-lg font-black uppercase tracking-tight">Prosedur Laporan</h3>
        </div>

        <div className="grid grid-cols-1 gap-5 relative z-10">
          {[
            { t: 'Identitas Valid', d: 'Gunakan NIK asli untuk verifikasi tim internal.', icon: User },
            { t: 'Kronologi Jelas', d: 'Sampaikan fakta kejadian secara sistematis.', icon: FileText },
            { t: 'Bukti Otentik', d: 'Lampirkan file pendukung yang relevan.', icon: Upload },
            { t: 'Anonimitas Terjamin', d: 'Identitas Anda disembunyikan & aman.', icon: Shield }
          ].map((item, i) => (
            <div key={i} className="flex gap-4 items-center">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                <item.icon size={20} />
              </div>
              <div>
                <p className="text-sm font-black text-white leading-tight">{item.t}</p>
                <p className="text-xs text-text-dim mt-1 leading-relaxed">{item.d}</p>
              </div>
            </div>
          ))}

        </div>
      </div>


      {/* Modern Step Indicators */}
      <div className="flex justify-center items-center gap-4 py-4">
        {[1, 2, 3].map((i) => (
          <div 
            key={i} 
            className={`step-indicator ${step >= i ? 'active' : ''}`}
          />
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div className="card glass-dark">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
                    <User size={16} />
                  </div>
                  <h3 className="font-black uppercase tracking-widest text-xs">Informasi Personal</h3>
                </div>
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-text-dim ml-1">Nama Lengkap</label>
                    <input 
                      type="text" 
                      placeholder="Contoh: Budi Santoso" 
                      className="input-field"
                      required
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-text-dim ml-1">NIK KTP</label>
                    <input 
                      type="text" 
                      placeholder="16 Digit Nomor Induk" 
                      className="input-field"
                      required
                      value={formData.nik}
                      onChange={e => setFormData({...formData, nik: e.target.value})}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-text-dim ml-1">Kontak WhatsApp</label>
                    <input 
                      type="tel" 
                      placeholder="0812xxxx" 
                      className="input-field"
                      required
                      value={formData.phone}
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div className="card glass-dark">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
                    <FileText size={16} />
                  </div>
                  <h3 className="font-black uppercase tracking-widest text-xs">Detail Pengaduan</h3>
                </div>
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-text-dim ml-1">Judul Laporan</label>
                    <input 
                      type="text" 
                      placeholder="Apa yang ingin Anda laporkan?" 
                      className="input-field"
                      required
                      value={formData.title}
                      onChange={e => setFormData({...formData, title: e.target.value})}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-text-dim ml-1">Deskripsi Lengkap</label>
                    <textarea 
                      placeholder="Ceritakan secara detail..." 
                      className="input-field min-h-[140px] resize-none"
                      required
                      value={formData.description}
                      onChange={e => setFormData({...formData, description: e.target.value})}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-text-dim ml-1">Lokasi Kejadian</label>
                    <input 
                      type="text" 
                      placeholder="Kecamatan / Instansi terkait" 
                      className="input-field"
                      value={formData.location}
                      onChange={e => setFormData({...formData, location: e.target.value})}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div className="card glass-dark">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
                    <Upload size={16} />
                  </div>
                  <h3 className="font-black uppercase tracking-widest text-xs">Unggah Dokumen</h3>
                </div>
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-white/10 rounded-2xl p-10 flex flex-col items-center justify-center gap-3 hover:border-primary/50 transition-colors cursor-pointer relative bg-white/[0.02]">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <Upload size={32} />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-black">Seret atau Klik di sini</p>
                      <p className="text-[10px] text-text-dim mt-1">PDF, JPG, PNG, DOC (Max 10MB)</p>
                    </div>
                    <input 
                      type="file" 
                      multiple 
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      onChange={handleFileChange}
                    />
                  </div>
                  
                  {formData.files.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-[10px] font-black uppercase tracking-widest text-text-dim ml-1">File Terlampir:</p>
                      <div className="grid grid-cols-1 gap-2">
                        {formData.files.map((f, i) => (
                          <div key={i} className="text-[11px] bg-white/5 border border-white/10 p-3 rounded-xl truncate flex items-center gap-3">
                            <FileText size={14} className="text-primary" /> 
                            <span className="flex-1 truncate">{f}</span>
                            <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center">
                              <ChevronRight size={10} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex flex-col gap-4 pt-4">
          <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 mb-2">
            <Shield size={18} className="text-emerald-500" />
            <p className="text-[10px] font-bold text-emerald-500 leading-tight">
              Identitas Anda akan disembunyikan dan dienkripsi secara aman dalam sistem kami.
            </p>
          </div>

          {step < 3 ? (
            <button 
              type="button" 
              onClick={nextStep}
              className="btn-primary w-full flex items-center justify-center gap-3 py-5"
            >
              Lanjutkan <ChevronRight size={20} />
            </button>
          ) : (
            <button 
              type="submit" 
              className="btn-primary w-full flex items-center justify-center gap-3 py-5"
            >
              Kirim Laporan <Send size={20} />
            </button>
          )}


          {step > 1 && (
            <button 
              type="button" 
              onClick={prevStep}
              className="py-4 text-text-dim font-black uppercase tracking-[0.2em] text-[10px] hover:text-white transition-colors"
            >
              Kembali ke sebelumnya
            </button>
          )}
        </div>
      </form>
    </div>
  )
}

