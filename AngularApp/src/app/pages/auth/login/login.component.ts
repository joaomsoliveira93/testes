import { Component, OnInit } from '@angular/core';
import { AuthGuard } from 'src/services/auth-guard.service';
import { Router } from '@angular/router';
import Swal from "sweetalert2"

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';

  constructor(private authGuard: AuthGuard, private router: Router) { }

  ngOnInit(): void { }

  onSubmit() {
    this.authGuard
      .getUser(this.username, this.password)
      .then((res) => {
        if (res === 'success') {
          this.router.navigate(['/']);
        } else {
          Swal.fire({
            title: 'Erro!',
            text: 'Nome de utilizador ou palavra-passe Erradas!',
            icon: 'error',
            timer: 1000,
            showConfirmButton: false,
            timerProgressBar: true,
            allowOutsideClick: false,
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
