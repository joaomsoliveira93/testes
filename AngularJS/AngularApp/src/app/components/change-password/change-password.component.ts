import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/interfaces/user.interface';
import { ConfigService } from 'src/services/configfile/config.service';
import { AuthGuard } from 'src/services/auth/auth-guard.service';
import axios from 'axios';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {
  apiUrl: string = '';
  userId: string = '';
  appMode: string = '';
  password: string = '';
  newPassword1: string = '';
  newPassword2: string = '';
  color:string='';
  hide1:boolean=true;
  hide2:boolean=true;
  hide3:boolean=true;

  constructor(
    private authGuard: AuthGuard,
    private configService: ConfigService,
    public dialogRef: MatDialogRef<ChangePasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.userId = this.authGuard.getId();
    this.appMode = this.authGuard.getAppMode();
    this.color = this.authGuard.getAppColor();
  }

  onClose(): void {
    this.dialogRef.close();
  }

  async changePassword() {
    if (this.password !== '' && this.newPassword1 !== '' && this.newPassword2 !== '') {
      if (this.newPassword1 !== this.newPassword2) {
        Swal.fire({
          title: 'Erro!',
          text: 'A Nova Palavra-Passe não coincede!',
          icon: 'error',
          timer: 1500,
          showConfirmButton: false,
          timerProgressBar: true,
          allowOutsideClick: false,
          iconColor: this.color,
          background: this.appMode === 'dark' ? '#b0b5b5' : 'white',
        })
      } else {
        try {
          await this.loadApiUrl();
          const res = await axios.put(`${this.apiUrl}/user/changepassword`, { userId: this.userId, password: this.password, newpassword: this.newPassword1 });
          if (res.data === null) {
            Swal.fire({
              title: 'Erro!',
              text: 'Não foi Alterar a Palavra-Passe!',
              icon: 'error',
              timer: 1500,
              showConfirmButton: false,
              timerProgressBar: true,
              allowOutsideClick: false,
              iconColor: this.color,
              background: this.appMode === 'dark' ? '#b0b5b5' : 'white',
            })
          } else if (res.data === 'NOK') {
            Swal.fire({
              title: 'Erro!',
              text: 'A Palavra-Passe Atual não está correta!',
              icon: 'error',
              timer: 1500,
              showConfirmButton: false,
              timerProgressBar: true,
              allowOutsideClick: false,
              iconColor: this.color,
              background: this.appMode === 'dark' ? '#b0b5b5' : 'white',
            })
          } else {
            this.dialogRef.close();
            Swal.fire({
              title: 'Sucesso!',
              text: 'A palavra-Passe foi alterada!',
              icon: 'success',
              timer: 1500,
              showConfirmButton: false,
              timerProgressBar: true,
              allowOutsideClick: false,
              iconColor: this.color,
              background: this.appMode === 'dark' ? '#b0b5b5' : 'white',
            })
          }
        } catch (error) {
          console.error(error);
          Swal.fire({
            title: 'Erro!',
            text: 'Não foi possível realizar a ligação ao servidor. Por favor tenta mais tarde!',
            icon: 'error',
            timer: 1500,
            showConfirmButton: false,
            timerProgressBar: true,
            allowOutsideClick: false,
            iconColor: this.color,
            background: this.appMode === 'dark' ? '#b0b5b5' : 'white',
          })
        }
      }
    }
  }

  private async loadApiUrl() {
    return new Promise<void>((resolve) => {
      this.configService.getApiBaseUrl().subscribe(apiUrl => {
        this.apiUrl = apiUrl;
        resolve();
      });
    });
  }
}
