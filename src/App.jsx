import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import BottomNav from './components/BottomNav'
import Home from './pages/Home'
import SuccessPage from './pages/SuccessPage'
import Progress from './pages/Progress'
import Login from './pages/Login'

function App() {
  const [activeTab, setActiveTab] = useState('home')
  const [reports, setReports] = useState([])
  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(() => {
    const savedReports = localStorage.getItem('gnpk_reports')
    if (savedReports) setReports(JSON.parse(savedReports))
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
    <div className="min-h-screen bg-deep overflow-x-hidden">
      <Header />
      
      <main className="px-4 pt-4 pb-32 mx-auto max-w-lg">
        {isSuccess ? (
          <SuccessPage />
        ) : activeTab === 'home' ? (
          <Home onSubmit={handleAddReport} />
        ) : activeTab === 'progress' ? (
          <Progress reports={reports} />
        ) : (
          <Login />
        )}
      </main>

      {!isSuccess && <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />}
    </div>
  )
}

export default App
