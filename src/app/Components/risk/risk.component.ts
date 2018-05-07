import { Component, OnInit } from '@angular/core';
import { RiskEntity } from '../../Model/RiskEntity.model';
import { RiskMonitorEntity } from '../../Model/RiskMonitorEntity.model';
import {RiskMonitorService} from '../../Service/RiskMonitor.service';
import {DataServiceService} from '../../Service/data-service.service'
import * as Chart from 'chart.js';
import { DaterangepickerConfig } from 'ng2-daterangepicker';

@Component({
  selector: 'app-risk',
  templateUrl: './risk.component.html',
  styleUrls: ['./risk.component.css']
})
export class RiskComponent implements OnInit {
  objRiskData: RiskMonitorEntity;
  outputVals=[];
  startDate: any;
  endDate: any;
  tempDate: any;
  chart:any;
  chartCollection=[];
  
  constructor( private riskMonitorService: RiskMonitorService, private ds:DataServiceService,
    private daterangepickerOptions: DaterangepickerConfig) { 
    this.startDate = new Date().toLocaleDateString("en-US");
    this.endDate = new Date(-1).toLocaleDateString("en-US");
    this.daterangepickerOptions.settings = {
      locale: { format: 'YYYY-MM-DD' },
      alwaysShowCalendars: false,
      start:this.startDate,
      end:this.endDate
    };
  }

  public selectedDate(value: any) {
    this.startDate = value.end._d.toLocaleDateString("en-US");
    this.endDate = value.start._d.toLocaleDateString("en-US");
    this.initializeMarginChart();
  }

  ngOnInit() {
    this.initializeMarginChart();     
  }

  initializeMarginChart(){
    if(this.chart)
      this.chart.destroy();

    this.riskMonitorService.getRiskMonitorRisk(this.startDate, this.endDate).subscribe((res) => {
      this.objRiskData = res;
      this.outputVals.push(parseFloat(this.objRiskData.TotalRisk.toString()).toFixed(2));
      this.outputVals.push(parseFloat(this.objRiskData.TotalRiskPercent.toString()).toFixed(2));
      this.ds.sendRiskData(this.outputVals);

      var totalRisk1 = res['objRiskData'].map(res=>res.TotalRisk1)
      var totalRisk2 = res['objRiskData'].map(res=>res.TotalRisk2)
      var totalMarginPercent=[];
      for(var i=0; i<totalRisk1.length;i++){
        totalMarginPercent.push((totalRisk1[i]/totalRisk2[i])*0.01);
      }
      var allDates = res['objRiskData'].map(res=>res.sampleDate.toString().split('T')[0])
      
      let totalRisk1Collection=[];
      let totalRisk2Collection=[];
      let allDatesCollection=[];

      totalRisk1Collection = totalRisk1;
      totalRisk2Collection = totalRisk2;
      allDatesCollection = allDates;

      this.chart = new Chart('canvas',{ 
          type:'bar',
          data:{
            labels:allDatesCollection,
            datasets:[
              {
                label:'totalRisk1',
                data:totalRisk1,
                borderColor:'#3cba9f',
                fill:false
              },
              {
                label:'totalRisk2',
                data:totalRisk2Collection,
                borderColor:'#ffcc00',
                fill:false,
                type:'line'
              }
            ]
          },
          options:{
            legend:{
              display:false
            },
            scales:{
              xAxes:[{
                  display:true
                }],
              yAxes:[{
                display:true
                }]              
            }
          }        
      })
      this.chartCollection = this.chart;
    }); 
  }

}
