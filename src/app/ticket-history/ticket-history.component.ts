import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlightBooking } from '../models/FlightBooking';
import { FlightBookService } from '../services/flighBookService';
import{jsPDF} from 'jspdf';
import { InventoryService } from '../services/inventoryService';
@Component({
  selector: 'app-ticket-history',
  templateUrl: './ticket-history.component.html',
  styleUrls: ['./ticket-history.component.css']
})
export class TicketHistoryComponent implements OnInit {

  ticketHistory:Array<FlightBooking>= new Array<FlightBooking>();
  constructor(private _bookingService:FlightBookService,
    private _router:Router,private _inventoryService:InventoryService
    ) { }

  ngOnInit(): void {
    this._bookingService.getAllBookingByEmailId(localStorage.getItem("userEmail")).subscribe(res => {        
     console.log(res);
     debugger;
      this.ticketHistory=res.data    
         
     });
  }
  cancelTicket(data:any){
    this._bookingService.cancelTicket(data.pnrNumber).subscribe(res => {        
      console.log(res);
      debugger;
      if(res.isSuccess==true){
        alert("Ticket deleted successfully");
      }else{
        alert(res.data);
      }
          
      });
  }

  downloadTicket(data:any)
  {
    debugger;
    var fromPlace="";
    var toPlace="";
    this._inventoryService.getInventoryByFlightNumber(data.flightNumber).subscribe(res=>{
     if(res.isSuccess==true){
      fromPlace=res.data.fromPlace;
      toPlace=res.data.toPlace;

      this._bookingService.downloadTicket(data.pnrNumber,fromPlace,toPlace).subscribe(res => {
        let DATA = res.data;
        debugger;
        const doc = new jsPDF('p','pt', 'a3');
        doc.html(DATA, {
          callback: function (doc) {
                doc.save(data.pnrNumber+".pdf");
              },
          margin:0,
          x: 0,
          y: 0
        });
        });
     }
    
    },err=>{

    });

   
       
  }
displayCancelBtn(data:any){
  if( new Date(data.flightDate) > new Date()){
    return true;
  }else{
    return false;
  }
 
}
}
