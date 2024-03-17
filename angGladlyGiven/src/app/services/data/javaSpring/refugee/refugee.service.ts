import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { RefugeeDTO } from 'src/app/classes/userProfiles/RefugeeDTO';
import { MockRefugees } from 'src/app/classes/userProfiles/mockUsers/MockRefugees';
import { RefugeePage } from 'src/app/classes/RefugeePage';
import { EventManagerService } from 'src/app/services/events/event-manager.service';
import { ServiceProviderDTO } from 'src/app/classes/userProfiles/ServiceProviderDTO';
import { RouterPaths } from 'src/app/classes/routing/RoutePaths';
import { AppointmentDTO } from 'src/app/classes/AppoitmentDTO';

@Injectable({
  providedIn: 'root'
})

export class RefugeeService  {

  static currentRefugeePage : RefugeePage = RefugeePage.Home;
  private baseUrl = "http://localhost:8080/api";

  constructor(private http: HttpClient) {
    EventManagerService.OnSelectedServiceProvider.subscribe(this.OnServiceProvidedSelected.bind(this));
  }

  private logEndpoint(endpoint: string) {
    console.log("Attemped connection to:", endpoint);
  }

  

  // PUT /api/refugee
  updateRefugee(data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/refugee`, data);
  }

  // POST /api/refugee/fromParams
  postRefugeeFromParams(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/refugee/fromParams`, data);
  }

  // POST /api/refugee/fromBody
  postRefugeeFromBody(data: RefugeeDTO): Observable<RefugeeDTO> {
    this.logEndpoint(`${this.baseUrl}/refugee/fromBody`);
    return this.http.post<RefugeeDTO>(`${this.baseUrl}/refugee/fromBody`, data);
  }

  // GET /api/refugee/{lastname}
  getRefugeeByLastName(lastName: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/refugee/${lastName}`);
  }

  // GET /api/refugee/{id}
  getRefugeeById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/refugee/${id}`);
  }

  // GET /api/refugee/{firstname}
  getRefugeeByFirstName(firstName: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/refugee/${firstName}`);
  }

  // GET /api/refugee/{email}
  getRefugeeByEmail(email: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/refugee/${email}`);
  }

  getAppointmentsByRefugeeId(refugeeId: number): Observable<AppointmentDTO[]>
  {
    return this.http.get<AppointmentDTO[]>(`${this.baseUrl}/appointments/refugee/${refugeeId}`);
  }

  cancelAppointment(appointmentId: number): Observable<any>{
    return this.http.put<any>(`${this.baseUrl}/appointment/cancel/${appointmentId}`, null);
  }



  static MapToRefugee(data: any): RefugeeDTO | null {
    if (data == null) {
      console.log("Tried to map null Refugee data...");
      return null;
    }

    return {
      id: data.id != null ? data.id : -1,
      firstName: data.firstName || '',
      lastName: data.lastName || '',
      email: data.email || '',
      gender: data.gender || '',
      photoURL: data.photoURL || '',
      mainLanguage: data.mainLanguage || '',
      secondLanguage: data.secondLanguage || '',
      mainPhoneNumber: data.phone || '',
      
      protocolId: data.protocolId || '',
      snsNumber: data.snsNumber || '',
      nationality: data.nationality || '',
      country: data.country || ''
    };
  }

  

  // chat gpt generated
  static GetRandomRefugee(): RefugeeDTO {
    const mockRefugees: { [key: string]: RefugeeDTO } = MockRefugees; // Explicit typing here

    const refugeeKeys = Object.keys(mockRefugees);
    const randomKey = refugeeKeys[Math.floor(Math.random() * refugeeKeys.length)];
    return mockRefugees[randomKey];
  }

  private OnServiceProvidedSelected(serviceProvider : ServiceProviderDTO) {
    console.log("Service Provider Clicked! Current Page", RefugeeService.currentRefugeePage);
    if (RefugeeService.currentRefugeePage == RefugeePage.Search) {
      EventManagerService.OnRouteEvent.emit(RouterPaths.ViewRefugeeRequestAppointment);
    }
  }
}