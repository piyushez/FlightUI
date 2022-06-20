import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FlightBooking } from '../models/FlightBooking';
import { FlightBookService } from '../services/flighBookService';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
form:any;
ticketList:Array<FlightBooking>= new Array<FlightBooking>();
submitted:any=false;
  constructor(private _router:Router,private _formBuilder:FormBuilder,private _service:FlightBookService) { }

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      searchValue: ['', Validators.required],
      searchBasedOn: ['', Validators.required]
  });
  }
  get f() { return this.form.controls; }

  onSubmit() {
    debugger;
    let data=this.form.value;
    if(data.searchValue=="" || data.searchBasedOn=="")
    {
      alert("Please fill details");
      return;
    }
    
     
     this._service.getSearchList(data.searchBasedOn,data.searchValue).subscribe(res=>{
        debugger;
    
      if(res.isSuccess==true){
        this.ticketList=res.data;
      }else{
        alert(res.data);
        this.ticketList=new Array<FlightBooking>();
      }
      },err=>{        
     
     alert(err)
      })
     
  }

}
