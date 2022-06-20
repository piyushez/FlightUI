import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from  '@angular/forms';
import { LoginService } from '../services/loginServices';
import { Router } from '@angular/router';
import { AirlineService } from '../services/airlineService';
import { InventoryService } from '../services/inventoryService';
@Component({
  selector: 'app-add-airline',
  templateUrl: './add-airline.component.html',
  styleUrls: ['./add-airline.component.css']
})
export class AddAirlineComponent implements OnInit {

  airlineForm: any;
  
    submitted = false;
   
    constructor( private formBuilder: FormBuilder, 
      private _airlineService:AirlineService,
    private _router:Router ,private _inventoryService:InventoryService) { }

    ngOnInit() {
        this.airlineForm = this.formBuilder.group({
            AirlineNo: ['', Validators.required],
            //ContactNumber: ['',[Validators.required, Validators.pattern("^[0-9]*$"),Validators.min(10)]],
            ContactNumber: ['',Validators.required],
            ContactAddress: ['', Validators.required]
        });

      
    }

    
    get f() { return this.airlineForm.controls; }

    onSubmit() {
        this.submitted = true;

       let data=this.airlineForm.value;
       console.log(data)
        if (this.airlineForm.invalid) {
            return;
        }else{
            this._airlineService.addAirlineDetails(data).subscribe(response => {
                console.log(response)
                if(response.isSuccess==true){
                  alert("Airline details added successfully");
                  this._router.navigate(["/airlines"]);
                }else if(response.isSuccess==false && response.data!=""){
                  alert(response.data);
                }
               
        },err=>{
          console.log(err);
          alert(err?.statusText);
        });

    }

}

}
