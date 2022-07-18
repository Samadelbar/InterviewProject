import { baseResponseModel } from "../model/baseResponseModel";

export interface Symbol {
  week: number;
  month: number;
  year: number;
}

export interface Sector {
  week: number;
  month: number;
  year: number;
}

export interface Index {
  week: number;
  month: number;
  year: number;
}

export interface StockDataResponse extends baseResponseModel {
  symbol: Symbol;
  sector: Sector;
  index: Index;
}


