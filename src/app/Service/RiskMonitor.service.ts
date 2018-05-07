import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { HttpClientModule, HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/map'
import { MarginEntity } from '../Model/MarginEntity.model';
import { RiskMonitorEntity } from '../Model/RiskMonitorEntity.model';
const httpOptions = {
  headers: new HttpHeaders( 
    'Access-Control-Allow-Origin: *'
  )
};

@Injectable()
export class RiskMonitorService {
constructor(private http: HttpClient) { }
    private apiURL: string = 'http://localhost:55776/';
    
    public getRiskMonitor(startDate:any, endDate:any): Observable<RiskMonitorEntity> {
    return this.http.get<RiskMonitorEntity>(this.apiURL + 'api/get-risk-monitor')
    .map(data => data);
    };

    public getRiskMonitorMargin(startDate:any, endDate:any): Observable<RiskMonitorEntity> {
      return this.http.get<RiskMonitorEntity>(this.apiURL + 'api/get-risk-monitor-margin?startDate='+startDate+'&endDate='+endDate)
      .map(data => data);
    };

    public getRiskMonitorRisk(startDate:any, endDate:any): Observable<RiskMonitorEntity> {
      return this.http.get<RiskMonitorEntity>(this.apiURL + 'api/get-risk-monitor-risk?startDate='+startDate+'&endDate='+endDate)
      .map(data => data);
    };
}