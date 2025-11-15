// import { useState } from 'react'
import { BrowserRouter as Router } from 'react-router'

import './App.css'
import Sidebar  from './components/Sidebar.tsx'

function App() {


  return (
  <Router>
    <div className="flex h-screen">
      <Sidebar/>
      
    </div>
  </Router>
  )
}

export default App
