import { API_STATUS_TYPE } from "../../utils/globalTypes";

export interface fetchUserSliceType {
    status: API_STATUS_TYPE;
    resData:UserListType[]|null
    filteredList:UserListType[]|null
}

export interface fetchUserDetailType{
    status: API_STATUS_TYPE;
    userData:UserListType|null
}

export type Geo = {
    lat: string;
    lng: string;
  };
  
  export type Address = {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: Geo;
  };
  
  export type Company = {
    name: string;
    catchPhrase: string;
    bs: string;
  };
  
  export interface UserListType  {
    id: number;
    name: string;
    username: string;
    email: string;
    address: Address;
    phone: string;
    website: string;
    company: Company;
  };
  
  export enum TABLE_HEADER {
    ID = "ID",
    NAME = "Name",
    EMAIL = "Email",
    COMPANY = "Company",
  }
  
  // Convert enum values into an array for dropdown
  export const headerOptions = Object.values(TABLE_HEADER);
  