import React from 'react'

const LOGO_URL = "https://blogger.googleusercontent.com/img/a/AVvXsEgNvFL9p6b5fyeBR96o3V2zlS7WQT-LglyPN5Fg-B9dHBZABUYEnQtYqlsjLfpQlZJ_fmzaNr5-zLwG4yGNUppRtd2o5_z72AWgDnE6UfleP7pPFEb4QDDFbD2rza8tymBv3Cn9YuFbS_EtScydf6b3LB6wjBpkXVV8F4e8FW6xEhtZEWCyDl-grH6dYSRp=s600"

export default function Header() {
  return (
    <header 
      className="sticky top-0 z-50 flex items-center gap-4 overflow-hidden"
      style={{ 
        backgroundColor: 'white', 
        padding: '12px 24px', 
        borderBottom: '1px solid rgba(0,0,0,0.1)' 
      }}
    >
      <div style={{ width: '48px', height: '48px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img 
          src={LOGO_URL} 
          alt="GNPK RI Logo" 
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />
      </div>
      <div className="flex-1">
        <h1 style={{ color: '#0f172a', fontWeight: 900, fontSize: '20px', letterSpacing: '-0.5px', margin: 0, lineHeight: 1 }}>
          GNPK RI
        </h1>
        <p style={{ color: '#E31E24', fontWeight: 800, fontSize: '12px', letterSpacing: '0.5em', marginTop: '-4px', textTransform: 'uppercase' }}>
          BANJARNEGARA
        </p>
      </div>
    </header>
  )
}
