import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AuthGuard } from 'src/services/auth/auth-guard.service';
import {  Router } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  animations: [
    trigger('fade', [
      state('collapsed', style({ marginTop: "-420px" })),
      state('expanded', style({ marginTop: "0px"})),
      transition('collapsed <=> expanded', animate('200ms'))
    ])
  ]
})

export class UserProfileComponent {
  @Input() userProfile: boolean;
  @Output() event = new EventEmitter<void>();
  name: string = '';
  email:string='';
  appMode:string='';
  color:string='';
  img:string='';

  constructor(private authGuard: AuthGuard,private router: Router) {
    this.userProfile = false;
    this.name = authGuard.getName();    
    this.email= authGuard.getEmail();
    this.appMode = authGuard.getAppMode();
    this.color=authGuard.getAppColor();
    this.img= this.authGuard.getImg();
  }

  goProfile(link:string){
    this.router.navigate([link]);
    this.handleEvent();
  }

  handleEvent() {
    this.event.emit();
  }

  handleLogout() {
    this.authGuard.logOut();
    this.router.navigate(['/login']);
  }
}
