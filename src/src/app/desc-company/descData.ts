import { baseResponseModel } from "../model/baseResponseModel";

export interface descResponseItems extends baseResponseModel{
  id: number;
  isin: string;
  symbolTitle: string;
  sectorTitle: string;
  title: string;
  summaryIntro: string;
  fullIntro: string;
  fundamentalSmartReview: string;
  technicalSmartReview: string;
  highlights: any[];
  affectingParameters: any[];
  finalComment: string;
  minimumPrice: number;
  maximumPrice: number;
  minimumFairValue: number;
  maximumFairValue: number;
  minimumDividend: number;
  maximumDividend: number;
  averageDividend: number;
  rate: number;
  companySizeEnum?: any;
  companyTypeEnum?: any;
  companySizeTitle: string;
  companyTypeTitle: string;
  companySize?: any;
  companyType?: any;
  sectorCode: string;
  companyIsin: string;
  companyTitle: string;
  symbolName: string;
}
