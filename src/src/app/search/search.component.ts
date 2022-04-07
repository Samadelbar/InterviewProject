import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { SignInData } from '../model/signinData';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  userInput = '';

  constructor(private http: HttpClient, private router: Router) {}

  search(userInput: string) {
    return this.http.post<SignInData>(
      'https://mdp.lomino.ir/api/v1/Symbols/SearchSymbols',
      {
        userInput,
      }
    );
  }
}
