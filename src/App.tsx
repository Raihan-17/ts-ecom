// import { useState } from 'react'
import { BrowserRouter as Router } from 'react-router'

import './App.css'
import Sidebar  from './components/Sidebar.tsx'
import { FilterProvider } from './components/FilterContext.tsx'

function App() {


  return (
  <Router>
    <div className="flex h-screen">
      <FilterProvider>
        <Sidebar />
      </FilterProvider>
    </div>
  </Router>
  )
}

export default App
