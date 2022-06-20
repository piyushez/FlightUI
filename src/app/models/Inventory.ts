export class Inventory {    
    flightNumber: string = '';
    airlineNo: string = '';
    fromPlace: string = '';
    toPlace: string = '';
    startDateTime: Date= new Date();
    endDateTime: Date = new Date();
    scheduleDays: string = '';
    instrumentUsed: string = '';
    businessClassSeat: number = 0;
    nonBusinessClassSeat: number = 0;
    ticketCost: number = 0;
    noOfRows: number = 0;
    meal: string = '';
    isBlock:number=0;
}