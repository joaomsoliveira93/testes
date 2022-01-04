import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user';
import { UiService } from 'src/app/services/ui.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  user:User= new User();
  name: string="";
  type:boolean = false;

  subscription:Subscription= new Subscription();
  showSidebar: Boolean=false;

  constructor(private userService: UserService,private uiService:UiService, private router:Router) { 
    this.name=(this.userService.loggedUser.name).toString();
  }

  ngOnInit(): void {
    this.subscription = this.uiService.onToggle().subscribe(value => {
      this.user = value

      if(this.user.id!=-1){
        this.showSidebar=true;
        if(this.user.userType !='user'){
          this.type=true;
        }else{
          this.type=false;
        }
      }else{
        this.showSidebar=false;
        this.type=false;
      }
      
    })
    
  }

  logOut(){
    this.userService.logout();
    this.uiService.toggleSidebar();
    this.router.navigate(['/']);
  }
  

}
