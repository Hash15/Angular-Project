import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ValidateService } from 'src/app/services/validate.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userName: any;
  password: any;

  constructor(private http:HttpClient,
            private router:Router,
            private authService:AuthService,
            private flashMessage:FlashMessagesService,
            private validateService:ValidateService) { }

  
  ngOnInit(){
    //To renavigate the user to peofile route if he tries to go back to login/register after login
    if(this.authService.loggedIn()){
      this.router.navigate(['profile']);
    }
  }

  login(){
    const user = {
      name:this.userName,
      password:this.password
    }

    if(!this.validateService.validateLogin(user)){
      this.flashMessage.show('Please fill in all fields', {cssClass: 'alert-danger', timeout: 5000});
      return false;
    }

    this.authService.authenticateUser(user).subscribe(data=>{
      if(data.success){
        this.authService.storeUserData(data.token, data.user);
        this.flashMessage.show('You are now logged in', {
          cssClass: 'alert-success',
          timeout: 5000});
        this.router.navigate(['profile']);
      }else{
        this.flashMessage.show(data.msg, {
          cssClass: 'alert-danger',
          timeout: 5000});
        this.router.navigate(['login']);
      }
    })
  }
}
