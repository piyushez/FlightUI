import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Router} from '@angular/router';

@Injectable({
    providedIn: 'root' 
  })
export class FlightBookService
{
    private _getCouponList='http://localhost:5009/Booking/getCouponList';
    private _getCouponAllList='http://localhost:5009/Booking/getAllCouponList';
    private _applyCouponDetails='http://localhost:5009/Booking/applyCoupon';
    private _addCouponURL='http://localhost:5009/Booking/addcoupon';
    private _bookTicket='http://localhost:5009/Booking/bookTicket';
    private _recordByEmailIdURL='http://localhost:5009/Booking/getHistoryTicketsByUser/';
    private _searchTickets='http://localhost:5009/Booking/search';
    private _recordByPnrURL='http://localhost:5009/booking/ticket/';
    private _cancelTicket='http://localhost:5009/booking/cancelTicket/'
    private _deleteCoupon='http://localhost:5009/Booking/deletecoupon/'
    private _downloadTicket="http://localhost:5009/Booking/getTicketPDF";
    constructor(private http:HttpClient,private router:Router) {
    }
    
    bookTicket(ticketDetails:any)
     {    
   
        return this.http.post<any>(this._bookTicket,ticketDetails);
    }
    downloadTicket(pnr:any,from:any,to:any)
    {
        
        var link=this._downloadTicket+"?pNRNumber="+pnr+"&fromPlace="+from+"&toPlace="+to;
        return this.http.get<any>(link);
    }

    cancelTicket(PNR:any)
    {
        return this.http.delete<any>(this._cancelTicket+PNR)
    }
    getTicketByPNR(PNR:any)
    {
        return this.http.get<any>(this._recordByPnrURL+PNR);
    }
    getAllBookingByEmailId(emailId:any)
    {
        return this.http.get<any>(this._recordByEmailIdURL+emailId);
    }
    getAllBooking()
    {
        return this.http.get<any>(this._bookTicket);
    }
    getCouponList()
    {
        return this.http.get<any>(this._getCouponList);
    }
    getAllCouponList()
    {
        return this.http.get<any>(this._getCouponAllList);
    }
    ApplyCoupon(code:any){
        var email=localStorage.getItem("userEmail");
        return this.http.get<any>(this._applyCouponDetails+"?couponCode="+code+"&email="+email);
    }
    
    getSearchList(searchBasedOn: any, searchValue: any) {
        debugger;
        var loginEmail=localStorage.getItem("userEmail");
         var link=this._searchTickets+"?searchBasedon="+searchBasedOn+"&searchValue="+searchValue+
         "&email="+loginEmail;
         return this.http.get<any>(link);
     }
   
     addCouponDetails(data:any)
     {    
           return this.http.post<any>(this._addCouponURL,data);
     }
    
     cancelCoupon(data:any)
     {
         return this.http.delete<any>(this._deleteCoupon+data)
     }
   
   
}