import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuard } from 'src/services/auth/auth-guard.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() title: string = '';
  @Input() back: string = '';
  @Input() hasfilters: boolean = false;
  color: string = '';
  appMode:string = '';

  constructor(private authGuard: AuthGuard, private router:Router) {
    this.color = this.authGuard.getAppColor();
    this.appMode = this.authGuard.getAppMode();
  }
  
  navigate() {
    this.router.navigate([this.back])
  }

}
