import { configureStore } from "@reduxjs/toolkit"; 
import { useDispatch } from "react-redux";
import investmentsListSlice from "./slice/investmentsListSlice"
import addInvestmentSlice from "./slice/addInvestmentSlice"

export const store=configureStore({
    reducer:{
        investmentList:investmentsListSlice,
        addInvestment:addInvestmentSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();