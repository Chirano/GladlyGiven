import { Injectable } from '@angular/core';
import { SessionContext } from 'src/app/classes/authentication/SessionContext';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from '../authentication/auth.service';
import { Observable } from 'rxjs';
import { HealthService } from 'src/app/classes/HealthServices';

@Injectable({
  providedIn: 'root'
})
export class HealthserviceService {

  private url = 'http://localhost:8080/api';

  userId: number | null = null;
  sessionContext: SessionContext | null = AuthService.SessionContext;
  serviceId: number | null = null; 


  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json',
    'Accept': 'application/json' }),
  };

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getAllServices() : Observable<HealthService[]>{
    return this.http.get<HealthService[]>(this.url+"/healthservices");
  }

  getAllServicesByServiceId(userId: number) : Observable<HealthService[]>{
    return this.http.get<HealthService[]>(this.url+"/healthservices/serviceProvider/"+userId);
  }
  
  removeService(userId: number, serviceId: number) : Observable<HealthService[]>{
    return this.http.put<HealthService[]>(this.url+"/serviceProvider/"+userId+"/removeservice/"+serviceId, this.httpOptions);
  }

  addService(userId: number, serviceId: number): Observable<HealthService[]>{
    return this.http.put<HealthService[]>(this.url+"/serviceProvider/"+userId+"/addservice/"+serviceId, this.httpOptions); 
  }
}
