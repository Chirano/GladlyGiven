import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DonorService {

  private baseUrl = "/api/donor";

  constructor(private http: HttpClient) { }


  
  // GET /api/donor/{id}
  getDonorById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/donor/${id}`);
  }

  // PUT /api/donor/{id}
  updateDonor(id: string, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/donor/${id}`, data);
  }

  // POST /api/donor
  postDonor(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/donor`, data);
  }

  // GET /api/donors
  getAllDonors(): Observable<any> {
    return this.http.get(`${this.baseUrl}/donors`);
  }
}
