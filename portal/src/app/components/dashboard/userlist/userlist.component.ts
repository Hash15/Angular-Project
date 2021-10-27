import { Component, OnInit } from '@angular/core';
import { NewuserService } from 'src/app/services/newuser.service';
import { NgForm } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { DialogService } from 'src/app/services/dialog.service';

import { NewUser } from 'src/app/services/new-user.model';
import { isEmpty } from 'rxjs/operators';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {

  constructor(public newUserService:NewuserService,
    private flashMessage:FlashMessagesService,
    private router:Router,
    private dialogService:DialogService) { }

  ngOnInit(): void {
    this.refreshUserList();
  }

  //To referesh the list after update and delete operations
  refreshUserList(){
    this.newUserService.getUserList().subscribe((res)=>{
      this.newUserService.users = res as NewUser[];
      })
}

  //For update operation(CRUD)
  onEdit(usr:NewUser){
    //this.newUserService.selectedUser = usr
    this.newUserService.setter(usr);
    this.router.navigate(['dashboard']);
  }

  //For delete operation(CRUD)
  onDelete(_id:string){
    this.dialogService.openConfirmDialog('Do you want to delete this record ?')
    .afterClosed().subscribe(res=>{
      if(res){
        this.newUserService.deleteUser(_id).subscribe((res)=>{
          this.refreshUserList();
          this.flashMessage.show('Record deleted successfully',{
            cssClass: 'alert-success',
          timeout:3000});
        })
      }
    });
  }

}
