import { Component,Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuard } from 'src/services/auth/auth-guard.service';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() title:string='';
  @Input() page:string='';
  @Input() desc1:string='';
  @Input() desc2:string='';
  @Input() desc3:string='';
  @Input() desc4:string='';
  @Input() desc5:string='';
  @Input() desc6:string='';
  @Input() link:string='';
  color:string='';
  appMode:string='';

  constructor(private authGuard:AuthGuard, private router:Router){
    this.color=this.authGuard.getAppColor();
    this.appMode=this.authGuard.getAppMode();
  }

  openLink(link:string){
    this.router.navigate([link]);
  }
}
