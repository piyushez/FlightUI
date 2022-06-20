import { Component, OnInit ,} from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Inventory } from '../models/Inventory';
import { InventoryService } from '../services/inventoryService';
import { FormBuilder, FormGroup, Validators } from  '@angular/forms';
import { AirlineService } from '../services/airlineService';
@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {
serachForm:any;
  inventoryData: Inventory = new Inventory();
  inventoryModellist: Array<Inventory> = new Array<Inventory>();
  errorRes:string='';
  IsError:boolean=false;
  IsSearch:boolean=false;
  fromPlace: any;
  toPlace: any;
  fromDate:any;
  toDate:any;
  oneWay:any;
  constructor(private _service: InventoryService,private _airlineSerive:AirlineService
    ,private _router:Router, private formBuilder: FormBuilder) {
    
    
   }
  
  ngOnInit(): void {
    this.serachForm = this.formBuilder.group({
      fromPlace: [''],
      toPlace: [''],
      fromDate:[Date.now],
      toDate:[Date.now]
  });
  }
  IsAlert:Boolean=false;
  alerts:string='';

  SearchInvntory() {
    debugger;
    var fromPlaceData=this.serachForm.value.fromPlace;
    var toPlaceData=this.serachForm.value.toPlace;
    var fromDateData=this.serachForm.value.fromDate;
    
    var toDateData=null;
 
    this.IsError=false;
    this._service.getFlightDetails(fromPlaceData,toPlaceData,fromDateData,toDateData,
      this.oneWay).subscribe(res=>{
        debugger;
      this.IsSearch=true;
      if(res.isSuccess==true){
        this.inventoryModellist=res.data;
      }else{
        alert(res.data);
        this.inventoryModellist=new Array<Inventory>();
      }
      },err=>{        
      this.IsSearch=true;
     alert(err)
      })
  }

 
  GetAllInventory(){
    this._service.getAllInventory().subscribe(res=>
    {
      if(res.isSuccess==true){
        this.inventoryModellist=res.data;
      }
    },
    err=>alert(err));   
  }
 
  bookFlight(data:any){
    let newData:NavigationExtras={
  queryParams:{
    flightNumber:data.flightNumber,
    Meal:data.meal,
    flightDate:data.startDateTime,
    airlineNo:data.airlineNo,
    ticketCost:data.ticketCost,

    fromPlace:data.fromPlace,
    toPlace:data.toPlace
      }
    }
    this._router.navigate(["/bookingTicket"],newData);
  }
  
}

