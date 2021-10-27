import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { NewUser } from './new-user.model';

@Injectable({
  providedIn: 'root'
})
export class NewuserService {
  selectedUser: NewUser = new NewUser;
  users: NewUser[] = [];
  readonly baseURL = "http://localhost:3000/newusers";

  constructor(private http:HttpClient) { }

  //All the method for CRUD operations

  postUser(usr:NewUser){
    return this.http.post(this.baseURL,usr);
  }

  getUserList(){
   // console.log(this.http.get(this.baseURL))
    return this.http.get(this.baseURL);
    
  }

  putUser(usr:NewUser){
    return this.http.put(this.baseURL+`/${usr._id}`,usr);
  }

  deleteUser(_id:string){
    return this.http.delete(`${this.baseURL}/${_id}`)
  }

  setter(selectedUser:NewUser){
    this.selectedUser = selectedUser;
  }

  getter(){
    return this.selectedUser;
  }
}
