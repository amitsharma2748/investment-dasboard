import React, { useEffect } from 'react'
import { useAppDispatch } from '../../redux/store'
import { fetchInvestmentList } from '../../redux/slice/investmentsListSlice'
import { InvestmentTable } from './component/InvestmentTable'
import InvestmentActionBar from './component/InvestmentActionBar'




const IndexInvestment = () => {
    const dispatch=useAppDispatch()
    useEffect(()=>{
        dispatch(fetchInvestmentList())
    },[])
  return (
    < >
        <InvestmentActionBar/>
        <InvestmentTable/>
    </>
  )
}

export default IndexInvestment