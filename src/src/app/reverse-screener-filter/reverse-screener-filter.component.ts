import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DescCompanyService } from '../service/desc-company.service';
import { searchService } from '../service/search.service';
import { reverseItem, ReverseResponse } from './reverceData';
import { ReverseScreenerFilterService } from '../service/reverse-screener-filter.service'

@Component({
  selector: 'app-reverse-screener-filter',
  templateUrl: './reverse-screener-filter.component.html',
  styleUrls: ['./reverse-screener-filter.component.css']
})
export class ReverseScreenerFilterComponent implements OnInit {
  data?: reverseItem[];

  constructor(private searchService: searchService,
    private DescCompanyService: DescCompanyService,
    private ReverseScreenerFilterService: ReverseScreenerFilterService, private router: Router) { }

  ngOnInit(): void {
    this.searchService.currentMessage.subscribe(
      message => this.search(message!)
    );
  }

  public search(isin: string) {
    this.ReverseScreenerFilterService.getDesc(isin)
    let reverseResult: Observable<ReverseResponse>;

    reverseResult = this.ReverseScreenerFilterService.getDesc(isin);
    reverseResult.subscribe({
      next: (res) => {
        if (res.isError && res.statusCode == 401) {
          //  بعدا کامل شود
        } else {
          this.data = res.result
        }
      }
    })
  }
}
