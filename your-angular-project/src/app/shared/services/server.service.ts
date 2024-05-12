import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/User';
import { UserListComponent } from '../../user-list/user-list.component';


@Injectable({
  providedIn: 'root'
})
export class ServerService {

  constructor(private http: HttpClient) {

  }
 
  listAllUsers(){

    return this.http.get<User[]>('http://localhost:5000/app/getAllUsers', {withCredentials: true});

  }

  delete(id: string) {
    return this.http.delete('http://localhost:5000/app/deleteUser?id=' + id, {withCredentials: true});
  }

  createGroup(trainer : string , name: string ) {
    // HTTP POST request
    const body = new URLSearchParams();
    body.set('trainer', trainer);
    body.set('name', name);
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post('http://localhost:5000/app/createGroup', body, {headers: headers});
  }

  listAllGroups(){

    return this.http.get<User[]>('http://localhost:5000/app/getAllGroups', {withCredentials: true});

  }

  joinGroup(id: string , userId : string) {
    const body = new URLSearchParams();
    body.set('id', id);
    body.set('userId', userId);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    return this.http.post('http://localhost:5000/app/joinGroup', body, {headers: headers} );
  }


}
