import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Licence } from 'src/app/interfaces/licence.interface';
import { ConfigService } from 'src/services/configfile/config.service';
import { AuthGuard } from 'src/services/auth/auth-guard.service';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-users',
  templateUrl: './addlicences.component.html',
  styleUrls: ['./addlicences.component.scss']
})

export class AddlicencesComponent {
  apiUrl: string = '';
  userId: string = '';
  appMode: string = '';
  color: string = '';
  clientId: string = ''
  licence: Licence = {
    _id: '',
    clientId: '',
    tipo: '',
    estado: false,
    obs: '',
    startedAt: this.formatDate(new Date()),
    endedAt: this.formatDate(new Date())
  }

  constructor(
    private authGuard: AuthGuard,
    private configService: ConfigService,
    public dialogRef: MatDialogRef<AddlicencesComponent>,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.clientId = data.content;
    this.userId = this.authGuard.getId();
    this.appMode = this.authGuard.getAppMode();
    this.color = this.authGuard.getAppColor();
  }

  onClose(): void {
    this.dialogRef.close();
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }


  validateEstado(): void {
    console.log(this.licence.startedAt)
    this.licence.estado=new Date(this.licence.startedAt) < new Date(this.licence.endedAt);
  }

  async saveLicence() {    
    if ( this.licence.tipo !=='') {
      try {
        this.licence.clientId=this.clientId;
        await this.loadApiUrl();
        const res = await axios.post(`${this.apiUrl}/licence/add`, { licence: this.licence, userId: this.userId });
        if (res.data === 'NOK') {
          Swal.fire({
            title: 'Erro!',
            text: 'Não foi possível adicionar a licença!',
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
        } else if (res.data === null) {
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
            text: 'A Licença foi adicionada!',
            icon: 'success',
            timer: 1500,
            showConfirmButton: false,
            timerProgressBar: true,
            allowOutsideClick: false,
            iconColor: this.color,
            background: this.appMode === 'dark' ? '#b0b5b5' : 'white',
          }).then(() => {
            this.dialogRef.close(res.data);
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
