import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Router} from '@angular/router';

@Injectable({
    providedIn: 'root' 
  })
export class AirlineService
{
    private _addAirlineUrl='http://localhost:5009/airline/register';
    private _deleteAirlineUrl='http://localhost:5009/airline/DeleteAirlineByNo/';
    private _airlineListUrl='http://localhost:5009/airline/getairline';
  
    constructor(private http:HttpClient,private router:Router) {
               
    }
    getAirlinesData()
    {
        return this.http.get<any>(this._airlineListUrl);
    }
    addAirlineDetails(airline:any)
    {
debugger;
       var data={
            AirlineNo:airline.AirlineNo,
            UploadLogo:"",
            ContactNumber:airline.ContactNumber,
            ContactAddress:airline.ContactAddress,
            isBlock:false,
        }
        console.log("service",data);
        return this.http.post<any>(this._addAirlineUrl,data);
    }
    deleteAirline(data:any){
        return this.http.delete<any>(this._deleteAirlineUrl+data);
    }

   

    

   
   
}