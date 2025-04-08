import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosHttp from "../../utils/interceptors"; 
import { API_STATUS_TYPE } from "../../utils/globalTypes";
import { fetchUserDetailType, UserListType } from "../../modules/users/IndexUsersTypes";

 

const initialState: fetchUserDetailType = {
  status: API_STATUS_TYPE.NONE,
  userData: null,
};

// ✅ Fetch Single User
export const fetchUser = createAsyncThunk<
UserListType, 
  number, 
  { rejectValue: string }
>("users/fetchUser", async (userId, { rejectWithValue }) => {
  try {
    const response = await axiosHttp.get(`/users/${userId}`);
    return response.data;
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Something went wrong";
    return rejectWithValue(errorMessage);
  }
});

const userDetailSlice = createSlice({
  name: "fetchUser",
  initialState,
  reducers: {
    resetUserDetailSlice: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = API_STATUS_TYPE.PENDING;
      })
      .addCase(fetchUser.fulfilled, (state, action: PayloadAction<UserListType>) => {
        state.status = API_STATUS_TYPE.SUCCESS;
        state.userData = action.payload;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.status = API_STATUS_TYPE.ERROR;
        state.userData = null;
      });
  },
});

export const { resetUserDetailSlice } = userDetailSlice.actions;
export default userDetailSlice.reducer;
