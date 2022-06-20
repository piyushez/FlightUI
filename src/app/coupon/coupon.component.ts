import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FlightBookService } from '../services/flighBookService';

@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.css']
})
export class CouponComponent implements OnInit {

  form: any;
  
  submitted = false;
 
  constructor( private formBuilder: FormBuilder, private _service:FlightBookService,
  private _router:Router ) { }

  ngOnInit() {
      this.form = this.formBuilder.group({
          CouponCode: ['', Validators.required],
          CouponDesc: ['', Validators.required],
          ExpirationDate: [new Date(), Validators.required],
          Amount: [0, Validators.required]
      });

    
  }

  
  get f() { return this.form.controls; }

  onSubmit() {
      this.submitted = true;

     let data=this.form.value;
     console.log(data)
      if (this.form.invalid) {
          return;
      }else{
          this._service.addCouponDetails(data).subscribe(response => {
              if(response.isSuccess==true){
                  console.log(response);
                 alert("Coupon added successfully");
                 this._router.navigate(["/coupons"]);
              }else{
                  alert(response.data)
              }
              
            });
      }

     
  }

}
