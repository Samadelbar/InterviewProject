import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from '../service/authentication/authentication.service';
import { SignInData } from '../model/signinData';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

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

  areCredentialsInvalid = false;

  constructor(private http: HttpClient,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

 ngOnInit(): void {
      
 }


  public handleError(errorRes: HttpErrorResponse) {
    let errorMessage: string = errorRes.error.Message;
    console.log(errorMessage);
    return throwError(() => errorMessage);
  }

  
  onSubmit(signInForm: NgForm): void {
    // console.log(signInForm);
    if (!signInForm.valid) {
      this.isFormValid = true;
      // this.areCredentialsInvalid = false;
      return;
    }
    const loginame = signInForm.value.loginame;
    const password = signInForm.value.password;

    let authObs: Observable<SignInData>;

    this.isFormValid = true;
    if (this.isLoginMode) {
      authObs = this.authenticationService.login(loginame, password);
    } else {
      authObs = this.authenticationService.signin(loginame, password);
    }

    authObs.subscribe({
      next: (errorMessage) => {
        console.log(errorMessage);
        this.isFormValid = false;
        this.router.navigate(['/home']);
      },
    });

    (errorMessage) => {
      // console.log('Message');
      this.error = errorMessage;
      this.isFormValid = false;
    };

    signInForm.reset();
  }

  
}
