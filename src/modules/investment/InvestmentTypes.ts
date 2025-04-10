import { API_STATUS_TYPE } from "../../utils/globalTypes";

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