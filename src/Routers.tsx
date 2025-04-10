import React from 'react'
import { Route, Routes } from 'react-router-dom'
import IndexDashboard from './modules/dashboard/IndexDashboard'
import IndexSidenavBar from './components/sidenavBar/IndexSidenavBar'
import IndexInvestment from './modules/investment/IndexInvestment'

const Routers = () => {
  return (
    <Routes>
    {/* Home Page - List of Users */}
        <Route path='/' element={<IndexSidenavBar/>}>
            <Route path="dashboard" element={<IndexDashboard />} /> 
            <Route path="investment" element={<IndexInvestment />} /> 
        </Route>
  </Routes>
  )
}

export default Routers