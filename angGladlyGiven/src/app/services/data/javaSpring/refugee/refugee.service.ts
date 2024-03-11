import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { Refugee } from 'src/app/classes/userProfiles/Refugee';

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

  /*
  postExample(data: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.apiUrl}/endpoint`, data, { headers });
  }
  */

  // POST /api/refugee/fromBody
  postRefugeeFromBody(data: Refugee): Observable<any> {

    this.logEndpoint(`${this.baseUrl}/refugee/fromBody`);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.baseUrl}/refugee/fromBody`, data, { headers}).pipe(
      
      tap(data => console.log(data)),

      catchError(error => {
        console.error('Error creating refugee:', error);
          throw 'Error .';
      })
    );
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
}
