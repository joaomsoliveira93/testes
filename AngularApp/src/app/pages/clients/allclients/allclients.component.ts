import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Client } from 'src/app/interfaces/client.interface';
import { ConfigService } from 'src/services/configfile/config.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatDialog } from '@angular/material/dialog';
import { AddClientsComponent } from 'src/app/components/add-clients/add-clients.component';
import { AuthGuard } from 'src/services/auth/auth-guard.service';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-media',
  templateUrl: './allclients.component.html',
  styleUrls: ['./allclients.component.scss'],
  animations: [
    trigger('fade', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate("200ms", style({ opacity: 1 }))
      ])
    ]),
    trigger('inputs', [
      state('collapsed', style({ height: "fit-content" })),
      state('expanded', style({ height: "fit-content" })),
      transition('collapsed <=> expanded', animate('200ms'))
    ])

  ]
})

export class AllclientsComponent implements OnInit {
  apiUrl: string = '';
  clients: Client[] = [];
  currentPage: number = 0;
  itemsPerPage: number = 0;
  sortingCriteria:string = 'username';
  sortAscending: boolean = true;
  title: string = 'Clientes'
  back: string = ''
  filteredClients: Client[] = [];
  searchName = '';
  searchNcont = '';
  searchEmail = '';
  showInputs = false;
  isScreenSizeLessThan1200 = false;
  color: string = '';
  appMode: string = '';
  manageClients: Boolean = false;

  constructor(private authGuard: AuthGuard,
    public dialog: MatDialog,
    private breakpointObserver: BreakpointObserver,
    private configService: ConfigService,
    private router: Router
  ) {
    this.color = this.authGuard.getAppColor();
    this.appMode = this.authGuard.getAppMode();
    this.manageClients = this.authGuard.getCanManageClients()
  }

  toggleInputs(): void {
    this.showInputs = !this.showInputs;
  }

  filterData(): void {
    this.filteredClients = this.clients.filter((item) =>
      (item.name.toLocaleLowerCase().includes(this.searchName.toLocaleLowerCase())) &&
      (item.email.toLocaleLowerCase().includes(this.searchEmail.toLocaleLowerCase())) &&
      ( item.ncont.toLocaleLowerCase().includes(this.searchNcont.toLocaleLowerCase()))
    );
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
      const res = await axios.get<Client[]>(`${this.apiUrl}/allclients`);
      this.clients = res.data;
      this.filteredClients = [...this.clients];
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
        background: this.appMode === 'dark' ? '#b0b5b5' : 'white',
      })
      
    }

    this.currentPage = 1;
    this.itemsPerPage = 10;
    Swal.close();
  }

  private async loadApiUrl() {
    return new Promise<void>((resolve) => {
      this.configService.getApiBaseUrl().subscribe(apiUrl => {
        this.apiUrl = apiUrl;
        resolve();
      });
    });
  }

  changeOrder(criteria:boolean){
    this.sortAscending=criteria;
    this.filteredClients.sort((a, b) => {
      const aValue = a[this.sortingCriteria as keyof Client];
      const bValue = b[this.sortingCriteria as keyof Client];
  
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return this.sortAscending ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
      } else if (typeof aValue === 'number' && typeof bValue === 'number') {
        return this.sortAscending ? aValue - bValue : bValue - aValue;
      } else {
        return 0;
      }
    });
  }

  onPageChange(pageNumber: number) {
    this.currentPage = pageNumber;
  }

  getTotalPages(): number {
    return Math.ceil(this.filteredClients.length / this.itemsPerPage);
  }

  openClient(id: string) {
    this.router.navigate([`/clients/${id}`]);
  }

  openPopup(): void {
    this.dialog.open(AddClientsComponent, {
      width: '400px',
      data: {
        title: 'Popup Title',
        content: 'This is the content of the popup.'
      }
    });
  }

}
