import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { User } from '../models/user';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  private showSidebar: boolean=false;
  private subject =  new Subject<any>();
  user:User= new User();

  constructor(private userService: UserService) { }

  toggleSidebar(): void {
    this.user=this.userService.loggedUser;
    //this.showSidebar = !this.showSidebar;
    //this.subject.next(this.showSidebar);  
    this.subject.next(this.user);
  }

  onToggle():Observable<any> {
    return this.subject.asObservable();
  }
}
