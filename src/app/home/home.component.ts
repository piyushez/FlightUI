import { Component, OnInit } from '@angular/core';
import { CouponTbl } from '../models/CouponTbl';
import { FlightBookService } from '../services/flighBookService';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  couponList:Array<CouponTbl>= new Array<CouponTbl>();
  constructor(private _flightBookService:FlightBookService) { }

  ngOnInit(): void {
    this._flightBookService.getCouponList().subscribe(res => {        
     console.log(res);
      this.couponList=res.data    
         
     });
  }
}
