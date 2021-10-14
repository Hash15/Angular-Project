import { Component, OnInit } from '@angular/core';
import { NewuserService } from 'src/app/services/newuser.service';
import { NgForm } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';

import { NewUser } from 'src/app/services/new-user.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  selectedUser: NewUser = new NewUser;

  constructor(public newUserService:NewuserService,
      private flashMessage:FlashMessagesService) { }

  ngOnInit(): void {
    this.selectedUser = this.newUserService.getter();
    this.resetForm();
  }

  //To reset the form values
  resetForm(form?:NgForm){
    if(form)
      form.reset();
    this.newUserService.selectedUser = {
      _id:"",
      name:"",
      email:"",
      phone:null
    }
  }

  //For Create operation(CRUD)
  add(form:NgForm){
    if(form.value._id == ""){
      this.newUserService.postUser(form.value).subscribe((res)=>{
      this.resetForm(form);
      this.flashMessage.show('User added successfully', {
        cssClass: 'alert-success',
        timeout: 4000});
      })
    }else{
        this.newUserService.putUser(form.value).subscribe((res)=>{
        this.resetForm(form);
        this.flashMessage.show('User updated successfully',{
          cssClass: 'alert-success',
        timeout: 4000});
      })
    }
  }

}
