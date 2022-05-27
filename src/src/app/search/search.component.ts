import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { searchService } from '../service/search.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { debounceTime, tap, switchMap, finalize } from 'rxjs/operators';
import { SearchResponse, SearchResponseItem } from './search.option';

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
  result : SearchResponseItem[] = [];
  currentValue ?: SearchResponseItem;

  constructor(private searchService: searchService, private router: Router, private http: HttpClient) {}
  OnHumanSelected() {
    console.log(this.myControl.value); // get from viewI 
    console.log("I AM New one"); // get from view

  }
  ngOnInit(): void {

    let some= this.myControl.valueChanges.pipe(
      debounceTime(500),
      tap(() => {
        this.filteredSymbols = [];
        this.isLoading = true;
      } 
    ),
    switchMap<string,Observable<SearchResponse>>(value => this.searchService.search(value))
    )
    .pipe(
      tap(() => {
        this.isLoading = false
      }),
    )
    .subscribe(res => {
      if (res.isError) {
        console.log(res.message);
        if (res.statusCode == 401){
          localStorage.removeItem('token');
          this.router.navigate([''])
          
        }
      } else {
        this.result = res.result;
      }
    })

    //   if (data['Search'] == undefined){
    //     this.filteredSymbols = [];
    //   }else{
    //     this.filteredSymbols = data['Search'];
    //   }
    //   console.log(this.filteredSymbols);
    // })

    // if (localStorage.getItem('token') == undefined) {
    //   this.router.navigate(['']);
  }
  // private _filter(value: string): string[] {
  //   const filterValue = value.toLowerCase();

  //   return this.options.filter((option) =>
  //     option.toLowerCase().includes(filterValue)
  //   );
  // }

    
}
