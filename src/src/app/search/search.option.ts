export interface SearchResponse {
  isError: boolean;
  message: string;
  totalRecords: number;
  pageSize: number;
  created: string;
  result: SearchResponseItem[];
  status: number,
}
export interface SearchResponseItem {
  tseInsCode: string;
  isin: string;
  enName: string;
  symbolEnName: string;
  title: string;
  name: string;
  symbol: string;
  companyPersianName: string;
  marketCap: number;
  score: number;
  status: number;
  exchangeTitle: string;
  boardTitle: string;
}
