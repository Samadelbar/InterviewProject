import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DescCompanyService } from '../service/desc-company.service';

import { searchService } from '../service/search.service';

@Component({
  selector: 'app-desc-company',
  templateUrl: './desc-company.component.html',
  styleUrls: ['./desc-company.component.css']
})
export class DescCompanyComponent implements OnInit {
 


  constructor(private searchService : searchService, private DescCompanyService: DescCompanyService, private router: Router) {}

    ngOnInit(): void {
    this.searchService.currentMessage.subscribe(
      message => this.search (message!)
      );
    }

      public search(isin: string) {
        this.DescCompanyService.getDesc(isin)
       console.log(isin)
       console.log('company description')
}
}