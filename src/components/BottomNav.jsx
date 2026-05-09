import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Home, BarChart3, UserCheck } from 'lucide-react'

export default function BottomNav({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'home', icon: Home, label: 'Lapor' },
    { id: 'progress', icon: BarChart3, label: 'Progress' },
    { id: 'login', icon: UserCheck, label: 'Login' },
  ]

  return (
    <nav className="bottom-nav">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative flex flex-col items-center justify-center gap-1 w-24 h-full bg-transparent border-none transition-colors duration-300 ${
              isActive ? 'text-primary' : 'text-text-dim'
            }`}
          >
            <AnimatePresence>
              {isActive && (
                <motion.div 
                  layoutId="active-pill"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  className="absolute inset-0 bg-primary/10 rounded-2xl -z-10" 
                />
              )}
            </AnimatePresence>
            <motion.div
              animate={{ scale: isActive ? 1.2 : 1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              <tab.icon size={22} strokeWidth={isActive ? 2.5 : 2} />
            </motion.div>
            <span className={`text-[8px] font-black uppercase tracking-[0.1em] transition-opacity ${isActive ? 'opacity-100' : 'opacity-40'}`}>
              {tab.label}
            </span>
          </button>
        )
      })}
    </nav>
  )
}
