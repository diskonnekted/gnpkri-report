import React from 'react'

const LOGO_URL = "https://blogger.googleusercontent.com/img/a/AVvXsEgNvFL9p6b5fyeBR96o3V2zlS7WQT-LglyPN5Fg-B9dHBZABUYEnQtYqlsjLfpQlZJ_fmzaNr5-zLwG4yGNUppRtd2o5_z72AWgDnE6UfleP7pPFEb4QDDFbD2rza8tymBv3Cn9YuFbS_EtScydf6b3LB6wjBpkXVV8F4e8FW6xEhtZEWCyDl-grH6dYSRp=s600"

export default function Header() {
  return (
    <header className="sticky top-0 z-50 px-6 py-4 flex items-center gap-4 glass border-none">
      <div className="relative flex-shrink-0 w-12 h-12 flex items-center justify-center">
        <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full animate-pulse" />
        <img 
          src={LOGO_URL} 
          alt="GNPK RI Logo" 
          className="relative w-full h-full object-contain"
        />
      </div>
      <div className="flex-1">
        <h1 className="text-xl font-black tracking-tighter text-white leading-none">GNPK RI</h1>
        <p className="text-[10px] uppercase tracking-[0.4em] text-primary font-black mt-1 opacity-80">BANJARNEGARA</p>
      </div>
      <div className="w-10 h-10 rounded-2xl border border-white/10 flex items-center justify-center bg-white/5 shadow-inner">
        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_15px_#10b981] animate-pulse" />
      </div>
    </header>
  )
}
