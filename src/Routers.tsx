import React from 'react'
import { Route, Routes } from 'react-router-dom'
import IndexDashboard from './modules/dashboard/IndexDashboard'
import IndexSidenavBar from './components/sidenavBar/IndexSidenavBar'
import IndexInvestment from './modules/investment/IndexInvestment'
import PageNotFound from './modules/page_not_found/PageNotFound'

const Routers = () => {
  return (
    <Routes>
    {/* Home Page - List of Users */}
        <Route path='/' element={<IndexSidenavBar/>}>
            <Route path="" element={<IndexDashboard />} /> 
            <Route path="dashboard" element={<IndexDashboard />} /> 
            <Route path="investment" element={<IndexInvestment />} /> 
            <Route path="*" element={<PageNotFound />} /> 
        </Route>
  </Routes>
  )
}

export default Routers