import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CouponTbl } from '../models/CouponTbl';
import { FlightBookService } from '../services/flighBookService';

@Component({
  selector: 'app-coupon-list',
  templateUrl: './coupon-list.component.html',
  styleUrls: ['./coupon-list.component.css']
})
export class CouponListComponent implements OnInit {
  couponList:Array<CouponTbl>= new Array<CouponTbl>();
  constructor(private _service:FlightBookService,
    private _router:Router
    ) { }

  ngOnInit(): void {
    this._service.getAllCouponList().subscribe(res => {        
      console.log(res);
       this.couponList=res.data    
          
      });
   }
  
  couponDelete(couponCode:any){
    this._service.cancelCoupon(couponCode).subscribe(response => {
      console.log("coupon deleted"+response);
      if(response.isSuccess==true){
        alert("Coupon deleted successfully");
        window.location.reload();
      }else{
        alert(response.data);
      }
    });
  }
}
