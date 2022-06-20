import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root' 
  })
export class InventoryService {
    headers: any;
    private _inventoryURL = 'http://localhost:5009/inventory/get';
    private _addInventoryUrl = 'http://localhost:5009/inventory/add';
    private _searchFlightURL = 'http://localhost:5009/inventory/search';
    private _getInventByFilghtNoUrl = 'http://localhost:5009/inventory/getInventory/';
   private _blockInventoryURL='http://localhost:5009/inventory/deleteAirlineByNo/';
   private _blockInventoryByFlightURL='http://localhost:5009/inventory/deleteInventoryByFlight/';
   private _updateInventoryURL='http://localhost:5009/Inventory/updateInventory';
    constructor(private http: HttpClient, private router: Router) {
    }

    getFlightDetails(fromplace: any, toplace: any,fromDate:any,toDate:any,isOneWay:any) {
       debugger;
        var link=this._searchFlightURL+"?fromPlace="+fromplace+"&toPlace="+toplace+""+
        "&startDate="+fromDate+"&endDate="+toDate;
        return this.http.get<any>(link);
    }
    getAllInventory() {
        return this.http.get<any>(this._inventoryURL);
    }
getInventoryByFlightNumber(id:any){
    return this.http.get<any>(this._getInventByFilghtNoUrl+id);
}
    addInventory(inventory: any) {
        debugger;
        var data = {
            flightNumber: inventory.flightNumber,
            airlineNo: inventory.airlineNo,
            fromPlace: inventory.fromPlace,
            toPlace: inventory.toPlace,
            startDateTime: inventory.startDateTime,
            endDateTime: inventory.endDateTime,
            scheduleDays: inventory.scheduleDays,
            instrumentUsed: inventory.instrumentUsed,
            businessClassSeat: Number(inventory.businessClassSeat),
            nonBusinessClassSeat: Number(inventory.nonBusinessClassSeat),
            ticketCost: Number(inventory.ticketCost),
            noOfRows: Number(inventory.noOfRows),
            meal: inventory.meal

        }
        return this.http.post<any>(this._addInventoryUrl, data);
    }
    updateInventory(inventory: any) {
        debugger;
        var data = {
            flightNumber: inventory.flightNumber,
            airlineNo: inventory.airlineNo,
            fromPlace: inventory.fromPlace,
            toPlace: inventory.toPlace,
            startDateTime: inventory.startDateTime,
            endDateTime: inventory.endDateTime,
            scheduleDays: inventory.scheduleDays,
            instrumentUsed: inventory.instrumentUsed,
            businessClassSeat: Number(inventory.businessClassSeat),
            nonBusinessClassSeat: Number(inventory.nonBusinessClassSeat),
            ticketCost: Number(inventory.ticketCost),
            noOfRows: Number(inventory.noOfRows),
            meal: inventory.meal

        }
        return this.http.put<any>(this._updateInventoryURL, data);
    }
    blockInventoryByFlight(id:any)
    {
        return this.http.delete<any>(this._blockInventoryByFlightURL+id);
    }
    blockInventory(id:any)
    {
        return this.http.delete<any>(this._blockInventoryURL+id);
    }
}