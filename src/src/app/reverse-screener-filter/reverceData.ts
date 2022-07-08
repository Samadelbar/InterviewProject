import { baseResponseModel } from "../model/baseResponseModel";

export interface reverseItem {
  code: number;
  text: string;
  title: string;
}
export interface iReverseResponse extends baseResponseModel {
  result: reverseItem[];
}
export class ReverseResponse implements iReverseResponse {
  result: reverseItem[] = [];
  isError: boolean = false;
  message: string = "";
  statusCode: number = 0;
}
