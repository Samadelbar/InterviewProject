import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { searchService } from '../service/search.service';
import { StockReturnsService } from '../service/stock-returns.service'
import { StockData, StockDataResponse } from './stockData';

@Component({
  selector: 'app-stock-returns',
  templateUrl: './stock-returns.component.html',
  styleUrls: ['./stock-returns.component.css']
})
export class StockReturnsComponent implements OnInit {
  data?: StockData
  

  constructor(private searchService: searchService,
    private StockReturnsService: StockReturnsService, private router: Router) { }

  ngOnInit(): void {
    this.searchService.currentMessage.subscribe(
      message => this.search(message!)
    );
  }

  public search(isin: string) {
    this.StockReturnsService.getDesc(isin)
    let stockResult: Observable<StockDataResponse>;

    stockResult = this.StockReturnsService.getDesc(isin);
    stockResult.subscribe({
      next: (res) => {
        if (res.isError && res.statusCode == 401) {
          //  بعدا کامل شود
        } else {
          this.data 
        }
      }
    })
  }
  }


