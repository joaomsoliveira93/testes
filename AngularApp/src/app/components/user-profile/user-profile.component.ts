import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AuthGuard } from 'src/services/auth-guard.service';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})

export class UserProfileComponent {
  @Input() userProfile: boolean;
  @Output() event = new EventEmitter<void>();
  name: string = ''

  constructor(private authGuard: AuthGuard,private router: Router) {
    this.userProfile = false;
    this.name = authGuard.getName();    
  }

  handleEvent() {
    this.event.emit();
  }

  handleLogout() {
    this.authGuard.logOut();
    this.router.navigate(['/login']);
  }
}
