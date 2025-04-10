import { configureStore } from "@reduxjs/toolkit"; 
import { useDispatch } from "react-redux";
import investmentsListSlice from "./slice/investmentsListSlice"
import userDetailSlice from "./slice/userDetailSlice"

export const store=configureStore({
    reducer:{
        investmentList:investmentsListSlice,
        userDetail:userDetailSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();