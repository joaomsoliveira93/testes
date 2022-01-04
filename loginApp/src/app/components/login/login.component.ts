import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UiService } from 'src/app/services/ui.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loggedUser = {
    id: 0,
    username: "",
    name: "",
    email: "",
    userType: ""
  };
  users: User[] = [];
  username: string = "";
  password: string = "";

  constructor(private router: Router, private userService: UserService,private uiService:UiService) { }
;

  ngOnInit(): void {
    if (this.userService.loggedUser.id != -1) {
      this.router.navigate(['/products']);
    }
  }

  onSubmit() {
    this.userService.getTodos().subscribe(users => {
      this.users = users;

      for (let user of this.users) {
        if (this.userService.loggedUser.id == -1) {
          if (user.username == this.username) {
            
            if (user.password == this.password) {
              
              this.userService.loggedUser.id = user.id;
              this.userService.loggedUser.username = user.username;
              this.userService.loggedUser.name = (user.name).toString();
              this.userService.loggedUser.email = user.email;
              this.userService.loggedUser.userType = user.userType;
              this.router.navigate(['/products']);
              this.uiService.toggleSidebar(); 
              

            } 
          } 
        }
      }

      if (this.userService.loggedUser.id == -1) {
        alert('Nome de utilizador ou palavra-passe erradas!')
        this.password = "";
      }
    });

  }

}
