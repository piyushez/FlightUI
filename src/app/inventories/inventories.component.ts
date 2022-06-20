import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Inventory } from '../models/Inventory';
import { InventoryService } from '../services/inventoryService';

@Component({
  selector: 'app-inventories',
  templateUrl: './inventories.component.html',
  styleUrls: ['./inventories.component.css']
})
export class InventoriesComponent implements OnInit {
isAdmin=localStorage.getItem("isAdmin");
  inventoryList:Array<Inventory>= new Array<Inventory>();
  constructor(private _inventoryService:InventoryService,private _router:Router) { }

  ngOnInit(): void {
    this._inventoryService.getAllInventory().subscribe(res => {        
     console.log(res);
      this.inventoryList=res.data    
         
     });
  }
  
  blockInventoryByFlight(id:any,val:any){
   this._inventoryService.blockInventoryByFlight(id).subscribe(res => {        
    console.log(res);
    if(res.isSuccess==true){
      alert("Inventory "+val+" successfully");
      window.location.reload();
    }else{
      alert(res.data);
    }
   
    });
  }
updateInventory(data:any){
  this._router.navigate(["/updateInventory",data.flightNumber]);
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
