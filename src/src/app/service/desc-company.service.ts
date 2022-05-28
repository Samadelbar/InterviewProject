import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { descResponseItems } from '../desc-company/descData';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DescCompanyService {
  private descUrl = 'https://mdp.lomino.ir/api/v1/Fundamental/';
  
  constructor(private http: HttpClient, private router: Router) { }

  public getDesc(isin: string) {
    return this.http
      .get< descResponseItems>(
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
  private handleAuthentication(response:  descResponseItems):  descResponseItems {
    response.isError = false;
    return response;
  }
  handleError(errorRes: HttpErrorResponse): Observable< descResponseItems> {
    if (errorRes.status == 401) {
      let errorMessage: string = 'دسترسی ندارید';
      var model = {} as  descResponseItems;
      model.isError = true;
      model.message = errorMessage;
      model.statusCode = errorRes.status;
      return of(model);
    }
    let errorMessage: string = errorRes.error.message;
    var model = {} as  descResponseItems;
    model.isError = true;
    model.message = errorMessage;
    return of(model);
  }
 
 
  }

    // getDesc(): Observable<descResponseItems>{
    //   return this.http.get<descResponseItems>(this.descUrl)
    //   .pipe(
    //     tap(this.handleAuthentication.bind(this)),
    //       catchError(this.handleError)
    //   )
    // }
  
    
   
    // private handleAuthentication(response: descResponseItems): descResponseItems {
     
    //   return response;
    // }
  
    // private handleError(err: HttpErrorResponse): Observable<descResponseItems> {
    //   let errorMessage = '';
    //   if (err.error) {
    //     errorMessage = 'دسترسی ندارید: ${err.error.message}';
    //     // var model = {} as descResponseItems;
    //     // model.isError = true;
    //     // model.message = errorMessage;
    //     // model.statusCode = errorRes.status;
    //     // return of(model);
    //   }else{
    //     errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;

    //   }
    //   console.error(errorMessage);
    // return throwError(errorMessage);
    //   // let errorMessage: string = errorRes.error.message;
    //   // var model = {} as SearchResponse;
    //   // model.isError = true;
    //   // model.message = errorMessage;
    //   // return of(model);
    // }
  
