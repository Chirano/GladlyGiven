import { Injectable } from '@angular/core';
import { SessionContext } from 'src/app/classes/authentication/SessionContext';
import { AuthService } from '../authentication/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ListServicesByServiceProviderIdService {

  private url = 'https://localhost:8080/api/healthservices/serviceProvider/';

  userId: number | null = null;
  sessionContext: SessionContext | null = AuthService.SessionContext;
 
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json',
    'Accept': 'application/json' }),
  };
 
  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { 
  }

  // getServicesByUserId(userId : number): Observable<Services[]> {
  //   return this.http.get<Services[]>(this.url +userId+);
  // }



}
