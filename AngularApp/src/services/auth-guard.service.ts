import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import axios from 'axios';
import { sha256 } from 'js-sha256';
import { BehaviorSubject } from 'rxjs';
interface User {
  username: string;
  name: string;
  userType: string;
}
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) { }
  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isLoggedIn$ = this.isLoggedInSubject.asObservable();
  keyExists: boolean = localStorage.getItem('User') !== null;
  userData: User = {
    username: '',
    name: '',
    userType: ''
  };

  canActivate(): boolean {
    let isLoggedIn = this.isLoggedInSubject.getValue();
    if (this.keyExists) {
      this.isLoggedInSubject.next(true);
      isLoggedIn = true;
      const storedUserData = localStorage.getItem('User');
      this.userData = storedUserData ? (JSON.parse(storedUserData) as User) : { username: '', name: '', userType: '' } as User;
    } else {
      this.isLoggedInSubject.next(false);
      isLoggedIn = false;
    }

    if (isLoggedIn) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

  getName() {
    return this.userData.name;
  }

  getUserType() {
    return this.userData.userType;
  }

  getUserName() {
    return this.userData.username;
  }

  logOut() {
    this.userData = {
      username: '',
      name: '',
      userType: ''
    };
    this.isLoggedInSubject.next(false);
    localStorage.removeItem('User');
  }

  async getUser(username: string, password: string): Promise<any> {
    const hashedPassword = sha256(password);
    if (password !== '' && username !== '') {
      const res = await axios.post(`http://38.242.201.176:3010/api/loginInv`, { userName: username, password: hashedPassword });
      if (res.data === null) {
        this.userData = {
          username: '',
          name: '',
          userType: ''
        };
        localStorage.removeItem('User');
        this.isLoggedInSubject.next(false);
        return 'null';
      } else {
        this.userData = res.data;
        localStorage.setItem('User', JSON.stringify(res.data));
        this.isLoggedInSubject.next(true);
        return 'success'
      }
    }
  }
}