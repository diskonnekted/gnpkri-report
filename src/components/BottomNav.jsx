import React from 'react'
import { Home, BarChart3, UserCheck } from 'lucide-react'

export default function BottomNav({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'home', icon: Home, label: 'Lapor' },
    { id: 'progress', icon: BarChart3, label: 'Progress' },
    { id: 'login', icon: UserCheck, label: 'Login' },
  ]

  return (
    <nav 
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#0A0C10',
        height: '85px',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        zIndex: 1000,
        borderTop: '1px solid rgba(255,255,255,0.08)',
        paddingBottom: 'env(safe-area-inset-bottom)'
      }}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              background: 'transparent',
              border: 'none',
              color: isActive ? '#E31E24' : '#94A3B8',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
              width: '100%',
              cursor: 'pointer',
              position: 'relative'
            }}
          >
            {isActive && (
              <div style={{
                position: 'absolute',
                top: '-32px',
                width: '40px',
                height: '3px',
                backgroundColor: '#E31E24',
                borderRadius: '0 0 4px 4px',
                boxShadow: '0 0 15px rgba(227, 30, 36, 0.5)'
              }} />
            )}
            <tab.icon size={24} strokeWidth={isActive ? 3 : 2} />
            <span style={{ fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              {tab.label}
            </span>
          </button>
        )
      })}
    </nav>
  )
}
