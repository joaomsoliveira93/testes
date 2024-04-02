import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/interfaces/user.interface';
import { ConfigService } from 'src/services/configfile/config.service';
import { AuthGuard } from 'src/services/auth/auth-guard.service';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.scss']
})

export class AddUsersComponent {
  apiUrl: string = '';
  userId: string = '';
  appMode: string = '';
  color: string = '';
  allComplete: boolean = false;
  managePermissions: Boolean = false;
  user: User = {
    _id: '',
    username: '',
    name: '',
    tipo: '',
    appColor: '#03C9D7',
    appMode: 'dark',
    email: '',
    estado: 1,
    canManageUsers: false,
    canManageClients: false,
    canManageLicences: false,
    canManagePermissions:false,
    img:'',
  }

  constructor(
    private authGuard: AuthGuard,
    private configService: ConfigService,
    public dialogRef: MatDialogRef<AddUsersComponent>,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.userId = this.authGuard.getId();
    this.appMode = this.authGuard.getAppMode();
    this.color=this.authGuard.getAppColor();
    this.managePermissions = this.authGuard.getCanManagePermissions();
  }

  onClose(): void {
    this.dialogRef.close();
  }

  updateAllComplete() {
    this.allComplete = this.user.canManageClients != false && this.user.canManageLicences != false && this.user.canManageUsers != false && this.user.canManagePermissions != false;
  }

  someComplete(): boolean {
    return (this.user.canManageClients != false || this.user.canManageLicences != false || this.user.canManageUsers != false || this.user.canManagePermissions != false) && !this.allComplete;
  }

  setAll(completed: boolean) {
    if (!completed) {
      this.allComplete = !completed;
      this.user.canManageClients = false;
      this.user.canManageLicences = false;
      this.user.canManageUsers = false;
      this.user.canManagePermissions = false;
    } else {
      this.allComplete = completed;
      this.user.canManageClients = true;
      this.user.canManageLicences = true;
      this.user.canManageUsers = true;
      this.user.canManagePermissions = true;
    }
  }

  definePermissions(e:string){
    if (e === 'admin'){
      this.allComplete = true;
      this.user.canManageClients = true;
      this.user.canManageLicences = true;
      this.user.canManageUsers = true;
      this.user.canManagePermissions = true;
    }else{
      this.allComplete = false;
      this.user.canManageClients = false;
      this.user.canManageLicences = false;
      this.user.canManageUsers = false;
      this.user.canManagePermissions = false;
    }
  }

  async saveUser() {
    if (this.user.username !== '' && this.user.name !== '' && this.user.tipo !== '' && this.user.email !== '') {
      try {
        await this.loadApiUrl();
        const res = await axios.post(`${this.apiUrl}/user/add`, { user: this.user, userId: this.userId });
        if (res.data === null) {
          Swal.fire({
            title: 'Erro!',
            text: 'Não foi possível adicionar o utilizador!',
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
        } else if (res.data === 'esists') {
          Swal.fire({
            title: 'Erro!',
            text: 'Nome de Utilizador já existe!',
            icon: 'error',
            timer: 1500,
            showConfirmButton: false,
            timerProgressBar: true,
            allowOutsideClick: false,
            iconColor: this.color,
            background: this.appMode === 'dark' ? '#b0b5b5' : 'white',
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
            text: 'O utilizador foi adicionado!',
            icon: 'success',
            timer: 1500,
            showConfirmButton: false,
            timerProgressBar: true,
            allowOutsideClick: false,
            iconColor: this.color,
            background: this.appMode === 'dark' ? '#b0b5b5' : 'white',
          }).then(() => {
            this.dialogRef.close();
            this.router.navigate(['/users/' + res.data]);
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
