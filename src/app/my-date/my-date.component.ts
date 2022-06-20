import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';



@Component({
  selector: 'app-my-date',
  templateUrl: './my-date.component.html',
  styleUrls: ['./my-date.component.css']
})
export class MyDateComponent {

  _date: any;
  @Input() set date(d: Date) {
      this._date = this.toDateString(d);
  }
  @Output() dateChange: any;
  constructor() {
      this.date = new Date();
      this.dateChange = new EventEmitter();       
  }

  private toDateString(date: Date): string {
      return (date.getFullYear().toString() + '-' 
         + ("0" + (date.getMonth() + 1)).slice(-2) + '-' 
         + ("0" + (date.getDate())).slice(-2))
         + 'T' + date.toTimeString().slice(0,5);
  }

  private parseDateString(date:string): Date {
     date = date.replace('T','-');
     var parts = date.split('-');
     var timeParts = parts[3].split(':');

    // new Date(year, month [, day [, hours[, minutes[, seconds[, ms]]]]])
    return new Date(parseInt(parts[0]),parseInt(parts[1])-1,parseInt(parts[2]),
    parseInt(timeParts[0]),parseInt(timeParts[1]));     // Note: months are 0-based

  }

  private onDateChange(value: string): void {
      if (value != this._date) {
          var parsedDate = this.parseDateString(value);

          // check if date is valid first
          if (parsedDate.getTime() != NaN) {
             this._date = value;
             this.dateChange.emit(parsedDate);
          }
      }
  }
}


