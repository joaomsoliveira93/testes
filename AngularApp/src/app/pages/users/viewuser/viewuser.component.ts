import { Component } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ConfigService } from 'src/services/configfile/config.service';
import { AuthGuard } from 'src/services/auth/auth-guard.service';
import { MatDialog } from '@angular/material/dialog';
import { AddUsersComponent } from 'src/app/components/add-users/add-users.component';
import axios from 'axios';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-viewuser',
  templateUrl: './viewuser.component.html',
  styleUrls: ['./viewuser.component.scss'],
  animations: [
    trigger('fade', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate("200ms", style({ opacity: 1 }))
      ])
    ])
  ]
})
export class ViewuserComponent {
  back: string = ''
  apiUrl: string = '';
  isScreenSizeLessThan1200 = false;
  edit: boolean = false;
  paramId: string = ''
  userId: String = '';
  username: String = '';
  color: string = '';
  appMode: string = '';
  user: User = {
    _id: '',
    username: '',
    name: '',
    tipo: '',
    appColor: '',
    appMode: '',
    email: '',
    estado: 1
  }

  constructor(public dialog: MatDialog, private authGuard: AuthGuard, private breakpointObserver: BreakpointObserver, private route: ActivatedRoute, private router: Router, private configService: ConfigService) {
    this.userId = this.authGuard.getId();
    this.username = this.authGuard.getUserName();
    this.color = this.authGuard.getAppColor();
    this.appMode = this.authGuard.getAppMode();
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
    try {
      await this.loadApiUrl();
      this.paramId = this.route.snapshot.params['id'];
      const res = await axios.get<User>(`${this.apiUrl}/user/${this.paramId}`);
      this.user = res.data;
      this.back = '/users'
      Swal.close();
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
          try {
            await this.loadApiUrl();
            const tempUser: User = this.user;
            const res = await axios.put(`${this.apiUrl}/user/update`, { userId: this.paramId, user: this.user });
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
                text: 'Os dados deste utilizador foram atualizados!',
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
      });
    }
  }

  updateEstado(estado: number) {
    console.log(estado)
    Swal.fire({
      title: 'Tem a Certeza?',
      text: `Deseja alterar o estado para ${this.user.estado === 0 ? 'Ativo' : 'Inativo'}?!`,
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
        try {
          await this.loadApiUrl();
          const tempUser: User = this.user;
          this.user.estado = estado;
          const res = await axios.put(`${this.apiUrl}/user/update`, { userId: this.paramId, user: this.user });
          if (res.data === 'NOK') {
            Swal.fire({
              title: 'Erro!',
              text: 'Não foi possível atualizar o estado deste utilizador!',
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
          } else if(res.data===null){
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
              text: 'O estado deste utilizador foi atualizado!',
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
    });
  }

  deleteUser() {
    Swal.fire({
      title: 'Tem a Certeza?',
      text: 'Vai apagar este Utilizador!',
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
        try {
          await this.loadApiUrl();
          const tempUser: User = this.user;
          const res = await axios.delete(`${this.apiUrl}/user/delete/${this.paramId}`);
          if (res.data === 'NOK') {
            Swal.fire({
              title: 'Erro!',
              text: 'Não foi possível apagar o utilizador!',
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
          } else if(res.data===null){
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
              text: 'O utilizador foi apagado!',
              icon: 'success',
              timer: 1500,
              showConfirmButton: false,
              timerProgressBar: true,
              allowOutsideClick: false,
              iconColor: this.color,
              background: this.appMode === 'dark' ? '#b0b5b5' : 'white',
            }).then(() => {
              this.router.navigate(['/users']);
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
    });
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
        try {
          await this.loadApiUrl();
          const tempUser: User = this.user;
          const res = await axios.put(`${this.apiUrl}/user/resetpassword`, { userId: this.paramId, user: this.user });
          if (res.data === 'NOK') {
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
          } else if(res.data===null){
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
    const dialogRef = this.dialog.open(AddUsersComponent, {
      width: '400px',
      data: {
        title: 'Popup Title',
        content: 'This is the content of the popup.'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
