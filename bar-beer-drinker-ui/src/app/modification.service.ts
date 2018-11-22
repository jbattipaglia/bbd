import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ModificationService {

  constructor(
      public http: HttpClient
  ) { }

  getResult(modification: string){
      return this.http.get<any[]>('/api/modification/' + modification)
  }
}
