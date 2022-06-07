import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isLoggedIn: boolean = false

  @Output() searchValue = new EventEmitter<string>();

  public searchRedirection(selectedSolutionId: string) {
     this.searchValue.emit(selectedSolutionId);
     this.router.navigate(['/category/' + selectedSolutionId]);
   }

  constructor(private authenticationService: AuthenticationService,
          private router: Router) { }

  goSearch(){
    this.router.navigate(['/stock-view']);
  }            

  ngOnInit(){
         
     }
}
