import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from "../models/user";
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'content-type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  loggedUser: User = new User();


  usersUrl: string = "http://localhost:5000/users"

  constructor(
    private http: HttpClient
  ) { this.loggedUser.id = -1;}

  getTodos(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl);
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.usersUrl, user, httpOptions);
  }

  getUser(id:number): Observable<User> {
    return this.http.get<User>(this.usersUrl + "/" + id);
  }

  editUser(user:User):Observable<any>{
    const url = this.usersUrl + "/" + user.id;
    return this.http.put(url,user,httpOptions);
  }

  deleteUser(user:User):Observable<any>{
    return this.http.delete<User>(this.usersUrl+"/"+user.id,httpOptions);
  }

  resetPassword(user:User):Observable<any>{
    const url = this.usersUrl + "/" + user.id;
    return this.http.put(url,user,httpOptions);
  }

  logout() {
    this.loggedUser.id = -1;
    this.loggedUser.username = "",
    this.loggedUser.name = "",
    this.loggedUser.email = "",
    this.loggedUser.userType = ""

    console.log('user logged out');
  }
}
