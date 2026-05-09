import React from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, ShieldCheck } from 'lucide-react'

export default function SuccessPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', damping: 12, stiffness: 200 }}
        className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center shadow-xl shadow-emerald-500/20"
      >
        <CheckCircle size={48} className="text-white" />
      </motion.div>
      
      <div className="space-y-2">
        <h2 className="text-3xl font-black tracking-tight">Berhasil Terkirim!</h2>
        <p className="text-muted-foreground px-8 font-medium">Laporan Anda telah diterima oleh GNPK RI. Kami menjamin kerahasiaan identitas Anda tetap aman dan terlindungi.</p>
      </div>


      <div className="card glass p-4 flex items-center gap-4 max-w-xs border-l-4 border-l-emerald-500">
        <ShieldCheck className="text-emerald-500" size={32} />
        <div className="text-left">
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">ID Laporan</p>
          <p className="font-black text-lg">GNPK-{Math.floor(Math.random() * 1000000)}</p>
        </div>
      </div>

      <p className="text-[10px] text-muted-foreground animate-pulse font-bold">MENGALIHKAN KE HALAMAN UTAMA...</p>
    </div>
  )
}
