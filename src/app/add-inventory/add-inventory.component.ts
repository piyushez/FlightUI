import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Airline } from '../models/Airline';
import { AirlineService } from '../services/airlineService';
import { InventoryService } from '../services/inventoryService';

@Component({
  selector: 'app-add-inventory',
  templateUrl: './add-inventory.component.html',
  styleUrls: ['./add-inventory.component.css']
})
export class AddInventoryComponent implements OnInit {
  inventoryForm: any;
  airLineNo:any;
  submitted = false;
  airlineList:Array<Airline>= new Array<Airline>();
    flightNumber: any;
    airlineNo: any;
    fromPlace: any;
    toPlace: any;
    startDateTime: any;
    endDateTime: any;
    scheduleDays: any;
    instrumentUsed: any;
    businessClassSeat: number = 0;
    nonBusinessClassSeat: number = 0;
    ticketCost: number = 0;
    noOfRows: number = 0;
    meal: any;
    isAddMode: boolean=true;
    // mealOptions=[
    //   {id:"Veg",name:"Veg" },
    //   {id:"Non-veg",name:"Non-veg" },
    // ];
  constructor( private formBuilder: FormBuilder, 
  private activeRoute:ActivatedRoute,private _airlineService:AirlineService,
  private _router:Router ,private _inventoryService:InventoryService) { 

    this.activeRoute.queryParams.
    subscribe(params=>{
      this.airLineNo=params['airlineNo']
    });
    this.flightNumber = this.activeRoute.snapshot.params['id']==undefined?"":this.activeRoute.snapshot.params['id'];
        this.isAddMode = !this.flightNumber;
  }

  ngOnInit() {
    debugger;
    this._airlineService.getAirlinesData().subscribe(res => {        
      console.log(res);
       this.airlineList=res.data    
          
      });
   
      this.inventoryForm = this.formBuilder.group({
          flightNumber: [!this.isAddMode?{value:'',readonly:!this.isAddMode}:"",Validators.required],
          airlineNo: [!this.isAddMode?{value:this.airLineNo,readonly:!this.isAddMode}:"", Validators.required],
          fromPlace: ['', Validators.required],
          toPlace: ['', Validators.required],
          startDateTime: [Date.now, Validators.required],
          endDateTime: ['', Validators.required],
          scheduleDays: ['', Validators.required],
          instrumentUsed: [''],
          businessClassSeat: [0, Validators.required],
          nonBusinessClassSeat: [0, Validators.required],
          ticketCost: ['', Validators.required],
          noOfRows: ['', Validators.required],
          meal:['', Validators.required],
      });

    
        if (!this.isAddMode) {
          this._inventoryService.getInventoryByFlightNumber(this.flightNumber).
          subscribe(res => {        
            console.log(res);
            debugger;
             this.inventoryForm.patchValue(res.data);
            });
              
               
      }
  }

  
  get f() { return this.inventoryForm.controls; }

  onSubmit() {
      this.submitted = true;

     let data=this.inventoryForm.value;
     console.log(data)
      if (this.inventoryForm.invalid) {
          return;
      }else{
          if(this.isAddMode){
            this.Add(data);
          }else{
            this.Update(data);
          }
  }
  }

  Add(data:any){
    this._inventoryService.addInventory(data).subscribe(response => {
      debugger;
        console.log(response)
        if(response.isSuccess==true){
          alert("Inventory  added successfully");
         this._router.navigate(["/inventories"]);
        }else if(response.isSuccess==false && response.data!=""){
          alert(response.data);
        }
       
},err=>{
  console.log(err);
  alert(err?.statusText);
});

  }

  Update(data:any){
    this._inventoryService.updateInventory(data).subscribe(response => {
      debugger;
        console.log(response)
        if(response.isSuccess==true){
          alert("Inventory  updated successfully");
         this._router.navigate(["/inventories"]);
        }else if(response.isSuccess==false && response.data!=""){
          alert(response.data);
        }
       
},err=>{
  console.log(err);
  alert(err?.statusText);
});

  }
}


