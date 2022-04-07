import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthenticationService } from './service/authentication/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  
  isAuthenticated = false;

  private userSub!: Subscription;

  constructor(
   public authenticationService: AuthenticationService,
   private router: Router
  ) {}

  ngOnInit() {
    // this.authenticationService.autoLogin()
      }
      // user =>{this.isAuthenticated = !!user;
      // console.log(!user);
      // console.log(!!user);
  
  
  logout() {
    this.authenticationService.logout();
  }
  ngOnDestroy(): void {
      this.userSub.unsubscribe();
  }
}
