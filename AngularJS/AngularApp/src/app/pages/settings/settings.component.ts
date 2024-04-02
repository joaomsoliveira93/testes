import { Component, OnInit} from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ConfigService } from 'src/services/configfile/config.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatDialog } from '@angular/material/dialog';
import { AuthGuard } from 'src/services/auth/auth-guard.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  animations:[
    trigger('fade',[
      transition(':enter',[
        style({opacity: 0}),
        animate("200ms", style({opacity: 1}))
      ])
    ])
  ]
})

export class SettingsComponent implements OnInit {
  apiUrl: string = '';
  title: string = 'Definições'
  back: string = ''
  isScreenSizeLessThan1200 = false;
  color:string='';
  appMode:string='';

  constructor(private authGuard:AuthGuard, 
    public dialog: MatDialog, 
    private breakpointObserver: BreakpointObserver, 
    private configService: ConfigService,
    private router: Router
    ) { 
    this.color = this.authGuard.getAppColor();
    this.appMode = this.authGuard.getAppMode();
  }

  ngOnInit(): void {  
    this.breakpointObserver.observe([Breakpoints.XSmall, Breakpoints.Small]).subscribe(result => {
      this.isScreenSizeLessThan1200 = result.matches;
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
