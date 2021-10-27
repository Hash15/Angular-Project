import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ValidateService } from 'src/app/services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  userName: any;
  email: any;
  phone: any;
  password: any;

constructor(private http:HttpClient,
          private router:Router,
          private validateService:ValidateService,
          private flashMessage:FlashMessagesService,
          private authService:AuthService) { }

ngOnInit(){
  if(this.authService.loggedIn()){
    this.router.navigate(['profile']);
  }
}
  
  //To register the new user
  register(){
    const user = {
      name:this.userName,
      email:this.email,
      phone:this.phone,
      password:this.password
    }
    
    if(!this.validateService.validateRegister(user)){
      this.flashMessage.show('Please fill in all fields', {cssClass: 'alert-danger', timeout: 5000});
      return false;
    }

    if(!this.validateService.validateUsername(user.name)){
      this.flashMessage.show('Username must be at least 3 characters long', {cssClass: 'alert-danger', timeout: 4000});
      return false;
    }

    if(!this.validateService.validateEmail(user.email)){
     this.flashMessage.show('Please use a valid email', {cssClass: 'alert-danger', timeout: 4000});
     return false;
    }

    if(!this.validateService.validatePhone(user.phone)){
      this.flashMessage.show('Please use a valid phone no',{cssClass: 'alert-danger',timeout:4000});
      return false;
    }

    if(!this.validateService.validatePassword(user.password)){
      this.flashMessage.show('Password must be at least 6 characters long, and must contain at leat one uppercase letter, lowercase letter, a symbol, and a number', {cssClass: 'alert-danger', timeout: 6000});
      return false;
    }

    this.authService.registerUser(user).subscribe(data=>{
      if(data.success){
        this.flashMessage.show('Registration Successful', {cssClass: 'alert-success', timeout: 5000});
        this.router.navigate(['login']);
      }else{
        this.flashMessage.show('Please enter unique email', {cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['register']);
      }
    });
  }

}
