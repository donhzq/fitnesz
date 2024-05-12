import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService  {

  user? : User;

  constructor(private http: HttpClient ) { 
     this.getUser();
  }


  // login
  login(userName: string , password: string) {
    // HTTP POST request
    const body = new URLSearchParams();
    body.set('username', userName);
    body.set('password', password);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    
    

    return this.http.post('http://localhost:5000/app/login', body, {headers: headers, withCredentials: true});
  }


  register(user: User) {
    // HTTP POST request
    const body = new URLSearchParams();
    body.set('userName' , user.userName);
    body.set('name' , user.name);
    body.set('password' , user.password);
    body.set('email' , user.email);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post('http://localhost:5000/app/register', body, {headers: headers});
  }

  logout() {
    return this.http.post('http://localhost:5000/app/logout', {}, {withCredentials: true, responseType: 'text'});
  }

  checkAuth() {
    return this.http.get<boolean>('http://localhost:5000/app/checkAuth', {withCredentials: true});
  }

  
 async getUser(): Promise<any> {

    try {
      this.user = await this.http.get<User>('http://localhost:5000/app/getUser', {withCredentials: true}).toPromise();
      sessionStorage.setItem('user', JSON.stringify(this.user));
      return this.user;
      //return this.http.get('http://localhost:5000/app/getUser', {withCredentials: true});
    } catch (error) {
      
    }
    
  }
}