import React from 'react';
import { motion } from 'framer-motion';

export function Button({ children, variant = 'primary', className = '', fullWidth = false, ...props }) {
  const baseStyles = "relative inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold text-sm tracking-widest uppercase transition-all overflow-hidden";
  const variants = {
    primary: "bg-primary text-white hover:bg-primary-light shadow-glow",
    secondary: "bg-bg-glass text-text-main border border-border-glass hover:bg-white/5",
    ghost: "bg-transparent text-text-dim hover:text-white hover:bg-white/5",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.97 }}
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {/* Shine effect for primary */}
      {variant === 'primary' && (
        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent hover:animate-[shimmer_1.5s_infinite]" />
      )}
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.button>
  );
}
