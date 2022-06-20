import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/loginServices';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
admin:any;
isLoggedIn:any;
  constructor(private _login:LoginService) { 

  }
  
  ngOnInit(): void {
    this.isLoggedIn=this._login.loggedIn();
  }


  isAdmin()
  {  
    this.admin=this._login.adminDetail(); 
     if(this.admin==='true' && this.admin!=null)
     return true;
     else
     return false;
  }
LogOut()
{ this.isLoggedIn=false;
  return this._login.logoutUser();
}
  
LoggedIn(input:boolean)
{
  if(input)
  {          
  return this._login.loggedIn();
  }
  else
  return !this._login.loggedIn();
}
}
