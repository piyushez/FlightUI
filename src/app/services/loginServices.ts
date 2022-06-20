import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Router} from '@angular/router';

@Injectable({
    providedIn: 'root' 
  })
export class LoginService
{
    private _loginUrl='http://localhost:5009/Admin/Login';
    private _registerUrl='http://localhost:5009/Admin/userRegister';
    constructor(private http:HttpClient,private router:Router) {
               
    }

    loginUser(user:any)
    {

       var data={
            Username:user.Username,
            Password:user.Password
        }
        return this.http.post<any>(this._loginUrl,data);
    }

    registerUser(user:any)
    {
        return this.http.post<any>(this._registerUrl,user);
    }

    logoutUser()
    {
        localStorage.removeItem('token');
        localStorage.removeItem('isAdmin');
        localStorage.removeItem('user');
        localStorage.removeItem('userEmail');
        this.router.navigate(['/home']).then(()=>{window.location.reload()})  ;
    }

    getToken()
    {
        return localStorage.getItem('token');
    }

    adminDetail()
    {               
        return localStorage.getItem('isAdmin');
    }
    loggedIn()
    {
        return !!localStorage.getItem('token');
    }
}