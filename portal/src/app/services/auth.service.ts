import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
//import {JwtHelperService} from '@auth0/angular-jwt'


interface UserPostResponse {
  success: boolean
  msg: string;
  token: string
  user: any
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken: any;
  user: any;

  constructor(private http:HttpClient) { }

  //To register user using nodejs api
  registerUser(user: any):Observable<UserPostResponse>{
    let headers = new HttpHeaders();
    headers.append('Content-Type','application/json');
    return this.http.post<UserPostResponse>('http://localhost:3000/users/register',user,{headers:headers})
    .pipe(map(res=>res));
  }

  //To authenticate user using nodejs api
  authenticateUser(user: any):Observable<UserPostResponse>{
    let headers = new HttpHeaders();
    headers.append('Content-Type','application/json');
    return this.http.post<UserPostResponse>('http://localhost:3000/users/authenticate', user,{headers: headers})
      .pipe(map(res => res));
  }

  //To get user profile using jwt token
  getProfile() {
    let headers = new HttpHeaders();
    this.loadToken();
    headers = headers.append('Authorization', this.authToken);
    headers = headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/users/profile', {headers: headers})
      .pipe(map(res => res));
  }

  // TO store user data
  storeUserData(token: string, user: any){
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }
  //To get JWT token from local storage
  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  //To check login status
  loggedIn():boolean {
   // const helper = new JwtHelperService();
    return (localStorage.getItem('id_token') !== null);
  }

  //to logout the user by clearing local storage
  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
