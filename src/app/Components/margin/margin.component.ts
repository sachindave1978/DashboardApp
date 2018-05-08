import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MarginEntity } from '../../Model/MarginEntity.model'
import { RiskMonitorEntity } from '../../Model/RiskMonitorEntity.model'
import {RiskMonitorService} from '../../Service/RiskMonitor.service'
import {DataServiceService} from '../../Service/data-service.service'
import * as Chart from 'chart.js';
import { DaterangepickerConfig } from 'ng2-daterangepicker';
import {TilesComponent} from '../tiles/tiles.component';

@Component({
  selector: 'app-margin',
  templateUrl: './margin.component.html',
  styleUrls: ['./margin.component.css']
})
export class MarginComponent implements OnInit {
  objMarginData: RiskMonitorEntity;
  outputVals=[];
  startDate: any;
  endDate: any;
  chart:any;
  chartCollection=[];
  totalMarginPercentFilter:number = 0;
  
  constructor(private riskMonitorService: RiskMonitorService, private ds:DataServiceService,
    private daterangepickerOptions: DaterangepickerConfig) { 
    this.startDate = new Date().toLocaleDateString("en-US");
    this.endDate = new Date(-1).toLocaleDateString("en-US");
    this.daterangepickerOptions.settings = {
      locale: { format: 'YYYY-MM-DD' },
      alwaysShowCalendars: false,
      start:this.startDate,
      end:this.endDate
    };
    this.initializeMarginChart();
  }

  public selectedDate(value: any) {
    this.startDate = value.end._d.toLocaleDateString("en-US");
    this.endDate = value.start._d.toLocaleDateString("en-US");
    this.initializeMarginChart();
  }

  ngOnInit() {
    
  }

  applyFilter(item)
  {
    this.totalMarginPercentFilter = item;
    this.initializeMarginChart();    
  }
  

  initializeMarginChart(){
    if(this.chart)
      this.chart.destroy();

    this.riskMonitorService.getRiskMonitorMargin(this.startDate, this.endDate).subscribe((res) => {
      this.objMarginData = res;
      this.outputVals.push(parseFloat(this.objMarginData.TotalMargin.toString()).toFixed(2));
      this.outputVals.push(parseFloat(this.objMarginData.TotalMarginPercent.toString()).toFixed(2));
      this.ds.sendMarginData(this.outputVals);

      var netIncome = res['objMarginData'].map(res=>res.NetIncome)
      var totalRevenue = res['objMarginData'].map(res=>res.TotalRevenue);
      var MarginPercent = res['objMarginData'].map(res=>res.MarginPercent);

      var totalMarginPercent=[];
      for(var i=0; i<netIncome.length;i++){
        if(this.totalMarginPercentFilter>0)
        {
          var temp = (netIncome[i]/totalRevenue[i]);
          if(temp>this.totalMarginPercentFilter)
            totalMarginPercent.push(temp);
        }
        else
          totalMarginPercent.push((netIncome[i]/totalRevenue[i]));
      }
      var allDates = res['objMarginData'].map(res=>res.sampleDate.toString().split('T')[0])
      
      let netIncomeCollection=[];
      let totalRevenueCollection=[];
      let allDatesCollection=[];

      netIncomeCollection = netIncome;
      totalRevenueCollection = totalRevenue;
      allDatesCollection = allDates;

      this.chart = new Chart('canvas',{ 
          type:'bar',
          data:{
            labels:allDatesCollection,
            datasets:[
              {
                label:'Net Income',
                data:netIncomeCollection,
                borderColor:'#3cba9f',
                fill:false,
                yAxisID:'1'
              },
              {
                label:'Total Revenue',
                data:totalRevenueCollection,
                borderColor:'#ff0000',
                fill:false,
                type:'line'
              },
              {
                label:'%  Margin',
                data:MarginPercent,
                borderColor:'#00ff00',
                fill:false,
                type:'line',
                yAxisID:'2'
              }
            ]
          },
          options:{
            legend:{
              display:false
            },
            scales:{
              xAxes:[{
                  display:true,
                  scaleLabel: {
                    display: true,
                    labelString: 'Date'
                  }
                }],
              yAxes:[{
                display:true,
                scaleLabel: {
                  display: true,
                  labelString: 'Net Income'
                 },
                 id:'1',
                 position:'left',
                },
                {
                  display:true,
                  scaleLabel: {
                    display: true,
                    labelString: '%Margin'
                  },
                  id:'2',
                  position:'right',
                }]              
            }
          }        
      })
      this.chartCollection = this.chart;
    });
  }
}
