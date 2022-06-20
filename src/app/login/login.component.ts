import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from  '@angular/forms';
import { LoginService } from '../services/loginServices';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponentComponent {

   
    form: any;
  
    submitted = false;
   
    constructor( private formBuilder: FormBuilder, private _loginService:LoginService,
    private _router:Router ) { }

    ngOnInit() {
        this.form = this.formBuilder.group({
            Username: ['', Validators.required],
            Password: ['', Validators.required]
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
            this._loginService.loginUser(data).subscribe(response => {
                if(response.token!="" && response.status!="Error"){
                    console.log(response);
                    localStorage.setItem('token', response.token); 
                    localStorage.setItem('user',this.form.value.Username) ;
                    localStorage.setItem('userEmail', response.userEmail);
                   debugger;
                    if(this.form.value.Username=='Admin')
                    {        
                    localStorage.setItem('isAdmin', 'true');
                    this._router.navigate(['/airlines']);
                    }
                    else
                    {
                      localStorage.setItem('isAdmin', 'false');
                    this._router.navigate(['/userHome'])
                    }
                }else{
                    alert(response.message)
                }
                
              });
        }

       
    }
}
