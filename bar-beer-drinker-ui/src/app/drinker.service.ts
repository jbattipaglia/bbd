import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Drinker { 
    name: string;
    city: string;
    phone: string;
    address: string;
    state: string;
}

export interface DrinkerTransaction{
    trans_id: number;
    bar: string;
    price: number;
    tip: number;
    time: string;
}

@Injectable({
  providedIn: 'root'
})
export class DrinkerService {

  constructor(private http: HttpClient) { }

  getDrinker(drinker: string) {
      return this.http.get<Drinker>('/api/drinker/' + drinker);
  }

  getTransactions(drinker: string) {
      console.log(drinker + " test");
      return this.http.get<DrinkerTransaction[]>('/api/drinker/transactions/' + drinker);
  }

  getDrinkerTopBars(drinker: string) {
    return this.http.get<any[]>('/api/drinker/transactions/bars/' + drinker)
  }

  getDrinkerTopBeers(drinker: string) {
    return this.http.get<any[]>('/api/drinker/transactions/beers/' + drinker)
  }

  getDrinkerTimeSpend(drinker: string) {
    return this.http.get<any[]>('/api/drinker/transactions/times/' + drinker)
  }

}
