import { Component } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'src/app/interfaces/client.interface';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ConfigService } from 'src/services/configfile/config.service';
import { AuthGuard } from 'src/services/auth/auth-guard.service';
import { MatDialog } from '@angular/material/dialog';
import axios from 'axios';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-viewuser',
  templateUrl: './viewclient.component.html',
  styleUrls: ['./viewclient.component.scss'],
  animations: [
    trigger('fade', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate("200ms", style({ opacity: 1 }))
      ])
    ])
  ]
})
export class ViewclientComponent {
  back: string = ''
  apiUrl: string = '';
  isScreenSizeLessThan1200 = false;
  edit: boolean = false;
  paramId: string = ''
  userId: String = '';
  username: String = '';
  color: string = '';
  appMode: string = '';
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
      background: this.appMode === 'dark' ? '#b0b5b5' : 'white',
    });
    this.breakpointObserver.observe([Breakpoints.XSmall, Breakpoints.Small]).subscribe(result => {
      this.isScreenSizeLessThan1200 = result.matches;
    });
    try {
      await this.loadApiUrl();
      this.paramId = this.route.snapshot.params['id'];
      const res = await axios.get<Client>(`${this.apiUrl}/client/${this.paramId}`);
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
        this.client = res.data;
      }

      this.back = '/clients'
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

  updateClient() {
    if (this.client.name !== '' && this.client.ncont !== '' && this.client.morada !== '' && this.client.codPost !== '' && this.client.cidade !== '' && this.client.email !== '') {
      Swal.fire({
        title: 'Tem a Certeza?',
        text: 'Os dados deste Cliente vão ser atualizados!',
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
            const tempClient: Client = this.client;
            const res = await axios.put(`${this.apiUrl}/client/update`, { userId: this.paramId, client: this.client });
            if (res.data === 'NOK') {
              Swal.fire({
                title: 'Erro!',
                text: 'Não foi possível atualizar os dados deste cliente!',
                icon: 'error',
                timer: 1500,
                showConfirmButton: false,
                timerProgressBar: true,
                iconColor: this.color,
                allowOutsideClick: false,
                background: this.appMode === 'dark' ? '#b0b5b5' : 'white',
              }).then(() => {
                this.client = tempClient;
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
                text: 'Os dados deste cliente foram atualizados!',
                icon: 'success',
                timer: 1500,
                showConfirmButton: false,
                timerProgressBar: true,
                allowOutsideClick: false,
                iconColor: this.color,
                background: this.appMode === 'dark' ? '#b0b5b5' : 'white',
              }).then(() => {
                this.edit = false;
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
              iconColor: this.color,
              timerProgressBar: true,
              allowOutsideClick: false,
              background: this.appMode === 'dark' ? '#b0b5b5' : 'white',
            })
          }
        }
      });
    }
  }

  deleteClient() {
    Swal.fire({
      title: 'Tem a Certeza?',
      text: 'Vai apagar este cliente!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      iconColor: this.color,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Cancelar',
      background: this.appMode === 'dark' ? '#b0b5b5' : 'white',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await this.loadApiUrl();
          const tempClient: Client = this.client;
          const res = await axios.delete(`${this.apiUrl}/client/delete/${this.paramId}`);
          if (res.data === 'NOK') {
            Swal.fire({
              title: 'Erro!',
              text: 'Não foi possível apagar o cliente!',
              icon: 'error',
              timer: 1500,
              showConfirmButton: false,
              timerProgressBar: true,
              iconColor: this.color,
              allowOutsideClick: false,
              background: this.appMode === 'dark' ? '#b0b5b5' : 'white',
            }).then(() => {
              this.client = tempClient;
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
              iconColor: this.color,
              allowOutsideClick: false,
              background: this.appMode === 'dark' ? '#b0b5b5' : 'white',
            })
          } else {
            Swal.fire({
              title: 'Sucesso!',
              text: 'O cliente foi apagado!',
              icon: 'success',
              timer: 1500,
              showConfirmButton: false,
              timerProgressBar: true,
              iconColor: this.color,
              allowOutsideClick: false,
              background: this.appMode === 'dark' ? '#b0b5b5' : 'white',
            }).then(() => {
              this.router.navigate(['/clients']);
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
            iconColor: this.color,
            timerProgressBar: true,
            allowOutsideClick: false,
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

}
