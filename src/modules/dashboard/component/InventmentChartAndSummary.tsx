import {
  Box,
  Stat,
  StatLabel,
  StatNumber, // Replaces Stat.ValueText
  StatGroup,
  Text,
  Spinner,
} from "@chakra-ui/react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { RootState, useAppDispatch } from "../../../redux/store";
import { useEffect } from "react";
import { fetchInvestmentList } from "../../../redux/slice/investmentsListSlice";
import { useSelector } from "react-redux";
import { API_STATUS_TYPE } from "../../../utils/globalTypes";
import { fetchInvestmentSliceTypeListType } from "../../investment/InvestmentTypes";
import { useTranslation } from "react-i18next";

export const InvestmentChartAndSummary = () => {
  const dispatch = useAppDispatch();
  const {t}=useTranslation()
  const { resData: investmentListData, status: investmentStatus } = useSelector(
    (state: RootState) => state.investmentList as {
      resData: fetchInvestmentSliceTypeListType[] | undefined;
      status: API_STATUS_TYPE;
    }
  );

  // Fetch investment data when component mounts
  useEffect(() => {
    dispatch(fetchInvestmentList());
  }, [dispatch]);

  // Handle loading state
  if (
    investmentStatus === API_STATUS_TYPE.PENDING ||
    investmentStatus === API_STATUS_TYPE.NONE
  ) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <Spinner size="lg" />
      </Box>
    );
  }

  // Handle error state
  if (investmentStatus === API_STATUS_TYPE.ERROR) {
    return <Text color="red.500">Error fetching investment data</Text>;
  }

  // Handle empty or null data
  if (!investmentListData || investmentListData.length === 0) {
    return <Text>No investment data available</Text>;
  }

  // Prepare chart data: extract date and roi, sort by date
  const chartData = investmentListData
    .map((inv: fetchInvestmentSliceTypeListType) => ({
      date: inv.date ? inv.date * 1000 : Date.now(), // Fallback if date is missing
      roi: inv.roi,
    }))
    .sort((a, b) => a.date - b.date);

  // Calculate total investments and average ROI
  const totalInvestments = investmentListData.reduce(
    (sum, inv) => sum + inv.amount,
    0
  );
  const averageRoi =
    investmentListData.reduce((sum, inv) => sum + inv.roi, 0) /
    investmentListData.length;

  // Custom tooltip formatter
  const tooltipFormatter = (value: number, name: string) => {
    if (name === "ROI") return [`${value}%`, name];
    return [value, name];
  };

  // Custom date formatter for tooltip
  const labelFormatter = (label: number) =>
    new Date(label).toLocaleString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  return (
    <Box width="full" p={4}>
      {/* Summary Card */}
      <StatGroup gap={4} mb={6} p={4} borderWidth="1px" borderRadius="md" bg="gray.50">
        <Stat>
          <StatLabel> {t("total")+" "+t('investments')}</StatLabel>
          <StatNumber>${totalInvestments.toLocaleString()}</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>{t('average')} ROI</StatLabel>
          <StatNumber>{averageRoi.toFixed(2)}%</StatNumber>
        </Stat>
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
            tick={{ fontSize: 10, textAnchor: "end" }}
            height={70}
            domain={["dataMin", "dataMax"]}
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
            name="ROI"
          />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};