import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosHttp from "../../utils/interceptors"; 
import { API_STATUS_TYPE } from "../../utils/globalTypes";  
import { fetchInvestmentSliceType, fetchInvestmentSliceTypeListType } from "../../modules/investment/InvestmentTypes";


const initialState: fetchInvestmentSliceType = {
  status: API_STATUS_TYPE.NONE,
  resData: null,  
};

// Use `unknown` for better TypeScript safety
export const fetchInvestmentList= createAsyncThunk<
fetchInvestmentSliceTypeListType[], 
void, 
  { rejectValue: string }
>("users/fetchfetchInvestmentSliceType", async (_, { rejectWithValue }) => {
  try {
    const response = await axiosHttp.get("/get");
    return response.data; 
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Something went wrong";
    return rejectWithValue(errorMessage);
  }
});

const investmentListSlice = createSlice({
  name: "fetchUser",
  initialState,
  reducers: {
    resetInvestmentListSlice: () => initialState,
    updateFilteredList:(state,{payload})=>{
      // state.filteredList=payload
    }
 
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInvestmentList.pending, (state) => {
        state.status = API_STATUS_TYPE.PENDING;
      })
      .addCase(fetchInvestmentList.fulfilled, (state, action: PayloadAction<fetchInvestmentSliceTypeListType[]>) => {
        state.status = API_STATUS_TYPE.SUCCESS;
        if(action.payload){           
          state.resData = action.payload; 
        }
      })
      .addCase(fetchInvestmentList.rejected, (state) => {
        state.status = API_STATUS_TYPE.ERROR;
        state.resData = null;  
      });
  },
});

export const { resetInvestmentListSlice ,updateFilteredList} = investmentListSlice.actions;
export default investmentListSlice.reducer;
