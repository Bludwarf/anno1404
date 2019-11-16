import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProductionCalculatorComponent} from './production-calculator/production-calculator.component';


const routes: Routes = [
  {
    path: '',
    component: ProductionCalculatorComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
