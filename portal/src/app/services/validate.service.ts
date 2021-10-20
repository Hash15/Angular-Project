import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor() { }

  //All the methods for user validations

  validateRegister(user: { name: undefined; email: undefined; phone: undefined; password: undefined; }){
    if(user.name == undefined || user.email == undefined || user.phone == undefined || user.password == undefined){
       return false;
    } else {
      return true;
    }
  }

  validateLogin(user: { name: undefined; password: undefined; }){
    if(user.name == undefined || user.password == undefined){
       return false;
    } else {
      return true;
    }
  }

  validateUsername(name: any){
    const re = /^[a-zA-Z]{3,}\d*$/i;
    return re.test(name);
  }

  validateEmail(email: string){
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  validatePhone(phone: string){
    const re = /^\d{10}$/;
    return re.test(phone);
  }

  validatePassword(password: any){
    const re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{6,}$/
    return re.test(password);
  }
}
