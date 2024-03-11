import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceProviderService  {

  private baseUrl = "/api/serviceProvider";

  constructor(private http: HttpClient) { }


  
  // PUT /api/serviceProvider
  updateServiceProvider(data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/serviceProvider`, data);
  }

  // PUT /api/serviceProvider/{serviceProviderId}/removeservice/{healthServiceId}
  removeServiceFromServiceProvider(serviceProviderId: number, healthServiceId: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/serviceProvider/${serviceProviderId}/removeservice/${healthServiceId}`, {});
  }

  // PUT /api/serviceProvider/{serviceProviderId}/addservice/{healthServiceId}
  addServiceToServiceProvider(serviceProviderId: number, healthServiceId: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/serviceProvider/${serviceProviderId}/addservice/${healthServiceId}`, {});
  }

  // POST /api/serviceProvider/review/{licensenumber}
  postReviewByLicenseNumber(licenseNumber: string, data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/serviceProvider/review/${licenseNumber}`, data);
  }

  // POST /api/serviceProvider/review/{id}
  postReviewById(id: string, data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/serviceProvider/review/${id}`, data);
  }

  // POST /api/serviceProvider/params
  postServiceProviderParams(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/serviceProvider/params`, data);
  }

  // POST /api/serviceProvider/body
  postServiceProviderBody(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/serviceProvider/body`, data);
  }

  // POST /api/serviceProvider/availability/{id}
  postServiceProviderAvailability(id: string, data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/serviceProvider/availability/${id}`, data);
  }

  // GET /api/serviceProvider/{id}
  getServiceProviderById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/serviceProvider/${id}`);
  }

  // GET /api/serviceProvider/licensenumber/{licensenumber}
  getServiceProviderByLicenseNumber(licenseNumber: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/serviceProvider/licensenumber/${licenseNumber}`);
  }

  // GET /api/serviceProvider/lastname/{name}
  getServiceProviderByLastName(name: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/serviceProvider/lastname/${name}`);
  }

  // GET /api/serviceProvider/healthservice/{id}
  getServiceProviderByHealthServiceId(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/serviceProvider/healthservice/${id}`);
  }

  // GET /api/serviceProvider/firstname/{name}
  getServiceProviderByFirstName(name: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/serviceProvider/firstname/${name}`);
  }

  // GET /api/serviceProvider/email/{email}
  getServiceProviderByEmail(email: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/serviceProvider/email/${email}`);
  }
}
