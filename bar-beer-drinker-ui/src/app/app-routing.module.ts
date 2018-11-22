import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { BarDetailsComponent } from './bar-details/bar-details.component';
import { BeerDetailsComponent } from './beer-details/beer-details.component';
import { BeersComponent } from './beers/beers.component';
import { InsightComponent } from './insight/insight.component';
import { DrinkerComponent } from './drinker/drinker.component';
import { DrinkerPageComponent } from './drinker-page/drinker-page.component';
import { ModificationComponent } from './modification/modification.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'bars'
  },
  {
    path: 'bars',
    pathMatch: 'full',
    component: WelcomeComponent
  },
  {
    path: 'bars/:bar',
    pathMatch: 'full',
    component: BarDetailsComponent
  },
  {
    path: 'beers',
    pathMatch: 'full',
    component: BeersComponent
  },
  {
    path: 'beers/:beer',
    pathMatch: 'full',
    component: BeerDetailsComponent
  },
  {
    path: 'modification',
    pathMatch: 'full',
    component: ModificationComponent
  },
  {
    path: 'drinkers',
    pathMatch: 'full',
    component: DrinkerPageComponent
  },
  {
    path: 'drinker/:drinker',
    pathMatch: 'full',
    component: DrinkerComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
