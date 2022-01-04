import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  user: User = new User();
  password: string = "";
  newPassword: string = "";
  confPassword: string = "";
  error: string = "";

  loggedUser = {
    id: -1,
    username: "",
    name: "",
    email: "",
    userType: ""
  };

  constructor(private router: Router, private userService: UserService) {


    if (this.userService.loggedUser.id != -1) {
      this.loggedUser.id = this.userService.loggedUser.id!;
      this.loggedUser.username = this.userService.loggedUser.username;
      this.loggedUser.name = (this.userService.loggedUser.name).toString();
      this.loggedUser.email = this.userService.loggedUser.email;
      this.loggedUser.userType = this.userService.loggedUser.userType;
      this.userService.getUser(this.loggedUser.id).subscribe(user => { this.user = user })
    } else {
      this.router.navigate(['/'])
    }
  }

  ngOnInit(): void {

  }

  saveUser() {
    if (this.password != "" && this.newPassword != "" && this.confPassword != "") {
      if (this.password == this.user.password) {
        if (confirm('Tem a certeza que pretende guardar')) {
          let toSave: User = new User();

          toSave.id = this.user.id;
          toSave.name = this.user.name;
          toSave.username = this.user.username;
          toSave.email = this.user.email;
          toSave.userType = this.user.userType;
          toSave.password = this.newPassword;

          this.userService.editUser(toSave).subscribe();
          this.router.navigate(['/profile']);
        }
      } else {
        alert('Password atual errada!')
      }

    } else {
      alert('Deve preencher todos os campos')
    }

    this.password = "";
    this.newPassword = "";
    this.confPassword = "";
  }

  discardChanges() {
    if (confirm('Tem a certeza que pretende cancelar? Todas as alterações serão descartadas!')) {
      this.router.navigate(['/profile']);
    }

  }

  checkPasswords() {
    if (this.newPassword != this.confPassword) {
      this.error = "As Passwords não coincidem!";
    } else {
      this.error = "";
    }
  }

}
