
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { StockData, StockDataResponse } from '../stock-returns/stockData';
import { BehaviorSubject, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class StockReturnsService {
  private descUrl = 'https://mdp.lomino.ir/api/v1/Symbols/efficiency?isin=';

  constructor(private http: HttpClient, private router: Router) { }
   
  public getDesc(isin: string) {
    return this.http
      .get<StockData>(
        this.descUrl+ isin,
                
        {
          headers: new HttpHeaders()
            .append("content-type", "application/json")
            .append('Authorization', 'Bearer ' + localStorage.getItem('token')!),
        }
      )
      .pipe(
        tap(this.handleAuthentication.bind(this)),
        catchError(this.handleError)
      );
  }
  private handleAuthentication(response: StockData):  StockData {
    response.isError = false;
    return response;
  }
  handleError(errorRes: HttpErrorResponse): Observable< StockData> {
    if (errorRes.status == 401) {
      let errorMessage: string = 'دسترسی ندارید';
      var model = {} as  StockData;
      model.isError = true;
      model.message = errorMessage;
      model.statusCode = errorRes.status;
      return of(model);
    }
    let errorMessage: string = errorRes.error.message;
    var model = {} as  StockData;
    model.isError = true;
    model.message = errorMessage;
    return of(model);
  }

 
 
  public currentIsin?: string;
  public subject = new Subject<any>();
  private messageSource = new BehaviorSubject(this.currentIsin);
  currentMessage = this.messageSource.asObservable();
  changeMessage(message: string) {
    this.messageSource.next(message)
  }

}