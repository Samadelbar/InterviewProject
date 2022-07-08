import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { reverseItem, iReverseResponse, ReverseResponse } from '../reverse-screener-filter/reverceData';


@Injectable({
  providedIn: 'root'
})
export class ReverseScreenerFilterService {
  private descUrl = 'https://mdp.lomino.ir/api/v1/StockScreener/Reverse/';


  constructor(private http: HttpClient, private router: Router) { }

  public getDesc(isin: string) {
    return this.http
      .get<reverseItem[]>(
        this.descUrl + isin,
        {
          headers: new HttpHeaders()
            .append("content-type", "application/json")
            .append('Authorization', 'Bearer ' + localStorage.getItem('token')!),
        }
      )
      .pipe(map(x => {
        var model = new ReverseResponse()
        model.result = x
        return model;
      }))
      .pipe(
        tap(this.handleAuthentication.bind(this)),
        catchError(this.handleError)
      );
  }
  private handleAuthentication(response: iReverseResponse): iReverseResponse {
    response.isError = false;
    return response;
  }
  handleError(errorRes: HttpErrorResponse): Observable<iReverseResponse> {
    if (errorRes.status == 401) {
      let errorMessage: string = 'دسترسی ندارید';
      var model = new ReverseResponse();
      model.isError = true;
      model.message = errorMessage;
      model.statusCode = errorRes.status;
      return of(model);
    }
    let errorMessage: string = errorRes.error.message;
    var model = new ReverseResponse()
    model.isError = true;
    model.message = errorMessage;
    return of(model);
  }
}
