import  { useEffect } from 'react'
import { useAppDispatch } from '../../redux/store'
import { fetchInvestmentList } from '../../redux/slice/investmentsListSlice'
import { InvestmentChartAndSummary } from './component/InventmentChartAndSummary';


const IndexDashboard = () => {
  const dispatch=useAppDispatch()


  // Move useEffect here, before any early returns
  useEffect(() => {
      dispatch(fetchInvestmentList());
    }, [dispatch]); // Include dispatch in the dependency array 

  return (
    <>
      <InvestmentChartAndSummary/>
    </>
  )
}

export default IndexDashboard