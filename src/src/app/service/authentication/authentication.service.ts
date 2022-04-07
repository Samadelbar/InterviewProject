import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, throwError } from 'rxjs';
import { SignInData } from 'src/app/model/signinData';
import { catchError, tap } from 'rxjs/operators';
import { User } from 'src/app/login/user.model';

//  export interface SignInData{
//   loginame: string;
//   password: string;
//   idToken: string;
//   refreshToken: string;
//   expiresIn: string;
//   localId: string
// }

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  loggedIn: boolean = false;
   userSub : BehaviorSubject<User> = new BehaviorSubject<User>(null!);

  constructor(private http: HttpClient, private router: Router) {}

  signin(loginame: string, password: string) {
    return this.http
      .post<SignInData>(
        'https://mdpapi.exphoenixfund.com/api/v1/Auth/sign-in',
        {
          loginame : loginame,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap(this.handleAuthentication.bind(this))
      );
  }

  login(loginame: string, password: string) {
    return this.http
      .post<SignInData>(
        'https://mdpapi.exphoenixfund.com/api/v1/Auth/sign-in',
        {
          loginame : loginame,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap(this.handleAuthentication.bind(this))
      );
  }

  private handleAuthentication(response: SignInData) {
    const expireDate = new Date(
      new Date().getTime() + +response.expiresIn * 1000
    );
    const user = new User(
      response.loginame,
      response.localId,
      response.idToken,
      expireDate
    );
    this.userSub.next(user);
    let userData = localStorage.setItem('userData', JSON.stringify(user));
  }

  handleError(errorRes: HttpErrorResponse) {
    let errorMessage: string = errorRes.error.Message;
    console.log(errorMessage);
    // if(!errorRes.error || !errorRes.error.error){
    // }
    return throwError(() => errorMessage);
  }

  // autoLogin() {
  //   let userData: {
  //     loginame: string;
  //     _token: string;
  //     expirationDate: string;
  //     localId: string;
  //   } =localStorage.getItem('userData' || '{}')
  //   //  = JSON.stringify(localStorage.getItem("userData"))
  //   ;
  //   if (!userData) {
  //     return;
  //   }
  //   let user = new User(
  //     userData.loginame,
  //     userData.localId,
  //     userData._token,
  //     new Date(userData.expirationDate)
  //   );
  //   if (user.token){
  //     this.userSub.next(user);
  //   }
  // }

  logout() {
    this.userSub.next(null!);
    this.router.navigate(['']);
  }

  isAuthenticated() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.loggedIn);
      }, 1000);
    });
  }

  getIsAuthenticated(): boolean {
    return this.loggedIn;
  }
}
