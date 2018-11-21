import { Component, OnInit } from '@angular/core';
import { BeersService, BeerLocation } from '../beers.service';
import { ActivatedRoute } from '@angular/router';

import { SelectItem } from 'primeng/components/common/selectitem';

declare const Highcharts: any;
@Component({
  selector: 'app-beer-details',
  templateUrl: './beer-details.component.html',
  styleUrls: ['./beer-details.component.css']
})
export class BeerDetailsComponent implements OnInit {

  beerName: string;
  beerLocations: BeerLocation[];
  manufacturer: string;

  filterOptions: SelectItem[];
  sortField: string;
  sortOrder: number;

  constructor(
    private beerService: BeersService,
    private route: ActivatedRoute
  ) {
    this.route.paramMap.subscribe((paramMap) => {
      this.beerName = paramMap.get('beer');

      this.beerService.getBarsSelling(this.beerName).subscribe(
        data => {
          this.beerLocations = data;
        }
      );

      this.beerService.getBeerManufacturers(this.beerName)
        .subscribe(
          data => {
            this.manufacturer = data;
          }
        );

    
    this.beerService.getBeerTopBars(this.beerName).subscribe(
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

    this.beerService.getBeerTopDrinkers(this.beerName).subscribe(
        data => {
            console.log(data);

            const drinker = [];
            const quantity = [];

            data.forEach(bar => {
                drinker.push(bar.drinker);
                quantity.push(bar.count);
            });

            this.renderChartTopDrinkers(drinker, quantity);
        }
    );

    this.beerService.getBeerPeakTimes(this.beerName).subscribe(
        data => {
            console.log(data);

            const times = [];
            const quantity = [];

            data.forEach(bar => {
                times.push(bar.time);
                quantity.push(bar.count);
            });

            this.renderChartPeakTimes(times, quantity);
        }
    );
 
      this.filterOptions = [
        {
          'label': 'Low price first',
          'value': 'low price'
        },
        {
          'label': 'High price first',
          'value': 'high price'
        },
        {
          'label': 'Most frequented first',
          'value': 'high customer'
        },
        {
          'label': 'Least frequented first',
          'value': 'low customer'
        }
      ];
    });
  }

  renderChartTopBars(bars: string[], counts: number[]) {
    Highcharts.chart('topbars', {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Top bars for this item'
      },
      xAxis: {
        categories: bars,
        title: {
          text: 'Bar Name'
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

  renderChartTopDrinkers(bars: string[], counts: number[]) {
    Highcharts.chart('topdrinkers', {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Top consumers of this item'
      },
      xAxis: {
        categories: bars,
        title: {
          text: 'Consumer'
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Amount purchased'
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

  renderChartPeakTimes(bars: string[], counts: number[]) {
    Highcharts.chart('peaktimes', {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Times when this item is purchased'
      },
      xAxis: {
        categories: bars,
        title: {
          text: 'Hour of Day'
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


  ngOnInit() {
  }

  sortBy(selectedOption: string) {
    if (selectedOption === 'low price') {
      this.beerLocations.sort((a, b) => {
        return a.price - b.price;
      });
    } else if (selectedOption === 'high price') {
      this.beerLocations.sort((a, b) => {
        return b.price - a.price;
      });
    } else if (selectedOption === 'low customer') {
      this.beerLocations.sort((a, b) => {
        return a.customers - b.customers;
      });
    } else if (selectedOption === 'high customer') {
      this.beerLocations.sort((a, b) => {
        return b.customers - a.customers;
      });
    }
  }



}
