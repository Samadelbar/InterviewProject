export interface StockData {
  symbol: string;
  sector: string;
  index: string;
  isError: boolean;
  message: string;
  statusCode: number;
  result: StockDataResponse;
}
export interface StockDataResponse {
  week: number;
  month: number;
  year: number;
}
