import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { RefugeeDTO } from 'src/app/classes/userProfiles/Refugee';
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
  
  /* OLD
  postRefugeeFromBody(data: Refugee): Observable<any> {

    this.logEndpoint(`${this.baseUrl}/refugee/fromBody`);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.baseUrl}/refugee/fromBody`, data, { headers})
  }
  */

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


  static MapToRefugee(data: any): RefugeeDTO {
    // Map the response data to RefugeeDTO interface
    return {
      id: data.id || -1,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      gender: data.gender,
      photoURL: data.photoURL,
      mainLanguage: data.mainLanguage,
      mainPhoneNumber: data.phone,
      protocolId: data.protocolId,
      snsNumber: data.sns,
      nationality: data.nationality,
      country: data.country
    };
  }
  

  // chat gpt generated
  static GetRandomRefugee(): RefugeeDTO {
    const mockRefugees: { [key: string]: RefugeeDTO } = MockRefugees; // Explicit typing here

    // Get an array of refugee keys
    const refugeeKeys = Object.keys(mockRefugees);
    // Choose a random key from the array
    const randomKey = refugeeKeys[Math.floor(Math.random() * refugeeKeys.length)];
    // Return the refugee object corresponding to the random key
    return mockRefugees[randomKey];
  }
}
