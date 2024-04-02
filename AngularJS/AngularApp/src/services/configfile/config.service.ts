import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; // Import the map operator

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private configUrl = 'assets/config.json';

  constructor(private http: HttpClient) {}

  getApiBaseUrl(): Observable<string> {
    return this.getConfig().pipe(map(config => config.apiUrl));
  }

  private getConfig(): Observable<any> {
    return this.http.get(this.configUrl);
  }
}