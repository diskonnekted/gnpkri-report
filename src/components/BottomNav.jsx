import React from 'react'
import { Home, BarChart3, UserCheck } from 'lucide-react'

export default function BottomNav({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'home', icon: Home, label: 'Lapor' },
    { id: 'progress', icon: BarChart3, label: 'Progress' },
    { id: 'login', icon: UserCheck, label: 'Login' },
  ]

  return (
    <div className="fixed bottom-6 left-0 right-0 z-50 flex justify-center pointer-events-none px-4">
      <nav className="bg-bg-surface-elevated backdrop-blur-xl border border-border-highlight rounded-full p-1.5 flex items-center justify-between gap-2 shadow-glow pointer-events-auto">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex items-center gap-2.5 px-5 py-3 rounded-full transition-all duration-300 ${
                isActive ? 'bg-primary/20 text-white' : 'text-text-muted hover:text-white hover:bg-white/5'
              }`}
            >
              <tab.icon size={20} strokeWidth={isActive ? 2.5 : 2} className={isActive ? 'text-primary' : ''} />
              {isActive && (
                <span className="text-xs font-bold tracking-wide">
                  {tab.label}
                </span>
              )}
            </button>
          )
        })}
      </nav>
    </div>
  )
}
