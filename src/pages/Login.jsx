import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { UserPlus, LogIn, Mail, Lock, ShieldCheck } from 'lucide-react'

export default function Login({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isLogin) {
      if (email === 'admin' && password === 'admin123') {
        onLogin(true)
      } else {
        setError('Kredensial tidak valid. Gunakan admin/admin123')
      }
    } else {
      alert('Fitur registrasi dinonaktifkan untuk sementara.')
    }
  }

  return (
    <div className="space-y-8 animate-slide-up pb-12">
      <div className="pt-4 text-center space-y-2">
        <div className="w-16 h-16 bg-primary/10 rounded-3xl flex items-center justify-center text-primary mx-auto mb-4">
          <ShieldCheck size={32} />
        </div>
        <h2 className="text-3xl font-black">{isLogin ? 'Membership Login' : 'Registrasi Anggota'}</h2>
        <p className="text-text-dim text-xs font-bold uppercase tracking-widest px-8">
          Bergabunglah sebagai mitra strategis GNPK RI Banjarnegara
        </p>
      </div>

      <form onSubmit={handleSubmit} className="card glass-dark p-8 space-y-6">
        {error && (
          <div className="bg-primary/10 border border-primary/20 p-3 rounded-xl text-primary text-[10px] font-bold text-center">
            {error}
          </div>
        )}
        <div className="space-y-4">
          {!isLogin && (
            <div className="space-y-1">
               <label className="text-[10px] font-black uppercase tracking-widest text-text-dim ml-2">Nama Lengkap</label>
               <input type="text" placeholder="Masukkan nama..." className="input-field" />
            </div>
          )}
          <div className="space-y-1">
             <label className="text-[10px] font-black uppercase tracking-widest text-text-dim ml-2">Email / Username</label>
             <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-text-dim" size={18} />
                <input 
                  type="text" 
                  placeholder="admin" 
                  className="input-field pl-12" 
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
             </div>
          </div>
          <div className="space-y-1">
             <label className="text-[10px] font-black uppercase tracking-widest text-text-dim ml-2">Password</label>
             <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-text-dim" size={18} />
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  className="input-field pl-12" 
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
             </div>
          </div>
        </div>

        <button type="submit" className="btn-primary w-full flex items-center justify-center gap-3">
          {isLogin ? <LogIn size={20} /> : <UserPlus size={20} />}
          {isLogin ? 'Masuk Sekarang' : 'Daftar Anggota'}
        </button>

        <div className="text-center">
          <button 
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-xs font-bold text-text-dim hover:text-primary transition-colors"
          >
            {isLogin ? 'Belum punya akun? Daftar di sini' : 'Sudah punya akun? Login di sini'}
          </button>
        </div>
      </form>

      <div className="card bg-primary/5 border-primary/20 p-4">
        <p className="text-[10px] text-center text-primary font-bold leading-relaxed">
          * Menjadi anggota GNPK RI memberikan Anda akses prioritas dalam pemantauan kasus dan pendidikan anti-korupsi.
        </p>
      </div>
    </div>
  )
}

