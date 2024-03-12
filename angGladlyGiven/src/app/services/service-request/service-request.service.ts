import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceRequest } from 'src/app/classes/ServiceRequest';

@Injectable({
  providedIn: 'root'
})
export class ServiceRequestService {
  private dotNet = 'https://localhost:7280';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json',
    'Accept': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  /* GET : */
  getServiceRequest(): Observable<ServiceRequest[]> {
    return this.http.get<ServiceRequest[]>(this.dotNet + "/servicerequests");
  }


  /* POST: add a new Service request to the database */
  addServiceRequest(serviceRequest: ServiceRequest): Observable<ServiceRequest> {
    const newServiceRequest: ServiceRequest = {
      id : serviceRequest.id,
      dataRequest : serviceRequest.dataRequest,
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
}
