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

  private url = 'http://localhost:8080/api';

  userId: number | null = null;
  serviceId: number | null = null;
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
    ////ver se filtro pela categoria 
    return this.http.get<HealthServices[]>(this.url+"/healthservices");
  }

  getAllServicesByServiceId(userId: number) : Observable<HealthServices[]>{
    return this.http.get<HealthServices[]>(this.url+"/healthservices/serviceProvider/"+userId);
  }

  removeService(userId: number, serviceId: number) : Observable<HealthServices[]>{
    return this.http.put<HealthServices[]>(this.url+"/serviceProvider/"+userId+"/removeservice/"+serviceId, this.httpOptions);
  }

  addService(userId: number, serviceId: number): Observable<HealthServices[]>{
    return this.http.put<HealthServices[]>(this.url+"/serviceProvider/"+userId+"/addservice/"+serviceId, this.httpOptions); 
  }

}
