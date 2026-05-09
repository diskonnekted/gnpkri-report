import React from 'react';

export function Badge({ children, variant = 'default', className = '' }) {
  const variants = {
    default: "bg-white/10 text-white border-white/20",
    primary: "bg-primary/20 text-primary border-primary/30",
    success: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    warning: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
