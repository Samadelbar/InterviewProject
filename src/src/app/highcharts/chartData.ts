import { baseResponseModel } from "../model/baseResponseModel";

    export interface Buy {
        date: Date;
        hour: number;
        minute: number;
        value: number;
    }

    export interface Sell {
        date: Date;
        hour: number;
        minute: number;
        value: number;
    }

    export interface chartResponse extends baseResponseModel{
        buy: Buy[];
        sell: Sell[];
    }



