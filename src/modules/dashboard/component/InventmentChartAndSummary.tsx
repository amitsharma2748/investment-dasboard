import {
    Box,
    Stat,
    StatLabel, 
    StatGroup,
    Text,
    Spinner,
  } from '@chakra-ui/react';
  import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
  } from 'recharts';
  import { RootState, useAppDispatch } from '../../../redux/store';
  import { useEffect } from 'react';
  import { fetchInvestmentList } from '../../../redux/slice/investmentsListSlice';
  import { useSelector } from 'react-redux';
  import { API_STATUS_TYPE } from '../../../utils/globalTypes';
  import { fetchInvestmentSliceTypeListType } from '../../investment/InvestmentTypes';
  
  export const InvestmentChartAndSummary = () => {
    const dispatch = useAppDispatch();
    const { resData: investmentListData, status: InvestmentStatus } = useSelector(
      (state: RootState) => state.investmentList
    );
  
    // Fetch investment data when component mounts
    useEffect(() => {
      dispatch(fetchInvestmentList());
    }, [dispatch]);
   
  
    // Handle loading state
    if (InvestmentStatus === API_STATUS_TYPE.PENDING || InvestmentStatus === API_STATUS_TYPE.NONE) {
      return <Spinner size="lg" />;
    }
  
    // Handle error state
    if (InvestmentStatus === API_STATUS_TYPE.ERROR) {
      return <Text color="red.500">Error fetching investment data</Text>;
    }
  
    // Handle empty or null data
    if (!investmentListData || investmentListData.length === 0) {
      return <Text>No investment data available</Text>;
    }
  
    // Prepare chart data: extract date and roi, sort by date
    const chartData = investmentListData
      .map((inv: fetchInvestmentSliceTypeListType) => ({ 
        date: inv.date * 1000, // Convert seconds to milliseconds
        roi: inv.roi 
      }))
      .sort((a, b) => a.date - b.date); // Simplified sort since dates are now comparable numbers
  
    // Calculate total investments and average ROI
    const totalInvestments = investmentListData.reduce(
      (sum, inv) => sum + inv.amount, 
      0
    );
    
    const averageRoi = investmentListData.reduce(
      (sum, inv) => sum + inv.roi, 
      0
    ) / investmentListData.length;
  
    // Custom tooltip formatter for better readability
    const tooltipFormatter = (value: number, name: string) => {
      if (name === "roi") return `${value}%`;
      return value;
    };
  
    // Custom date formatter for tooltip
    const labelFormatter = (label: number) => {
      return new Date(label).toLocaleString();
    };
  
    return (
      <Box width={"full"} m={4}>
        {/* Summary Card */}
        <StatGroup mb={4}>
          <Stat.Root>
            <Stat.Label>Total Investments</Stat.Label>
            <Stat.ValueText>${totalInvestments}</Stat.ValueText>
          </Stat.Root>
          <Stat.Root>
            <Stat.Label>Average ROI</Stat.Label>
            <Stat.ValueText>{averageRoi.toFixed(2)}%</Stat.ValueText>
          </Stat.Root>
        </StatGroup>
  
        {/* Line Chart */}
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
            dataKey="date" 
            scale="time"
            type="number"
            tickFormatter={(time) => new Date(time).toLocaleDateString()}
            tick={{ fontSize: 10,  textAnchor: 'end' }}
            height={70}
            domain={['dataMin', 'dataMax']}
            padding={{ left: 30, right: 30 }}
            />
            <YAxis 
              tickFormatter={(value) => `${value}%`}
              tick={{ fontSize: 12 }}
            />
            <Tooltip 
              formatter={tooltipFormatter}
              labelFormatter={labelFormatter}
            />
            <Line 
              type="monotone" 
              dataKey="roi" 
              stroke="#8884d8" 
              dot={{ stroke: "#8884d8", r: 4 }} 
              isAnimationActive={false}
              name="ROI"
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    );
  };