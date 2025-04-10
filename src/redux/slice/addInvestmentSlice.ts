import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosHttp from "../../utils/interceptors"; 
import { API_STATUS_TYPE } from "../../utils/globalTypes"; 
import { fetchInvestmentSliceType } from "../../modules/investment/InvestmentTypes";

 

const initialState: fetchInvestmentSliceType = {
  status: API_STATUS_TYPE.NONE, 
  resData:null
};

// ✅ Fetch Single User
export const addInvestment = createAsyncThunk<
any, 
  any, 
  { rejectValue: string }
>("users/fetchUser", async (addInvestmentPayload, { rejectWithValue }) => {
  try {
    const response = await axiosHttp.post(`/get`,addInvestmentPayload);
    return response.data;
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Something went wrong";
    return rejectWithValue(errorMessage);
  }
});

const addInvestmentSlice = createSlice({
  name: "fetchUser",
  initialState,
  reducers: {
    resetAddInvestmentSlice: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(addInvestment.pending, (state) => {
        state.status = API_STATUS_TYPE.PENDING;
      })
      .addCase(addInvestment.fulfilled, (state, action: PayloadAction<fetchInvestmentSliceType>) => {
 
        state.status = API_STATUS_TYPE.SUCCESS;
        
      })
      .addCase(addInvestment.rejected, (state) => {
        state.status = API_STATUS_TYPE.ERROR;
        
      });
  },
});

export const { resetAddInvestmentSlice } = addInvestmentSlice.actions;
export default addInvestmentSlice.reducer;
