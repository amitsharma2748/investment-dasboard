import  { useEffect } from "react";
import { RootState, useAppDispatch } from "../../redux/store";
import { fetchInvestmentList } from "../../redux/slice/investmentsListSlice";
import { InvestmentTable } from "./component/InvestmentTable";
import InvestmentActionBar from "./component/InvestmentActionBar";
import { useSelector } from "react-redux";
import { API_STATUS_TYPE } from "../../utils/globalTypes";
import { enqueueSnackbar } from "notistack";
import { INVESTMENT_ADDED_SUCCESS, SOMETHING_WENT_WRONG } from "../../utils/contants";
import { resetAddInvestmentSlice } from "../../redux/slice/addInvestmentSlice";

// Main component for investment page
const IndexInvestment = () => {
  const dispatch = useAppDispatch();
  const addInvestmentStatus = useSelector((state: RootState) => state.addInvestment.status);

  // Handle add investment status changes
  useEffect(() => {
    switch (addInvestmentStatus) {
      case API_STATUS_TYPE.SUCCESS: { 
        enqueueSnackbar(INVESTMENT_ADDED_SUCCESS, {
          variant: "success",
          preventDuplicate: true,
        });
        dispatch(fetchInvestmentList());
        break;
      }
      case API_STATUS_TYPE.ERROR:
      case API_STATUS_TYPE.NOT_FOUND:
        enqueueSnackbar(SOMETHING_WENT_WRONG, {
          variant: "error",
          preventDuplicate: true,
        });
        break;
      default:
        break;
    }
  }, [addInvestmentStatus]);

  // Fetch investments on mount and reset on unmount
  useEffect(() => {
    dispatch(fetchInvestmentList());
    return () => {
      dispatch(resetAddInvestmentSlice());
    };
  }, []);

  return (
    <>
      <InvestmentActionBar />
      <InvestmentTable />
    </>
  );
};

export default IndexInvestment;