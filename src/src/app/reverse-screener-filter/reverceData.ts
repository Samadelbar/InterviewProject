import { baseResponseModel } from "../model/baseResponseModel";

export interface reverseItem extends baseResponseModel {
  code: number;
  text: string;
  title: string;
}
