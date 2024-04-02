import { Component, Input } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { AuthGuard } from 'src/services/auth/auth-guard.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss'],
  animations: [
    trigger('fade', [
      state('collapsed', style({ width: '100%', marginLeft:0 })),
      state('expanded', style({ width: "calc(100% - 16.5625rem)" , marginLeft:"16.5625rem" })),
      transition('collapsed <=> expanded', animate('100ms'))
    ])
  ]
})
export class BodyComponent {
  @Input() collapsed = false;
  @Input() screenWidth = 0;
  color:string= '';
  appMode:string='';

  constructor(private authGuard:AuthGuard){
    this.color = this.authGuard.getAppColor();
    this.appMode = this.authGuard.getAppMode();
  }

  getBodyClass(): string {
    if(this.appMode==='dark'){
      document.body.style.backgroundColor = '#423f3f';
    } else{
      document.body.style.backgroundColor = '#d1cbcb'
    }
    
    let styleClass = '';
    if(this.collapsed && this.screenWidth > 768) {
      styleClass = "w-[calc(100%-16.5625rem)] ml-[16.5625rem]";
    } else if(this.collapsed && this.screenWidth <= 768 && this.screenWidth > 0) {
      styleClass = 'w-full'
    }else{
      styleClass=''
    }
    return styleClass;
  }
}
