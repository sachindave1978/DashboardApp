import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { HttpClientModule, HttpClient} from '@angular/common/http';
import {RiskMonitorService} from '../app/Service/RiskMonitor.service';
import { MarginComponent } from '../app/Components/margin/margin.component';
import { RiskComponent } from '../app/Components/risk/risk.component';
import { ExposureComponent } from '../app/Components/exposure/exposure.component';
import { PfvalueComponent } from '../app/Components/pfvalue/pfvalue.component';
import { Daterangepicker } from 'ng2-daterangepicker';
import { DataServiceService } from './Service/data-service.service';
import { TilesComponent } from '../app/Components/tiles/tiles.component';

const appRoutes: Routes = [
  { path: '', component: AppComponent },
  { path: 'Margin', component: MarginComponent },
  { path: 'Risk', component: RiskComponent },
  { path: 'Exposure', component: ExposureComponent },
  { path: 'Pfvalue', component: PfvalueComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    MarginComponent,
    RiskComponent,
    ExposureComponent,
    PfvalueComponent,
    TilesComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    ),
    BrowserModule,
    HttpModule,
    HttpClientModule,
    Daterangepicker
  ],
  providers: [ RiskMonitorService, DataServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
