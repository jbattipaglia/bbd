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
/*
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
      );*/

      this.barService.getSpenders(this.barName).subscribe(
        data => {
          console.log(data);
  
          const drinkers = [];
          const spent = [];
  
          data.forEach(bar => {
            drinkers.push(bar.drinker);
            spent.push(bar.spent);
          });
  
          this.renderChart1(drinkers, spent);
        }
      );

      this.barService.getTopItems(this.barName).subscribe(
        data => {
          console.log(data);
  
          const items = [];
          const count = [];
  
          data.forEach(bar => {
            items.push(bar.item);
            count.push(bar.count);
          });
  
          this.renderChart2(items, count);
        }
      );


      this.barService.getTopManf(this.barName).subscribe(
        data => {
          console.log(data);
  
          const manf = [];
          const count = [];
  
          data.forEach(bar => {
            manf.push(bar.manf);
            count.push(bar.count);
          });
  
          this.renderChart3(manf, count);
        }
      );


      barService.getMenu(this.barName).subscribe(
        data => {
          this.menu = data;
        }
      );
    });
  }

  renderChart1(bars: string[], counts: number[]) {
    Highcharts.chart('spendersbg', {
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

  renderChart2(bars: string[], counts: number[]) {
    Highcharts.chart('topsellingitems', {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Top selling beers at this bar'
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
          text: 'Amount sold'
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

  renderChart3(bars: string[], counts: number[]) {
    Highcharts.chart('topsellingmanf', {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Most popular manufacturers at this bar'
      },
      xAxis: {
        categories: bars,
        title: {
          text: 'Manufacturer Name'
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Amount of beers sold'
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
/*
  renderChart(bars: string[], counts: number[]) {
    Highcharts.chart('barchart', {
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
}*/

  ngOnInit() {
  }

}
