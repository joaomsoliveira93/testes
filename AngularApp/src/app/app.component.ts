import { Component, OnInit } from '@angular/core';
import { AuthGuard } from 'src/services/auth-guard.service';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'sidenav';
  isLoggedin: boolean = false;

  isSideNavCollapsed = true;
  screenWidth = 0;

  constructor(private authGuard: AuthGuard) {}

  ngOnInit(): void {
    this.authGuard.isLoggedIn$.subscribe((isLoggedIn: boolean) => {
      this.isLoggedin = isLoggedIn;
    });
  }
  
  onToggleSideNav(data: SideNavToggle): void {
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }

}
