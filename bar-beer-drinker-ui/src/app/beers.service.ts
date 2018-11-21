import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface BeerLocation {
  bar: string;
  price: number;
  customers: number;
}

@Injectable({
  providedIn: 'root'
})
export class BeersService {

  constructor(private http: HttpClient) { }

  getBeers() {
    return this.http.get<any[]>('/api/item');
  }

  getBarsSelling(beer: string) {
    return this.http.get<BeerLocation[]>(`/api/bars-selling/${beer}`);
  }

  getBeerTopBars(beer: string) {
      return this.http.get<any[]>('/api/beer/topbars/' + beer);
  }

  getBeerTopDrinkers(beer: string) {
      return this.http.get<any[]>('/api/beer/topdrinkers/' + beer);
  }

  getBeerPeakTimes(beer: string) {
      return this.http.get<any[]>('/api/beer/peaktimes/' + beer);
  }

  getBeerManufacturers(beer?: string): any {
    if (beer) {
      return this.http.get<string>(`/api/beer-manufacturer/${beer}`);
    }
    return this.http.get<string[]>('/api/beer-manufacturer');
  }

}
