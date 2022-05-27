import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DescCompanyService } from '../service/desc-company.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { debounceTime, tap, switchMap, finalize } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { descResponseItems } from './descData';

@Component({
  selector: 'app-desc-company',
  templateUrl: './desc-company.component.html',
  styleUrls: ['./desc-company.component.css']
})
export class DescCompanyComponent implements OnInit {
  pageTitle = 'About Company'
  companyTitle?: string;
  symbolName?: string;
  sub!: Subscription;
  isLoading = false;
  errorMessage = '';
  
  filteredSymbols:descResponseItems[] = [];
  result : descResponseItems[] = []


  private _listFilter = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredSymbols = this.performFilter(value);
  }

  
  constructor(private DescCompanyService: DescCompanyService, private router: Router, private http: HttpClient) {}

  performFilter(filterBy: string): descResponseItems[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.result.filter(( filteredSymbols: descResponseItems) =>
    filteredSymbols.symbolName.toLocaleLowerCase().includes(filterBy));
  }



  ngOnInit(): void {

    this.DescCompanyService.getDesc().subscribe({
      next: filteredSymbols =>
        this.filteredSymbols = this.result,
      },
      // error: error => this.errorMessage = err
    )};
  }
  


