import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { searchService } from '../service/search.service';
import { HighchartService } from '../service/highchart.service';
import { chartResponse } from '../highcharts/chartData'

@Component({
  selector: 'app-highcharts',
  templateUrl: './highcharts.component.html',
  styleUrls: ['./highcharts.component.css']
})
export class HighchartsComponent implements OnInit {
  result?: chartResponse

  constructor(private http: HttpClient, private searchService: searchService,
    private highchartService: HighchartService, private router: Router) { }

  ngOnInit(): void {
    this.searchService.currentMessage.subscribe(
      message => this.search(message!)
    );
    this.createChartLine()
  }

  public search(isin: string) {
    this.highchartService.getDesc(isin)
    let chartResult: Observable<chartResponse>;

    chartResult = this.highchartService.getDesc(isin);
    chartResult.subscribe({
      next: (res) => {
        if (res.isError && res.statusCode == 401) {
          //  بعدا کامل شود
        } else {
          this.result = res;
        
        }
      }
    })
  }
  private getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  private createChartLine(): void {
    let date = new Date();
    const data: any[] = [];

    for (let i = 0; i < 10; i++) {
      date.setDate(new Date().getDate() + i);
      data.push([`${date.getDate()}/${date.getMonth() + 1}`, this.getRandomNumber(0, 1000)]);
    }

    const chart = Highcharts.chart('chart-line', {
      chart: {
        type: 'line',
      },
      title: {
        text: 'فروش - خرید ',
      },
      credits: {
        enabled: false,
      },
      legend: {
        enabled: false,
      },
      yAxis: {
        title: {
          text: null,
        }
      },
      xAxis: {
        type: 'category',
      },
      tooltip: {
        headerFormat: `<div>Date: {point.key}</div>`,
        pointFormat: `<div>{series.name}: {point.y}</div>`,
        shared: true,
        useHTML: true,
      },
      series: [{
        name: 'Amount',
        data,
      }],
    } as any);

    setInterval(() => {
      date.setDate(date.getDate() + 1);
      chart.series[0].addPoint([`${date.getDate()}/${date.getMonth() + 1}`, this.getRandomNumber(0, 1000)], true, true);
    }, 1500);
  }

}

