import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isLoggedIn: boolean = false

  constructor(private authenticationService: AuthenticationService,
          private router: Router) { }

                 

  ngOnInit(){
    // this.isLoggedIn = this.authenticationService.checkAuth()
  }

  public onUserRedirect(){
    this.router.navigate(['/home'])
  }
}
