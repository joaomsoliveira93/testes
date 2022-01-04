import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User= new User();


  loggedUser = {
    id: -1,
    username: "",
    name: "",
    email: "",
    userType: ""
  };

  constructor(private router:Router, private userService:UserService) { 
  

    if (this.userService.loggedUser.id != -1) {
      this.loggedUser.id = this.userService.loggedUser.id!;
      this.loggedUser.username = this.userService.loggedUser.username;
      this.loggedUser.name = (this.userService.loggedUser.name).toString();
      this.loggedUser.email = this.userService.loggedUser.email;
      this.loggedUser.userType = this.userService.loggedUser.userType;
      this.userService.getUser(this.loggedUser.id).subscribe(user =>{this.user = user})
    }else{
      this.router.navigate(['/'])
    }
  }

  ngOnInit(): void {}

}
