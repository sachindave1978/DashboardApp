import { Component, OnInit } from '@angular/core';
import { DaterangepickerConfig } from 'ng2-daterangepicker';

@Component({
  selector: 'app-exposure',
  templateUrl: './exposure.component.html',
  styleUrls: ['./exposure.component.css']
})
export class ExposureComponent implements OnInit {
  message: string;
  constructor() { 
    this.message = "No Data Available For Exposure..";
  }

  ngOnInit() {
    this.message = "No Data Available For Exposure..";
  }

}
