// import { useState } from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router'

import './App.css'
import Sidebar  from './components/Sidebar.tsx'
import { FilterProvider } from './components/FilterContext.tsx'
import MainContent from './components/MainContent.tsx'

function App() {


  return (
  <Router>
    <div className="flex h-screen">
      <FilterProvider>
        <Sidebar />
{/* maincontent section */}
<div className="rounded w-full flex justify-between flex-wrap">
  <Routes>
    <Route path="/" element={
      
        <MainContent />
    
      } />
  </Routes>
</div>
</FilterProvider>
    </div>
  </Router>
  )
}

export default App
