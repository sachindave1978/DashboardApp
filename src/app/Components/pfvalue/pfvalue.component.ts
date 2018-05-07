import { Component, OnInit } from '@angular/core';
import { DaterangepickerConfig } from 'ng2-daterangepicker';

@Component({
  selector: 'app-pfvalue',
  templateUrl: './pfvalue.component.html',
  styleUrls: ['./pfvalue.component.css']
})
export class PfvalueComponent implements OnInit {
  message: string;
  constructor() { 
    this.message = "No Data Available For Porfolio..";
  }

  ngOnInit() {
    this.message = "No Data Available For Porfolio..";
  }

}
