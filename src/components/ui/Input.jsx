import React from 'react';

export function Input({ label, icon: Icon, className = '', ...props }) {
  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <label className="text-[10px] font-black uppercase tracking-widest text-text-dim ml-2">
          {label}
        </label>
      )}
      <div className="relative group">
        {Icon && (
          <Icon 
            size={18} 
            className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-primary transition-colors" 
          />
        )}
        <input 
          className={`w-full bg-black/20 border border-border-glass rounded-xl p-4 text-sm text-white placeholder:text-text-muted transition-all focus:border-primary/50 focus:bg-primary/5 focus:shadow-glow ${Icon ? 'pl-11' : ''}`}
          {...props}
        />
      </div>
    </div>
  );
}

export function Textarea({ label, className = '', ...props }) {
  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <label className="text-[10px] font-black uppercase tracking-widest text-text-dim ml-2">
          {label}
        </label>
      )}
      <textarea 
        className="w-full bg-black/20 border border-border-glass rounded-xl p-4 text-sm text-white placeholder:text-text-muted transition-all focus:border-primary/50 focus:bg-primary/5 focus:shadow-glow resize-none min-h-[120px]"
        {...props}
      />
    </div>
  );
}
