import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DescCompanyService } from '../service/desc-company.service';
import { searchService } from '../service/search.service';
import { descResponseItems } from './descData';

@Component({
  selector: 'app-desc-company',
  templateUrl: './desc-company.component.html',
  styleUrls: ['./desc-company.component.css']
})
export class DescCompanyComponent implements OnInit {
 symbolTitle?: string;
 fullIntro?: string;


  constructor(private searchService : searchService, private DescCompanyService: DescCompanyService, private router: Router) {}
  
    ngOnInit(): void {
    this.searchService.currentMessage.subscribe(
      message => this.search (message!)
      );
    }

      public search(isin: string) {
        this.DescCompanyService.getDesc(isin)
        let descResult: Observable<descResponseItems>;

       descResult = this.DescCompanyService.getDesc(isin);
    
        descResult.subscribe({
          next: (res) => {
            if (res.isError && res.statusCode == 401) {
            //  بعدا کامل شود
            } else {
              console.log(res.summaryIntro)
              this.symbolTitle = res.symbolTitle
              this.fullIntro = res.summaryIntro
    
            }
          },
        });
}
}