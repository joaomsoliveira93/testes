import { Component } from '@angular/core';
import { AuthGuard } from 'src/services/auth/auth-guard.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent {
  userProfile: boolean = false;
  user: String = '';
  color:string = '';

  constructor(private authGuard: AuthGuard) {
    this.user = this.authGuard.getName();
    this.color = this.authGuard.getAppColor();
  }

  toggleUserProfile(): void {
    this.userProfile = !this.userProfile;
  }
}