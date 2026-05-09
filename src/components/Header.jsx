import React from 'react'

const LOGO_URL = "https://blogger.googleusercontent.com/img/a/AVvXsEgNvFL9p6b5fyeBR96o3V2zlS7WQT-LglyPN5Fg-B9dHBZABUYEnQtYqlsjLfpQlZJ_fmzaNr5-zLwG4yGNUppRtd2o5_z72AWgDnE6UfleP7pPFEb4QDDFbD2rza8tymBv3Cn9YuFbS_EtScydf6b3LB6wjBpkXVV8F4e8FW6xEhtZEWCyDl-grH6dYSRp=s600"

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-bg-surface/80 backdrop-blur-xl border-b border-border-glass">
      <div className="px-5 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 flex-shrink-0 bg-white/5 rounded-xl flex items-center justify-center border border-white/10 overflow-hidden">
            <div className="absolute inset-0 bg-primary/20 blur-md animate-pulse-slow" />
            <img 
              src={LOGO_URL} 
              alt="GNPK RI Logo" 
              className="relative w-8 h-8 object-contain"
            />
          </div>
          <div>
            <h1 className="text-white font-black text-lg tracking-tighter leading-none">
              GNPK RI
            </h1>
            <p className="text-primary font-black text-[9px] tracking-[0.3em] uppercase mt-0.5">
              Banjarnegara
            </p>
          </div>
        </div>
        
        <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center bg-white/5 shrink-0 shadow-inner">
          <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399] animate-pulse-slow" />
        </div>
      </div>
    </header>
  )
}

