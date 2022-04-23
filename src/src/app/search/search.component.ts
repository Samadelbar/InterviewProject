import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SignInData } from '../model/signinData';
import { searchService } from '../service/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  txtsearch = '';

  constructor(private searchService: searchService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit(): void {
    console.log(this.txtsearch);
    let result = this.searchService.search(this.txtsearch);
    result.subscribe({
      next: (res) => {
        if (res.isError) {
          console.log(res.message);
          console.log('we have some error');
        } else {
          console.log(res);
        }
      },
    });
  }
}
