import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent implements OnInit {
  user: User= new User();
  id:number=-1;

  loggedUser = {
    id: -1,
    username: "",
    name: "",
    email: "",
    userType: ""
  };

  constructor(private router:Router, private route: ActivatedRoute, private userService:UserService) { 
    this.route.params.subscribe(params => {
      this.id = +params['id']
    });

    if (this.userService.loggedUser.id != -1 && this.userService.loggedUser.userType=="admin") {
      this.loggedUser.id = this.userService.loggedUser.id!;
      this.loggedUser.username = this.userService.loggedUser.username;
      this.loggedUser.name = (this.userService.loggedUser.name).toString();
      this.loggedUser.email = this.userService.loggedUser.email;
      this.loggedUser.userType = this.userService.loggedUser.userType;
      console.log(this.id)
      this.userService.getUser(this.id).subscribe(user =>{this.user = user})
    }else{
      this.router.navigate(['/'])
    }
  }

  ngOnInit(): void {}

  deleteUser(){
    if(confirm('Tem a certeza que pretende eliminar este utilizador?')){
      this.userService.deleteUser(this.user).subscribe();
      this.router.navigate(['/accounts']);
    }    
  }

  resetPassword(){
    if(confirm('Tem a certeza que pretende restaurar a password?')){
    this.user.password=this.user.username;
    this.userService.resetPassword(this.user).subscribe();
    }
  }

}
