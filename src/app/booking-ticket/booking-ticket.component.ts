import { Component, OnInit } from '@angular/core';
import { tick } from '@angular/core/testing';
import { FormBuilder,Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CouponTbl } from '../models/CouponTbl';
import { FlightBooking } from '../models/FlightBooking';
import { FlightBookService } from '../services/flighBookService';
import { InventoryService } from '../services/inventoryService';



@Component({
  selector: 'app-booking-ticket',
  templateUrl: './booking-ticket.component.html',
  styleUrls: ['./booking-ticket.component.css']
})
export class BookingTicketComponent implements OnInit {
  bookingForm:any;
  isCouponApplid=false;
  submitted=false;
  couponCode:any;
  flightNumber:any;
  
  cost:any;
  airlineNo:any;
  meal:any;
  flightDate:any;
  fromPlace:any;
  toPlace:any;
  couponForm:any;
  couponDetails:CouponTbl= new CouponTbl();
  bookingFlightsData:Array<FlightBooking>=new Array<FlightBooking>();
bookingItem:any;

  constructor(private _data: InventoryService, private _service: FlightBookService, 
    private activeRoute:ActivatedRoute,private _router:Router,
    private formBuilder: FormBuilder) {
      this.AddRow();
      this.activeRoute.queryParams.
      subscribe(params=>{
        debugger;
        this.flightNumber=params['flightNumber'];
        this.cost=Number(params['ticketCost']);
        this.airlineNo=params['airlineNo'];
        this.meal=params['Meal'];
        this.flightDate=params["flightDate"];
        this.fromPlace=params["fromPlace"];
        this.toPlace=params["toPlace"];
       
        
        this.couponCode="";
      });
     }
     AddRow() {

      this.bookingItem = new FlightBooking();
      this.bookingFlightsData.push(this.bookingItem);
    }
    DeletRow(index: any) {
      debugger;
      this.bookingFlightsData = this.bookingFlightsData.splice(index);
      return this.bookingFlightsData;
  
    }
  ngOnInit(): void {
 
  }

  get f() { return this.bookingForm.controls; }
  validateCoupon(data:any){
 
    debugger;
    console.log(data);
    this.couponDetails=new CouponTbl();
    this.isCouponApplid=false;
    this._service.ApplyCoupon(data).subscribe(res => {        
      console.log(res);
      this.couponDetails=new CouponTbl();
      if(res.isSuccess==true){
       
        this.couponDetails=res.data;
        this.isCouponApplid=true;
      }else if(res.isSuccess==false){
        alert(res.data);
      }
      },err=>{
        console.log("err",err);
  
      });
  }
  submit() {
   
    // var name;
    debugger;
   
    this.bookingFlightsData.map(ticket=>{
      ticket.ticketCost=this.cost;
      ticket.flightNumber=this.flightNumber;
      ticket.meal=this.meal;
      ticket.flightDate=this.flightDate;
      ticket.loggedInUserEmail=localStorage.getItem("userEmail");
      ticket.couponCode=this.couponDetails.couponCode;
      ticket.isCouponApplied=this.isCouponApplid;
      if(this.isCouponApplid){
        ticket.actualCostAfterDis=Number(this.cost)-this.couponDetails.amount
      }else{
        ticket.actualCostAfterDis=Number(this.cost)
      }
   
    })
   
    this._service.bookTicket(this.bookingFlightsData).subscribe(res => {        
      console.log(res);
      if(res.isSuccess==true){
        alert("Ticket(s) added successfully");
        this._router.navigate(["/tickethistory"]);
      }
      },err=>{
        console.log("err",err);
      });
   // this._service.bookFlightForUser(this.userbookarr).subscribe(res=>alert(res),err=>console.log(err));
  }
}
