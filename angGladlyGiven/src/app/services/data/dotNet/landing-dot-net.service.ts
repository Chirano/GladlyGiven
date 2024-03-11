import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LandingDotNetService {

  private baseUrl = 'https://localhost:7280'; // Update with your .NET API URL

  constructor(private http: HttpClient) { }

  getHello(): Observable<string> {
    return this.http.get<string>(`${this.baseUrl}/landing`);
  }

  postHello(message: string): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/landing`, { message });
  }
}
