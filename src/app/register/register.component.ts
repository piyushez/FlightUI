import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from  '@angular/forms';
import { LoginService } from '../services/loginServices';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponentComponent implements OnInit {

  form: any;
  loading = false;
  submitted = false;
 
  constructor( private formBuilder: FormBuilder, 
    private _loginService:LoginService,
    private _router:Router ) { }

  ngOnInit() {
      this.form = this.formBuilder.group({
          Username: ['', Validators.required],
          Password: ['', Validators.required],
          Email:['', Validators.required]
         // Email:['', [Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$") ]],
      });

    
  }

  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;

    let data=this.form.value;
    console.log(data)
     if (this.form.invalid) {
         return;
     }else{
         this._loginService.registerUser(data).subscribe(res => {
           console.log(res);
            if(res.status=="Success"){
                alert("User Register Succesfully");
                this._router.navigate(["/login"])
            }else{
                alert(res.message);
            }
     },err=>{
       alert(err.data);
     });

    
     
    };
}
}
