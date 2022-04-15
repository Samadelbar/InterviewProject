import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, NgModuleRef } from '@angular/core';
import { Router } from '@angular/router';
import { SignInResponse } from 'src/app/model/signinData';
import { catchError, tap } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private http: HttpClient, private router: Router) {}

  login(loginame: string, password: string) {
    return this.http
      .post<SignInResponse>('https://mdp.lomino.ir/api/v1/Auth/sign-in', {
        loginame: loginame,
        password: password,
      })
      .pipe(
        tap(this.handleAuthentication.bind(this)),
        catchError(this.handleError)
      );
  }
  private handleAuthentication(response: SignInResponse): SignInResponse {
    // const expireDate = new Date(
    //   new Date().getTime() + +response.expiresIn * 1000
    // );
    // const user = new User(expireDate);
    // this.userSub.next(user);
    response.isError = false;
    return response;
  }

  handleError(errorRes: HttpErrorResponse): Observable<SignInResponse> {
    let errorMessage: string = errorRes.error.Message;
    var model = {} as SignInResponse;
    model.isError = true;
    model.message = errorMessage;
    return of(model);
  }
}
