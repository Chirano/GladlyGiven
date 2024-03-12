import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { RefugeeDTO } from 'src/app/classes/userProfiles/RefugeeDTO';
import { MockRefugees } from 'src/app/classes/userProfiles/mockUsers/MockRefugees';

@Injectable({
  providedIn: 'root'
})
export class RefugeeService  {

  private baseUrl = "http://localhost:8080/api";
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }

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
}
