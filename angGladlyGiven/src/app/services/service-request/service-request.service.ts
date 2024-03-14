import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceRequest } from 'src/app/classes/ServiceRequest';
import { SessionContext } from 'src/app/classes/authentication/SessionContext';
import { AuthService } from '../authentication/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceRequestService {
  
  private dotNet = 'https://localhost:7280';

  userId: number | null = null;
  sessionContext: SessionContext | null = AuthService.SessionContext;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json',
    'Accept': 'application/json' }),
  };

  constructor(private http: HttpClient) {}
  /* POST: add a new Service request to the database */
  registerNewServiceRequest(serviceRequest: ServiceRequest): Observable<ServiceRequest> {
    const newServiceRequest: ServiceRequest = {
      id : serviceRequest.id,
      dateRequest : serviceRequest.dateRequest,
      idCategory : serviceRequest.idCategory,
      description : serviceRequest.description,
      status : serviceRequest.status
    };
    console.log(newServiceRequest);
    
    return this.http.post<any>(
      this.dotNet + "/servicerequest",
      newServiceRequest, this.httpOptions
    );
  }
  /* GET : */
  getServiceRequest(): Observable<ServiceRequest[]> {
    return this.http.get<ServiceRequest[]>(this.dotNet + "/servicerequests");
  }
}


