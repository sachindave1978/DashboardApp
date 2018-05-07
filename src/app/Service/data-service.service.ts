import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class DataServiceService {

  private subject1 = new Subject<any>();
  private subject2 = new Subject<any>();
 
    //Margin
    sendMarginData(message: any) {
        this.subject1.next(message);
    } 
    clearData() {
        this.subject1.next();
    } 
    getMarginData(): Observable<any> {
        return this.subject1.asObservable();
    }

    //Risk
    sendRiskData(message: any) {
      this.subject2.next(message);
    }
    getRiskData(): Observable<any> {
        return this.subject2.asObservable();
    }
}
