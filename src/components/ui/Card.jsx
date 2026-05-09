import React from 'react';
import { motion } from 'framer-motion';

export function Card({ children, className = '', hover = false, ...props }) {
  return (
    <div 
      className={`relative bg-bg-surface-elevated border border-border-glass rounded-2xl p-5 overflow-hidden backdrop-blur-xl ${hover ? 'transition-all hover:border-primary/30 hover:shadow-glow' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function AnimatedCard({ children, className = '', delay = 0, ...props }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.23, 1, 0.32, 1] }}
      className={`relative bg-bg-surface-elevated border border-border-glass rounded-2xl p-5 overflow-hidden backdrop-blur-xl ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}
