import { Component, Input } from '@angular/core';
import { AuthGuard } from 'src/services/auth/auth-guard.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { animate, style, transition, trigger } from '@angular/animations';
import { ConfigService } from 'src/services/configfile/config.service';
import { Licence } from 'src/app/interfaces/licence.interface';
import axios from 'axios';
import Swal from 'sweetalert2';
import { AddlicencesComponent } from '../addlicences/addlicences.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'app-licences',
  templateUrl: './licences.component.html',
  styleUrls: ['./licences.component.scss'],
  animations: [
    trigger('fade', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate("200ms", style({ opacity: 1 }))
      ])
    ])
  ]
})
export class LicencesComponent {
  dialogRef: MatDialogRef<AddlicencesComponent> | undefined;
  @Input() clientId: string = '';
  color: string = '';
  appMode: string = '';
  edit: string = '';
  isScreenSizeLessThan1200 = false;
  apiUrl: string = '';
  licences: Licence[] = [];
  userId: string = '';
  selectedLicence: Licence = {
    _id: '',
    clientId: '',
    tipo: '',
    estado: true,
    obs: '',
    startedAt: '',
    endedAt: ''
  };


  constructor(private breakpointObserver: BreakpointObserver, private authGuard: AuthGuard, private configService: ConfigService, public dialog: MatDialog) {
    this.color = this.authGuard.getAppColor();
    this.appMode = this.authGuard.getAppMode();
    this.userId = this.authGuard.getId();
    this.dialogRef = undefined;
  }

  async ngOnInit() {
    this.breakpointObserver.observe([Breakpoints.XSmall, Breakpoints.Small]).subscribe(result => {
      this.isScreenSizeLessThan1200 = result.matches;
    });
    try {
      await this.loadApiUrl();
      const res = await axios.get(`${this.apiUrl}/alllicences/${this.clientId}`);
      this.licences = res.data;
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

  private async loadApiUrl() {
    return new Promise<void>((resolve) => {
      this.configService.getApiBaseUrl().subscribe(apiUrl => {
        this.apiUrl = apiUrl;
        resolve();
      });
    });
  }

  formatDate(dt: string): string {
    const date = new Date(dt)
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  validateEstado(inicio: string, fim: string, id: string): void {

    const temp: Licence = this.licences.filter((row) => (row._id === id))[0]
    temp.startedAt = inicio
    temp.endedAt = fim
    temp.estado = new Date(temp.startedAt) < new Date(temp.endedAt)
  }

  async saveLicence() {
    try {
      const res = await
        axios.put(`${this.apiUrl}/licence/update`, { userId: this.userId, licence: this.licences.filter((row) => (row._id === this.selectedLicence._id))[0] });
      if (res.data === 'OK') {
        Swal.fire({
          title: 'Sucesso!',
          text: 'A licença foi atualizada com sucesso!',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false,
          timerProgressBar: true,
          allowOutsideClick: false,
          iconColor: this.color,
          background: this.appMode === 'dark' ? '#b0b5b5' : 'white',
        })
        this.edit = '';
      } else {
        Swal.fire({
          title: 'Erro!',
          text: 'Não foi possivel atualiza a licença!',
          icon: 'error',
          timer: 1500,
          showConfirmButton: false,
          timerProgressBar: true,
          allowOutsideClick: false,
          iconColor: this.color,
          background: this.appMode === 'dark' ? '#b0b5b5' : 'white',
        }).then(() => {
          const licenseIndex = this.licences.findIndex((row) => row._id === this.edit);
          this.licences[licenseIndex] = this.selectedLicence;
          this.edit = '';
        })
      }

    } catch (error) {
      console.error(error)
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

  cancelEdit() {
    Swal.fire({
      title: 'Aviso!',
      text: 'Todas a alterações serão perdidas. Tem a certeza?',
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
      allowOutsideClick: false,
      iconColor: this.color,
      background: this.appMode === 'dark' ? '#b0b5b5' : 'white',
    }).then((result) => {
      if (result.isConfirmed) {
        const licenseIndex = this.licences.findIndex((row) => row._id === this.edit);
        this.licences[licenseIndex] = this.selectedLicence;
        this.edit = '';
      }
    })
  }

  deleteLicence() {
    Swal.fire({
      title: 'Aviso!',
      text: 'A licença vai ser apagada. Tem a certeza?',
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
      allowOutsideClick: false,
      iconColor: this.color,
      background: this.appMode === 'dark' ? '#b0b5b5' : 'white',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axios.delete(`${this.apiUrl}/licence/delete/${this.selectedLicence._id}`);

          if (res.data === 'NOK') {
            Swal.fire({
              title: 'Erro!',
              text: 'Não foi possivel apagar a licença!',
              icon: 'error',
              timer: 1500,
              showConfirmButton: false,
              timerProgressBar: true,
              allowOutsideClick: false,
              iconColor: this.color,
              background: this.appMode === 'dark' ? '#b0b5b5' : 'white',
            })
          } else {
            const licenseIndex = this.licences.findIndex((row) => row._id === this.selectedLicence._id);
            this.licences.splice(licenseIndex, 1);
            Swal.fire({
              title: 'Sucesso!',
              text: 'A licença foi apagada!',
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
          console.error(error)
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
    })

  }

  changeEdit(event: MatTabChangeEvent) {
    const selectedTab = event.tab;
    this.edit = ''
    const { _id, clientId, tipo, estado, obs, startedAt, endedAt } = this.licences.filter((row) => (row._id === selectedTab.ariaLabel))[0];
    this.selectedLicence = { _id, clientId, tipo, estado, obs, startedAt, endedAt };
  }

  openPopup(): void {
    this.dialogRef = this.dialog.open(AddlicencesComponent, {
      width: '400px',
      data: {
        title: 'Popup Title',
        content: this.clientId
      }
    });

    this.dialogRef.afterClosed().subscribe((temp) => {
      if (temp) {
        const newLicence: Licence = {
          _id: temp._id,
          clientId: temp.clientId,
          tipo: temp.tipo,
          estado: temp.estado,
          obs: temp.obs,
          startedAt: temp.startedAt,
          endedAt: temp.endedAt
        };
        this.licences.push(newLicence);
      }

    });
  }
}
