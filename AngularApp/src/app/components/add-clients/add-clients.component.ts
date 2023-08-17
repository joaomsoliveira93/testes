import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Client } from 'src/app/interfaces/client.interface';
import { ConfigService } from 'src/services/configfile/config.service';
import { AuthGuard } from 'src/services/auth/auth-guard.service';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-users',
  templateUrl: './add-clients.component.html',
  styleUrls: ['./add-clients.component.scss']
})

export class AddClientsComponent {
  apiUrl: string = '';
  userId: string = '';
  appMode: string = '';
  color:string='';
  client: Client = {
    _id: '',
    name: '',
    ncont: '',
    morada: '',
    cidade: '',
    codPost: '',
    contacto: '',
    email: '',
    rep: '',
    repContacto: '',
    repEmail: '',
  }

  constructor(
    private authGuard: AuthGuard,
    private configService: ConfigService,
    public dialogRef: MatDialogRef<AddClientsComponent>,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.userId = this.authGuard.getId();
    this.appMode = this.authGuard.getAppMode();
    this.color=this.authGuard.getAppColor();
  }

  onClose(): void {
    this.dialogRef.close();
  }

  async saveClient() {
    if (this.client.name !== '' && this.client.ncont !== '' && this.client.morada !== '' && this.client.codPost !== '' && this.client.cidade !== '' && this.client.email !== '') {
      try {
        await this.loadApiUrl();
        const res = await axios.post(`${this.apiUrl}/client/add`, { client: this.client, userId: this.userId });
        if (res.data === 'NOK') {
          Swal.fire({
            title: 'Erro!',
            text: 'Não foi possível adicionar o cliente!',
            icon: 'error',
            timer: 1500,
            showConfirmButton: false,
            timerProgressBar: true,
            allowOutsideClick: false,
            iconColor: this.color,
            background: this.appMode === 'dark' ? '#b0b5b5' : 'white',
          }).then(() => {
            this.dialogRef.close();
          })
        }else if(res.data===null){
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
        } else {
          Swal.fire({
            title: 'Sucesso!',
            text: 'O cliente foi adicionado!',
            icon: 'success',
            timer: 1500,
            showConfirmButton: false,
            timerProgressBar: true,
            allowOutsideClick: false,
            iconColor: this.color,
            background: this.appMode === 'dark' ? '#b0b5b5' : 'white',
          }).then(() => {
            this.dialogRef.close();
            this.router.navigate(['/clients/' + res.data]);

          });
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

  private async loadApiUrl() {
    return new Promise<void>((resolve) => {
      this.configService.getApiBaseUrl().subscribe(apiUrl => {
        this.apiUrl = apiUrl;
        resolve();
      });
    });
  }

}
