import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BarsService, Bar, BarMenuItem } from '../bars.service';
import { HttpResponse } from '@angular/common/http';

declare const Highcharts: any;
@Component({
  selector: 'app-bar-details',
  templateUrl: './bar-details.component.html',
  styleUrls: ['./bar-details.component.css']
})
export class BarDetailsComponent implements OnInit {

  barName: string;
  barDetails: Bar;
  menu: BarMenuItem[];

  constructor(
    private barService: BarsService,
    private route: ActivatedRoute
  ) {
    route.paramMap.subscribe((paramMap) => {
      this.barName = paramMap.get('bar');

      barService.getBar(this.barName).subscribe(
        data => {
          
          this.barDetails = data;
        },
        (error: HttpResponse<any>) => {
          if (error.status === 404) {
            alert('Bar not found');
          } else {
            console.error(error.status + ' - ' + error.body);
            alert('An error occurred on the server. Please check the browser console.');
          }
        }
      );

      this.barService.getFrequentCounts().subscribe(
        data => {
          console.log(data);
  
          const bars = [];
          const counts = [];
  
          data.forEach(bar => {
            bars.push(bar.bar);
            counts.push(bar.frequentCount);
          });
  
          this.renderChart(bars, counts);
        }
      );

      this.barService.getSpenders(this.barName).subscribe(
        data => {
          console.log(data);
  
          const drinkers = [];
          const spent = [];
  
          data.forEach(bar => {
            drinkers.push(bar.drinker);
            spent.push(bar.spent);
          });
  
          this.renderChart(drinkers, spent);
        }
      );

      barService.getMenu(this.barName).subscribe(
        data => {
          this.menu = data;
        }
      );
    });
  }

  renderChart(bars: string[], counts: number[]) {
    Highcharts.chart('bargraph', {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Top spenders at this bar'
      },
      xAxis: {
        categories: bars,
        title: {
          text: 'Customer Name'
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Amount spent'
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
