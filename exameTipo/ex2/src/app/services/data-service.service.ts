import { Injectable } from '@angular/core';
import { Atleta } from '../models/atleta';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DataServiceService {
  endpoint: string = 'http://localhost:4200/assets/dados.json';
  atletas: Array<Atleta> = [];

  constructor(private http: HttpClient) {
    this.http.get<Atleta[]>(this.endpoint).subscribe(s => {this.atletas = s;});
   }

   getAll(): Observable<Atleta[]>{
    return this.http.get<Atleta[]>(this.endpoint);
  }

  getByDorsal(id: number): Observable<Atleta>{
    return of(this.atletas[id]);
  }

}
