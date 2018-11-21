import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DrinkerService, Drinker, DrinkerTransaction } from '../drinker.service';
import { HttpResponse } from '@angular/common/http';

declare const Highcharts: any;
@Component({
  selector: 'app-drinker',
  templateUrl: './drinker.component.html',
  styleUrls: ['./drinker.component.css']
})
export class DrinkerComponent implements OnInit {

    drinkerName: string;
    drinkerDetails: Drinker;
    transactions: DrinkerTransaction[];


  constructor(
      private drinkerService: DrinkerService,
      private route: ActivatedRoute
  ) { 
      route.paramMap.subscribe((paramMap) => {
          this.drinkerName = paramMap.get('drinker');
            
          drinkerService.getDrinker(this.drinkerName).subscribe(
                data => {
                    this.drinkerDetails= data;
                },
                (error: HttpResponse<any>) => {
                    if (error.status === 404) {
                        alert('Drinker not found');
                    } else {
                        console.error(error.status + ' - ' + error.body);
                        alert('An error occurred on the server. Please check the browser console.');
                    }
                }
            );
          
            drinkerService.getTransactions(this.drinkerName).subscribe(
                data => {
                    this.transactions = data;
                }
            );    
      });

      this.drinkerService.getDrinkerTopBars(this.drinkerName).subscribe(
        data => {
            console.log(data);

            const bars = [];
            const quantity = [];

            data.forEach(bar => {
                bars.push(bar.bar);
                quantity.push(bar.count);
            });

            this.renderChartTopBars(bars, quantity);
        }
    );

    this.drinkerService.getDrinkerTopBeers(this.drinkerName).subscribe(
        data => {
            console.log(data);

            const bars = [];
            const quantity = [];

            data.forEach(bar => {
                bars.push(bar.item);
                quantity.push(bar.count);
            });

            this.renderChartTopBeers(bars, quantity);
        }
    );

    this.drinkerService.getDrinkerTimeSpend(this.drinkerName).subscribe(
        data => {
            console.log(data);

            const bars = [];
            const quantity = [];

            data.forEach(bar => {
                bars.push(bar.bar);
                quantity.push(bar.count);
            });

            this.renderChartTimeSpending(bars, quantity);
        }
    );

      
  }

  renderChartTopBars(bars: string[], counts: number[]) {
    Highcharts.chart('topbars', {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Favorite Bars'
      },
      xAxis: {
        categories: bars,
        title: {
          text: 'Name of Bar'
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Money spent at bar'
        },
        labels: {
          overflow: 'justify'
        }
      },
      plotOptions: {
        bar: {
          dataLabels: {
            enabled: true
          }
        }
      },
      legend: {
        enabled: false
      },
      credits: {
        enabled: false
      },
      series: [{
        data: counts
      }]
    });
  }

  renderChartTopBeers(bars: string[], counts: number[]) {
    Highcharts.chart('topbeers', {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Favorite Beers'
      },
      xAxis: {
        categories: bars,
        title: {
          text: 'Name of Beer'
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Quantity purchased'
        },
        labels: {
          overflow: 'justify'
        }
      },
      plotOptions: {
        bar: {
          dataLabels: {
            enabled: true
          }
        }
      },
      legend: {
        enabled: false
      },
      credits: {
        enabled: false
      },
      series: [{
        data: counts
      }]
    });
  }

  renderChartTimeSpending(bars: string[], counts: number[]) {
    Highcharts.chart('timeofspending', {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Time of Transactions'
      },
      xAxis: {
        categories: bars,
        title: {
          text: 'Hour'
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Transactions at Hour'
        },
        labels: {
          overflow: 'justify'
        }
      },
      plotOptions: {
        bar: {
          dataLabels: {
            enabled: true
          }
        }
      },
      legend: {
        enabled: false
      },
      credits: {
        enabled: false
      },
      series: [{
        data: counts
      }]
    });
  }
  
  ngOnInit() {
  }

}
