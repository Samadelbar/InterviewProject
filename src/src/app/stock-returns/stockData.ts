import { baseResponseModel } from "../model/baseResponseModel";

export interface StockData {
    symbol: number;
    sector: number;
    index: number
  }
  export interface StockDataResponse extends baseResponseModel{
   
    week: number;
    month: number;
    year: number;
  }
  