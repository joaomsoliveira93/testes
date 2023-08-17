import { Injectable, inject } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateFn } from '@angular/router';
import axios from 'axios';
import { sha256 } from 'js-sha256';
import { BehaviorSubject } from 'rxjs';
import { User } from '../../app/interfaces/user.interface';
import { ConfigService } from '../../services/configfile/config.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isLoggedIn$ = this.isLoggedInSubject.asObservable();
  keyExists: boolean = localStorage.getItem('token') !== null;
  userData: User = {
    _id: '',
    username: '',
    name: '',
    tipo: '',
    appColor: '',
    appMode: '',
    email: '',
    estado: 1
  };
  apiUrl: string = '';

  constructor(private router: Router, private configService: ConfigService) { }

  updateUser(user: User) {
    this.userData = user;
  }

  getName() {
    return this.userData.name;
  }

  getTipo() {
    return this.userData.tipo;
  }

  getUserName() {
    return this.userData.username;
  }
  getAppColor() {
    return this.userData.appColor;
  }

  getAppMode() {
    return this.userData.appMode;
  }

  getEmail() {
    return this.userData.email;
  }

  getId() {
    return this.userData._id;
  }

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
    let isLoggedIn = this.isLoggedInSubject.getValue();
    if (this.keyExists) {
      const storedToken = JSON.parse(localStorage.getItem('token')!);
      const tokenValidDate = new Date(storedToken.tokenValidDate);
      const currentDateTime = new Date();
      try {
        await this.loadApiUrl();
        const res = await axios.post(`${this.apiUrl}/login`, { userName: '', password: '', token: storedToken.token })
        this.userData = res.data;
        if (tokenValidDate < currentDateTime) {
          localStorage.setItem('token', JSON.stringify({
            token: res.data.token,
            tokenCreatedAt: res.data.tokenCreatedAt,
            tokenValidDate: res.data.tokenValidDate
          }));
        }
        this.isLoggedInSubject.next(true);
        isLoggedIn = true;
      } catch (error) {
        console.error(error);
        this.isLoggedInSubject.next(false);
        isLoggedIn = false;
      }
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

  logOut() {
    this.userData = {
      _id: '',
      username: '',
      name: '',
      tipo: '',
      appColor: '',
      appMode: '',
      email: '',
      estado: 1
    };
    this.isLoggedInSubject.next(false);
    localStorage.removeItem('token');
    document.body.style.backgroundColor = 'white';
  }

  async getUser(username: string, password: string): Promise<any> {
    const hashedPassword = sha256(password);
    if (password !== '' && username !== '') {
      try {
        await this.loadApiUrl();
        const res = await axios.post(`${this.apiUrl}/login`, { userName: username, password: hashedPassword });
        if (res.data === null || res.data === 'NOK' || res.data === 'inactive') {
          this.userData = {
            _id: '',
            username: '',
            name: '',
            tipo: '',
            appColor: '',
            appMode: '',
            email: '',
            estado: 1
          };
          this.isLoggedInSubject.next(false);
          return res.data;
        } else {
          this.userData = {
            _id: res.data._id,
            username: res.data.username,
            name: res.data.name,
            tipo: res.data.tipo,
            email: res.data.email,
            appColor: res.data.appColor,
            appMode: res.data.appMode,
            estado: res.data.estado
          };
          localStorage.setItem('token', JSON.stringify({
            token: res.data.token,
            tokenCreatedAt: res.data.tokenCreatedAt,
            tokenValidDate: res.data.tokenValidDate
          }));
          this.isLoggedInSubject.next(true);
          return 'success'
        }
      } catch (error) {
        console.error(error);
        return (null)
      }
    }
  }

  private async loadApiUrl() {
    return new Promise<void>((resolve) => {
      this.configService.getApiBaseUrl().subscribe(apiUrl => {
        this.apiUrl = apiUrl;
        resolve();
      });
    });
  }


}
export const IsAuthGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> =>{
  return inject(AuthGuard).canActivate(route, state);
}