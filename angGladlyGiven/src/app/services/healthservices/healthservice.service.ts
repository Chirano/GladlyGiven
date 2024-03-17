import { Injectable } from '@angular/core';
import { SessionContext } from 'src/app/classes/authentication/SessionContext';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from '../authentication/auth.service';
import { Observable } from 'rxjs';
import { HealthService } from 'src/app/classes/HealthServices';
import { Category } from 'src/app/classes/Category';

@Injectable({
  providedIn: 'root'
})
export class HealthserviceService {

  private url = 'http://localhost:8080/api';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json',
    'Accept': 'application/json' }),
  };

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getAllCategories() : Observable<Category[]> {
    return this.http.get<Category[]>(this.url + "/categories");
  }

  getAllServices() : Observable<HealthService[]>{
    return this.http.get<HealthService[]>(this.url+"/healthservices");
  }

  getAllServicesByServiceId(userId: number) : Observable<HealthService[]>{
    return this.http.get<HealthService[]>(this.url+"/healthservices/serviceProvider/"+userId);
  }

  getAllServicesByCategoryId(cateoryId: number) : Observable<HealthService[]>{
    return this.http.get<HealthService[]>(this.url+"/healthservices/category/"+cateoryId);
  }
  
  removeService(userId: number, serviceId: number) : Observable<HealthService[]>{
    return this.http.put<HealthService[]>(this.url+"/serviceProvider/"+userId+"/removeservice/"+serviceId, this.httpOptions);
  }

  addService(userId: number, serviceId: number): Observable<HealthService[]>{
    return this.http.put<HealthService[]>(this.url+"/serviceProvider/"+userId+"/addservice/"+serviceId, this.httpOptions); 
  }
}
