import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { IUser } from '../models/i-user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  httpOption;

  constructor(private httpClient:HttpClient,private router: Router) {
    this.httpOption={
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        // Authorization: 'my-auth-token'
      })
    };
   }


   userLogin(user: IUser):Observable<IUser> {
    return this.httpClient.post<IUser>(`${environment.apiUrl}/api/auth/signinAdmin`,JSON.stringify(user),this.httpOption)
  }
  logout(){
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminInfo');
    this.router.navigate(['login']);
  }


  isLoggedIn(){
    return !!localStorage.getItem('adminToken');
  }

  getToken(){
    return localStorage.getItem('adminToken');
  }
}
