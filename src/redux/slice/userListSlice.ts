import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosHttp from "../../utils/interceptors"; 
import { API_STATUS_TYPE } from "../../utils/globalTypes";
import { fetchUserSliceType, UserListType } from "../../modules/users/IndexUsersTypes";


const initialState: fetchUserSliceType = {
  status: API_STATUS_TYPE.NONE,
  resData: null, 
  filteredList:null
};

// Use `unknown` for better TypeScript safety
export const fetchUsers = createAsyncThunk<
UserListType[], 
void, 
  { rejectValue: string }
>("users/fetchUsers", async (_, { rejectWithValue }) => {
  try {
    const response = await axiosHttp.get("/users");
    return response.data; 
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Something went wrong";
    return rejectWithValue(errorMessage);
  }
});

const userListSlice = createSlice({
  name: "fetchUser",
  initialState,
  reducers: {
    resetUserListSlice: () => initialState,
    updateFilteredList:(state,{payload})=>{
      state.filteredList=payload
    }
 
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = API_STATUS_TYPE.PENDING;
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<UserListType[]>) => {
        state.status = API_STATUS_TYPE.SUCCESS;
        if(action.payload){          
          state.filteredList = action.payload; 
          state.resData = action.payload; 
        }
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.status = API_STATUS_TYPE.ERROR;
        state.resData = null;  
      });
  },
});

export const { resetUserListSlice ,updateFilteredList} = userListSlice.actions;
export default userListSlice.reducer;
