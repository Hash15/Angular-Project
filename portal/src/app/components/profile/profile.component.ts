import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any;

  constructor(private router:Router,
    private authService:AuthService,) { }

  ngOnInit(): void {
    this.authService.getProfile().subscribe((profile:any) => {
      this.user = profile.user;
    },
     err => {
       console.log(err);
       return false;
     });
  }

}
