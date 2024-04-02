import { Component, Output, EventEmitter, OnInit, HostListener } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { AuthGuard } from 'src/services/auth/auth-guard.service';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  animations: [
    trigger('fade', [
      state('collapsed', style({ width: 0 })),
      state('expanded', style({ width: "16.5625rem" })),
      transition('collapsed <=> expanded', animate('100ms'))
    ])
  ]
})
export class SidenavComponent implements OnInit {

  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  color:string='';
  appMode:string = '';
  activeColor:string='';
  collapsed = false;
  screenWidth = 0;
  managePermissions:Boolean = false;
  constructor (private authGuard:AuthGuard){
    this.color = this.authGuard.getAppColor();
    this.appMode = this.authGuard.getAppMode();
    if (this.appMode==='dark'){
      this.activeColor='bg-[#767a7a]'
    }else{
      this.activeColor='bg-white text-black'
    }
    this.managePermissions= this.authGuard.getCanManageUsers();
  }


  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth <= 768) {
      this.collapsed = false;
    } else {
      this.collapsed = true;      
    }
    this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
  }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth > 768) {
      this.collapsed = true;
      this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
    }
  }

  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
  }

  closeSidenav(): void {
    if (this.screenWidth <= 768) {
      this.collapsed = false;
      this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
    }
  }
}
