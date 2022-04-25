import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { searchService } from '../service/search.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { debounceTime, tap, switchMap, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  txtsearch = '';
  myControl = new FormControl();
  Symbol?: string;
  // filteredOptions?: Observable<string[]>;
  isLoading = false;
  filteredSymbols: any;

  constructor(private searchService: searchService, private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    this.filteredSymbols = this.myControl.valueChanges.pipe(
      debounceTime(500),
      tap(() => {
        this.filteredSymbols = [];
        this.isLoading = true;
      } 
    ),
    switchMap(value => this.http.get("https://mdp.lomino.ir/api/v1/Symbols/SearchSymbols" + value)
    .pipe(
      finalize(() => {
        this.isLoading = false
      }),
    )))
    .subscribe(data => {
      if (data['Search'] == undefined){
        this.filteredSymbols = [];
      }else{
        this.filteredSymbols = data['Search'];
      }
      console.log(this.filteredSymbols);
    })

    if (localStorage.getItem('token') == undefined) {
      this.router.navigate(['']);
    }
  }
  // private _filter(value: string): string[] {
  //   const filterValue = value.toLowerCase();

  //   return this.options.filter((option) =>
  //     option.toLowerCase().includes(filterValue)
  //   );
  // }

  onSubmit(): void {
    console.log(this.txtsearch);
    if(this.txtsearch.length < 3){
      return
    }
    let result = this.searchService.search(this.txtsearch);
    result.subscribe({
      next: (res) => {
        if (res.isError) {
          console.log(res.message);
          console.log('we have some error');
          if (res.statusCode == 401){
            localStorage.removeItem('token');
            this.router.navigate([''])
            
          }
        } else {
          console.log(res);
        }
      },
    });
  }
}
