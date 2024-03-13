import { Injectable } from '@angular/core';
import { SessionContext } from 'src/app/classes/authentication/SessionContext';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from '../authentication/auth.service';
import { Observable } from 'rxjs';
import { HealthServices } from 'src/app/classes/HealthServices';

@Injectable({
  providedIn: 'root'
})
export class HealthserviceService {

  private url = 'http://localhost:8080/api/healthservices';

  userId: number | null = null;
  sessionContext: SessionContext | null = AuthService.SessionContext;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json',
    'Accept': 'application/json' }),
  };

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getAllServices() : Observable<HealthServices[]>{
    return this.http.get<HealthServices[]>(this.url);
  }

  getAllServicesByServiceId(userId: number) : Observable<HealthServices[]>{
    return this.http.get<HealthServices[]>(this.url+"/serviceProvider/"+userId);
  }
}
