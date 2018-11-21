import { Component, OnInit } from '@angular/core';
import { DrinkerService, Drinker } from '../drinker.service';

@Component({
  selector: 'app-drinker-page',
  templateUrl: './drinker-page.component.html',
  styleUrls: ['./drinker-page.component.css']
})
export class DrinkerPageComponent implements OnInit {

    drinkers: Drinker[];

  constructor(
      public drinkerService: DrinkerService
  ) { 
      this.getAllDrinkers();
  }

  getAllDrinkers() {
      this.drinkerService.getAllDrinkers().subscribe(
          data => {
              this.drinkers = data;
          },
          error => {
              alert('Could not retrieve a list of drinkers');
          }
      );
  }

  ngOnInit() {
  }
 
}
