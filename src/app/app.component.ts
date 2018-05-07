import { Component, Output} from '@angular/core';
import { MarginEntity } from '../app/Model/MarginEntity.model';
import { RiskMonitorEntity } from '../app/Model/RiskMonitorEntity.model'
import {RiskMonitorService} from '../app/Service/RiskMonitor.service'
import {DataServiceService} from '../app/Service/data-service.service'
import { Subscription } from 'rxjs/Subscription';
import { DaterangepickerConfig } from 'ng2-daterangepicker';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  displayMsg:boolean=false;
  objRiskData: RiskMonitorEntity;
  startDate: any;
  endDate: any;
  TotalMargin: number;
  TotalMarginPercent: number;
  TotalRisk: number;
  TotalRiskPercent: number;
  TotalExposure: number;
  TotalExposurePercent: number;
  TotalPortfolio: number;
  TotalPortfolioPercent: number;
  subscription: Subscription;

  constructor(private riskMonitorService: RiskMonitorService, private dataService:DataServiceService) { 
    this.startDate = new Date().toLocaleDateString("en-US");
    this.endDate = new Date(-1).toLocaleDateString("en-US");
    this.subscription = this.dataService.getMarginData().subscribe(x => {this.TotalMargin = x[0],this.TotalMarginPercent=x[1] 
    });
    this.subscription = this.dataService.getRiskData().subscribe(x => {this.TotalRisk = x[0],this.TotalRiskPercent=x[1] 
    });
  }
  
  ngOnInit(){    
    this.riskMonitorService.getRiskMonitor(this.startDate, this.endDate).subscribe((res) => {
      this.TotalMargin = res.TotalMargin;
      this.TotalMarginPercent = res.TotalMarginPercent;

      this.TotalRisk = res.TotalRisk;
      this.TotalRiskPercent = res.TotalRiskPercent;

      this.TotalExposure = res.TotalExposure;
      this.TotalExposurePercent = res.TotalExposurePercent;

      this.TotalPortfolio = res.TotalPortfolio;
      this.TotalPortfolioPercent = res.TotalPortfolioPercent;
    });   
  }

  
}
