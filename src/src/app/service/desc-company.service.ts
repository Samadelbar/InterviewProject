import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { SearchResponse } from '../search/search.option';

@Injectable({
  providedIn: 'root'
})
export class DescCompanyService {
  
    constructor(private http: HttpClient, private router: Router) { }
  
    public search(txt: string) {
      return this.http
        .post<SearchResponse>(
          'https://mdp.lomino.ir/api/v1/Fundamental/IRO1TAMN0001',
          {
            reportFilter: {
              phrase: txt,
            },
            optionalFilter: {
              take: 10,
              page: 1,
            }
          }
          ,
          {
            headers: new HttpHeaders()
              .append("content-type", "application/json")
              .append('Authorization', 'Bearer '+localStorage.getItem('token')!),
          }
        )
        .pipe(
          tap(this.handleAuthentication.bind(this)),
          catchError(this.handleError)
        );
    }
    private handleAuthentication(response: SearchResponse): SearchResponse {
      response.isError = false;
      return response;
    }
  
    handleError(errorRes: HttpErrorResponse): Observable<SearchResponse> {
      if (errorRes.status == 401) {
        let errorMessage: string = 'دسترسی ندارید';
        var model = {} as SearchResponse;
        model.isError = true;
        model.message = errorMessage;
        model.statusCode = errorRes.status;
        return of(model);
      }
      let errorMessage: string = errorRes.error.message;
      var model = {} as SearchResponse;
      model.isError = true;
      model.message = errorMessage;
      return of(model);
    }

 
}
