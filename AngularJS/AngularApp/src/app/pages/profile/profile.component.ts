import { Component } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { User } from 'src/app/interfaces/user.interface';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ConfigService } from 'src/services/configfile/config.service';
import { AuthGuard } from 'src/services/auth/auth-guard.service';
import { MatDialog } from '@angular/material/dialog';
import { ChangePasswordComponent } from 'src/app/components/change-password/change-password.component';
import axios from 'axios';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  animations: [
    trigger('fade', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate("200ms", style({ opacity: 1 }))
      ])
    ])
  ]
})
export class ProfileComponent {
  apiUrl: string = '';
  isScreenSizeLessThan1200 = false;
  edit: boolean = false;
  userId: String = '';
  username: String = '';
  color: string = '';
  appMode: string = '';
  img:string='';
  user: User = {
    _id: '',
    username: '',
    name: '',
    tipo: '',
    appColor: '',
    appMode: '',
    email: '',
    estado: 1,
    canManageUsers:false,
    canManageClients:false,
    canManageLicences:false,
    canManagePermissions:false,
    img:'',
  }

  constructor(public dialog: MatDialog, private authGuard: AuthGuard, private breakpointObserver: BreakpointObserver, private configService: ConfigService) {
    this.userId = this.authGuard.getId();
    this.username = this.authGuard.getUserName();
    this.color = this.authGuard.getAppColor();
    this.appMode = this.authGuard.getAppMode();
    this.img=this.authGuard.getImg();
  }

  async ngOnInit() {
    Swal.fire({
      title: 'A Carregar...',
      allowOutsideClick: false,
      allowEscapeKey: false,
      showConfirmButton: false,
      iconColor: this.color,
      background: this.appMode === 'dark' ? '#b0b5b5' : 'white',
    });
    this.breakpointObserver.observe([Breakpoints.XSmall, Breakpoints.Small]).subscribe(result => {
      this.isScreenSizeLessThan1200 = result.matches;
    });
    await this.loadApiUrl();

    const res = await axios.get<User>(`${this.apiUrl}/user/${this.userId}`);
    if (res.data === null) {
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
      this.user = res.data;
    }

    Swal.close();
  }

  updateUser() {
    if (this.user.name !== '' && this.user.email !== '' && this.user.appColor !== '' && this.user.appMode !== '') {
      Swal.fire({
        title: 'Tem a Certeza?',
        text: 'Os dados deste Utilizador vão ser atualizados!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim',
        cancelButtonText: 'Cancelar',
        iconColor: this.color,
        background: this.appMode === 'dark' ? '#b0b5b5' : 'white',
      }).then(async (result) => {
        if (result.isConfirmed) {
          await this.loadApiUrl();
          const tempUser: User = this.user;
          const res = await axios.put(`${this.apiUrl}/user/update`, { userId: this.userId, user: this.user });
          if (res.data === 'NOK') {
            Swal.fire({
              title: 'Erro!',
              text: 'Não foi possível atualizar os dados deste utilizador!',
              icon: 'error',
              timer: 1500,
              showConfirmButton: false,
              timerProgressBar: true,
              allowOutsideClick: false,
              iconColor: this.color,
              background: this.appMode === 'dark' ? '#b0b5b5' : 'white',
            }).then(() => {
              this.user = tempUser;
              this.edit = false;
            });
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
              text: 'Os dados deste utilizador from atualizados!',
              icon: 'success',
              timer: 1500,
              showConfirmButton: false,
              timerProgressBar: true,
              allowOutsideClick: false,
              iconColor: this.color,
              background: this.appMode === 'dark' ? '#b0b5b5' : 'white',
            }).then(() => {

              if (this.username === this.user.username) {
                this.authGuard.updateUser(tempUser);
              }
              window.location.reload();
            });
          }
        }
      });
    }
  }

  resetPassword() {
    Swal.fire({
      title: 'Tem a Certeza?',
      text: 'A palavra-passe vair ser restaurada!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim',
      cancelButtonText: 'Cancelar',
      iconColor: this.color,
      background: this.appMode === 'dark' ? '#b0b5b5' : 'white',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await this.loadApiUrl();
        const res = await axios.put(`${this.apiUrl}/user/resetpassword`, { userId: this.userId, user: this.user });
        if (res.data === null) {
          Swal.fire({
            title: 'Erro!',
            text: 'Não foi possível restaurar a palavra-passe!',
            icon: 'error',
            timer: 1500,
            showConfirmButton: false,
            timerProgressBar: true,
            allowOutsideClick: false,
            iconColor: this.color,
            background: this.appMode === 'dark' ? '#b0b5b5' : 'white',
          });
        } else {
          Swal.fire({
            title: 'Sucesso!',
            text: 'A palavra-passe foi restaurada!',
            icon: 'success',
            timer: 1500,
            showConfirmButton: false,
            timerProgressBar: true,
            allowOutsideClick: false,
            iconColor: this.color,
            background: this.appMode === 'dark' ? '#b0b5b5' : 'white',
          });
        }
      }
    });
  }

  cancelEdit() {
    Swal.fire({
      title: 'Tem a Certeza?',
      text: 'Todas as alterações serão descartadas!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim',
      cancelButtonText: 'Cancelar',
      iconColor: this.color,
      background: this.appMode === 'dark' ? '#b0b5b5' : 'white',
    }).then(async (result) => {
      if (result.isConfirmed) {
        window.location.reload();
      }
    });
  }

  private async loadApiUrl() {
    return new Promise<void>((resolve) => {
      this.configService.getApiBaseUrl().subscribe(apiUrl => {
        this.apiUrl = apiUrl;
        resolve();
      });
    });
  }

  openPopup(): void {
    this.dialog.open(ChangePasswordComponent, {
      width: '400px',
      data: {
        title: 'Popup Title',
        content: 'This is the content of the popup.'
      }
    });
  }

  onImageChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.img = e.target.result;
        this.user.img = e.target.result;
      };
      reader.readAsDataURL(file);   
    }
  }
}
