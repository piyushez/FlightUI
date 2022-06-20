export class FlightBooking{
    id:number=0;
    flightNumber:string="";
    eMail:string|null="";
    seatNumber:string="";
    passengerName:string="";
    gender:string="";
    age:number=0;
    meal:string="";
    pnrNumber:string="";;
    flightDate:string="";;
    loggedInUserEmail:string|null="";
    isCouponApplied:boolean=false;
    couponCode:string="";
    ticketCost:number=0;
    actualCostAfterDis:number=0;
    classSeat:string="";
}
