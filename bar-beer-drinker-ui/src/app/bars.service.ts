import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

export interface Bar {
  name: string;
  license: string;
  city: string;
  phone: string;
  addr: string;
}

export interface BarMenuItem {
  beer: string;
  manf: string;
  price: number;
  likes: number;
}

@Injectable({
  providedIn: 'root'
})
export class BarsService {

  constructor(
    public http: HttpClient
  ) { }

  getBars() {
    return this.http.get<Bar[]>('/api/bar');
  }

  getBar(bar: string) {
    return this.http.get<Bar>('/api/bar/' + bar);
  }

  getMenu(bar: string) {
    return this.http.get<BarMenuItem[]>('/api/menu/' + bar);
  }

  getSpenders(bar: string) {
    return this.http.get<any[]>('/api/bar/topspenders/' + bar)
  }

  getTopItems(bar: string) {
    return this.http.get<any[]>('/api/bar/topbeers/' + bar)
  }

  getTopManf(bar: string) {
    return this.http.get<any[]>('/api/bar/topmanufacturers/' + bar)
  }

  getBusyHours(bar: string){
      return this.http.get<any[]>('/api/bar/busyhours/' + bar)
  }

  getFrequentCounts() {
    return this.http.get<any[]>('/api/frequents-data');
  }
}
