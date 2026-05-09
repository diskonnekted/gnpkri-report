import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Header from './components/Header'
import BottomNav from './components/BottomNav'
import Home from './pages/Home'
import SuccessPage from './pages/SuccessPage'
import Progress from './pages/Progress'
import Login from './pages/Login'

function App() {
  const [activeTab, setActiveTab] = useState('home') // home, progress, login
  const [reports, setReports] = useState([])
  const [isSuccess, setIsSuccess] = useState(false)

  // Load reports from local storage on mount
  useEffect(() => {
    const savedReports = localStorage.getItem('gnpk_reports')
    if (savedReports) {
      setReports(JSON.parse(savedReports))
    }
  }, [])

  const handleAddReport = (newReport) => {
    const updatedReports = [...reports, { ...newReport, id: Date.now(), status: 'Pending', date: new Date().toISOString() }]
    setReports(updatedReports)
    localStorage.setItem('gnpk_reports', JSON.stringify(updatedReports))
    setIsSuccess(true)
    setTimeout(() => {
      setIsSuccess(false)
      setActiveTab('progress')
    }, 3000)
  }

  return (
    <div className="min-h-screen pb-40 bg-bg-deep text-text-main overflow-x-hidden relative">
      {/* Dynamic Background Blobs */}
      <motion.div 
        animate={{ 
          x: [0, 50, 0], 
          y: [0, -30, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="blob -top-20 -left-20" 
      />
      <motion.div 
        animate={{ 
          x: [0, -40, 0], 
          y: [0, 60, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="blob -bottom-20 -right-20" 
        style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)' }}
      />

      <Header />
      
      <main className="px-5 pt-6 pb-32 max-w-lg mx-auto relative z-10">
        <AnimatePresence mode="wait">
          {isSuccess ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
            >
              <SuccessPage />
            </motion.div>
          ) : activeTab === 'home' ? (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Home onSubmit={handleAddReport} />
            </motion.div>
          ) : activeTab === 'progress' ? (
            <motion.div
              key="progress"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Progress reports={reports} />
            </motion.div>
          ) : (
            <motion.div
              key="login"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Login />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {!isSuccess && <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />}
    </div>
  )
}

export default App

