import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable, NgModuleRef } from '@angular/core';
import { Router } from '@angular/router';
import { SignInResponse } from 'src/app/model/signinData';
import { catchError, tap } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { SearchResponse } from '../search/search.option';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class searchService {
  constructor(private http: HttpClient, private router: Router) { }

  public search(txt: string) {
    return this.http
      .post<SearchResponse>(
        'https://mdp.lomino.ir/api/v1/Symbols/SearchSymbols',
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
            .append('Authorization', 'Bearer ' + localStorage.getItem('token')!),
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
  public currentIsin?: string;
  public subject = new Subject<any>();
  private messageSource = new BehaviorSubject(this.currentIsin);
  currentMessage = this.messageSource.asObservable();
  changeMessage(message: string) {
    this.messageSource.next(message)
  }
}
