import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Airline } from '../models/Airline';
import { AirlineService } from '../services/airlineService';
import { InventoryService } from '../services/inventoryService';

@Component({
  selector: 'app-airline',
  templateUrl: './airline.component.html',
  styleUrls: ['./airline.component.css']
})
export class AirlineComponent implements OnInit {
airlineList:Array<Airline>= new Array<Airline>();
  constructor(private _airlineService:AirlineService,private _inventoryService:InventoryService,
    private _router:Router
    ) { }

  ngOnInit(): void {
    this._airlineService.getAirlinesData().subscribe(res => {        
     console.log(res);
      this.airlineList=res.data    
         
     });
  }
  addInventory(id:any){
    let newData:NavigationExtras={
      queryParams:{
        airlineNo:id,
       }
    }
    this._router.navigate(["/addInventory"],newData);
  }
  blockAirLine(id:any,val:any){
    this._airlineService.deleteAirline(id).subscribe(response => {
      console.log("airline deleted"+response);
      if(response.isSuccess==true){
        alert("Airline "+val+" successfully");
        window.location.reload();
      }else{
        alert(response.data);
      }
    });
      this._inventoryService.blockInventory(id).subscribe(response => {
        console.log("inventory deleted"+response)
      });
  }
}
