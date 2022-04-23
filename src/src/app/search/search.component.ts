import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { searchService } from '../service/search.service';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  txtsearch = '';
  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions?: Observable<string[]>;

  constructor(private searchService: searchService, private router: Router) {}

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

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
