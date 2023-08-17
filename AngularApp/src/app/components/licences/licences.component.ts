import { Component, Input } from '@angular/core';
import { AuthGuard } from 'src/services/auth/auth-guard.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { animate, style, transition, trigger } from '@angular/animations';
import { ConfigService } from 'src/services/configfile/config.service';
import { Licence } from 'src/app/interfaces/licence.interface';
import axios from 'axios';
import Swal from 'sweetalert2';
import { AddlicencesComponent } from '../addlicences/addlicences.component';
import { MatDialog } from '@angular/material/dialog';

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
  @Input() clientId: string='';
  color: string = '';
  appMode: string = '';
  edit:string='';  
  isScreenSizeLessThan1200 = false;
  apiUrl:string='';
  licences:Licence[]=[]

  constructor(private breakpointObserver: BreakpointObserver,private authGuard: AuthGuard, private configService:ConfigService,public dialog: MatDialog,){
    this.color = this.authGuard.getAppColor();
    this.appMode = this.authGuard.getAppMode();
  }

  async ngOnInit(){
    this.breakpointObserver.observe([Breakpoints.XSmall, Breakpoints.Small]).subscribe(result => {
      this.isScreenSizeLessThan1200 = result.matches;
    });
    try{
      console.log(this.clientId)
      await this.loadApiUrl();
      const res = await axios.get(`${this.apiUrl}/alllicences/${this.clientId}`);
      this.licences=res.data;
    }catch(error){
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
    const date =  new Date(dt)
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  validateEstado(inicio:string,fim:string,id:string): void {

    const temp:Licence = this.licences.filter((row)=>(row._id===id))[0]
    temp.startedAt=inicio
    temp.endedAt=fim
    temp.estado = new Date(temp.startedAt) < new Date(temp.endedAt)
  }

  openPopup(): void {
    this.dialog.open(AddlicencesComponent, {
      width: '400px',
      data: {
        title: 'Popup Title',
        content: this.clientId
      }
    });
  }
}
