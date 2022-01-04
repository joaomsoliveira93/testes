import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-account-edit',
  templateUrl: './account-edit.component.html',
  styleUrls: ['./account-edit.component.css']
})
export class AccountEditComponent implements OnInit {
  user: User = new User();
  id: number = -1;

  loggedUser = {
    id: -1,
    username: "",
    name: "",
    email: "",
    userType: ""
  };

  constructor(private router: Router, private route: ActivatedRoute, private userService: UserService) {
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
      this.userService.getUser(this.id).subscribe(user => { this.user = user })
    } else {
      this.router.navigate(['/'])
    }
  }

  ngOnInit(): void {

  }

  saveUser() {
    if (confirm('Tem a certeza que pretende guardar')) {
      let toSave: User = new User();

      toSave.id = this.id;
      toSave.name = this.user.name;
      toSave.username = this.user.username;
      toSave.email = this.user.email;
      toSave.userType = this.user.userType;
      toSave.password=this.user.password;
      console.log(toSave.userType);

      this.userService.editUser(toSave).subscribe();
    }

    this.router.navigate(['/accounts/' + this.id]);
  }

  discardUser(){
    if (confirm('Tem a certeza que pretende cancelar? Todas as alterações serão descartadas!')) {
      this.router.navigate(['/accounts/' + this.id]);
    }
  }

}
