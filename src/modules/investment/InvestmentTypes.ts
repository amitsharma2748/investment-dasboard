import { API_STATUS_TYPE } from "../../utils/globalTypes";
import { investmentSchema } from "./yupValidators";
import * as yup from "yup";

export interface fetchInvestmentSliceType{
    status: API_STATUS_TYPE,
     resData: fetchInvestmentSliceTypeListType[]|null,  
}


export interface fetchInvestmentSliceTypeListType{
    id:string,
    name:string,
    amount:number,
    date:number,
    roi:number
}

export type InvestmentFormData = yup.InferType<typeof investmentSchema>;