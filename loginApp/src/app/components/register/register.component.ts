import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  username: string = "";
  name: string = "";
  email: string = "";
  password: string = "";
  confirmPassword: string = "";
  error: string = "";

  constructor(private userService: UserService,private router:Router) { }

  ngOnInit(): void {
  }

  checkPasswords() {
    if (this.password != this.confirmPassword) {
      this.error = "Passwords não coincidem";
    } else {
      this.error = "";
    }

  }

  onSubmit() {
    if (this.error == "" && this.username !="" && this.email !="" && this.name !="" && this.password !="" && this.confirmPassword !="") {
      const user:User = {
        username: this.username,
        name: this.name,
        email: this.email,
        userType: "user",
        password: this.password
      }
      this.userService.addUser(user).subscribe();
      this.router.navigate(['/']);
    }else{
      alert('Deve preencher todos os campos corretamente!')
    }

  }

}
