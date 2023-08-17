import { Component, OnInit } from '@angular/core';
import { AuthGuard } from 'src/services/auth/auth-guard.service';
import { Router } from '@angular/router';
import Swal from "sweetalert2"

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  apiUrl: string = '';
  username: string = '';
  password: string = '';
  hide:boolean =true;

  constructor(private authGuard: AuthGuard, private router: Router) { }

  ngOnInit(): void {
    document.body.style.backgroundColor = '#e8ebe9';
   }

  onSubmit() {
    this.authGuard
      .getUser(this.username, this.password)
      .then((res) => {
        if (res === 'success') {
          this.router.navigate(['/']);
        } else if(res===null) {
          Swal.fire({
            title: 'Erro!',
            text: 'Não foi possível realizar a ligação ao servidor. Por favor tenta mais tarde!',
            icon: 'error',
            timer: 1500,
            showConfirmButton: false,
            timerProgressBar: true,
            allowOutsideClick: false
          })
        } else if(res==='inactive') {
          Swal.fire({
            title: 'Erro!',
            text: 'A sua conta foi desativada',
            icon: 'error',
            timer: 1500,
            showConfirmButton: false,
            timerProgressBar: true,
            allowOutsideClick: false
          })
        }else{
          Swal.fire({
            title: 'Erro!',
            text: 'Nome de utilizador ou palavra-passe Erradas. ',
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
