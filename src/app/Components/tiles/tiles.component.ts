import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tiles',
  templateUrl: './tiles.component.html',
  styleUrls: ['./tiles.component.css']
})
export class TilesComponent implements OnInit {
  newTmpArr1 = [
    ["R  > 40%"],
    ["M  > 40%"]
  ];
  newTmpArr2 = [
    ["E  > 40%"],
    ["PV > 40%"]
  ];

  constructor() { }

  ngOnInit() {
  }

}
