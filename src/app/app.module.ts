import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductionCalculatorComponent } from './production-calculator/production-calculator.component';
import { BuildingPipe } from './building.pipe';
import { PercentagePipe } from './percentage.pipe';
import { UtilizationPipe } from './utilization.pipe';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ProductionCalculatorComponent,
    BuildingPipe,
    PercentagePipe,
    UtilizationPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
