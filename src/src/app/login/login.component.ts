import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from '../service/authentication/authentication.service';
import { SignInResponse } from '../model/signinData';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  isLoginMode = true;
  isFormValid = false;
  errorMessage = '';
  error = null;
  IsAutenticated = false

  areCredentialsInvalid = false;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem('token') != undefined) {
      console.log("User is logged in");
      this.router.navigate(['/home']);
    }
  }

  public handleError(errorRes: HttpErrorResponse) {
    let errorMessage: string = errorRes.error.Message;
    console.log(errorMessage);
    return throwError(() => errorMessage);
  }

  onSubmit(signInForm: NgForm): void {
    if (!signInForm.valid) {
      this.isFormValid = true;
      return;
    }
    const loginame = signInForm.value.loginame;
    const password = signInForm.value.password;

    let loginResult: Observable<SignInResponse>;

    this.isFormValid = true;
    loginResult = this.authenticationService.login(loginame, password);

    loginResult.subscribe({
      next: (res) => {
        if (res.isError) {
          this.errorMessage = res.message;
        } else {
          this.errorMessage = 'Okkkkkk';
          this.IsAutenticated = true;
          localStorage.setItem('token', res.token);
          this.router.navigate(['/home']);

        }
      },
    });
    signInForm.reset();
  }
}
