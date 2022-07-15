import { baseResponseModel } from "../model/baseResponseModel";

export interface StockData {
   
  }
  export interface StockDataResponse extends baseResponseModel{
    symbol: number;
    sector: number;
    index: number;
    week: number;
    month: number;
    year: number;
  }
  