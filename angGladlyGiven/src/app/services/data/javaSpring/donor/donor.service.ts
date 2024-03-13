import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DonorDTO } from 'src/app/classes/userProfiles/DonorDTO';
import { FiscalIdentity } from 'src/app/classes/FiscalIdentity';
import { MockDonors } from 'src/app/classes/userProfiles/mockUsers/MockDonors';

@Injectable({
  providedIn: 'root'
})
export class DonorService {
  private baseUrl = "http://localhost:8080/api";

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

  static MapToDonor(data: any): DonorDTO | null {
    if (data == null) {
      console.log("Tried to map null Donor data...");
      return null;
    }

    return {
      id: data.id || -1,
      firstName: data.firstName || '',
      lastName: data.lastName || '',
      email: data.email || '',
      gender: data.gender || '',
      photoURL: data.photoURL || '',
      mainLanguage: data.mainLanguage || '',
      secondLanguage: data.secondLanguage || '',
      mainPhoneNumber: data.mainPhoneNumber || '',

      nif: data.nif || '',
      paymentInfoId: data.paymentInfoId || '',
      invoiceInfoId: data.invoiceInfoId || '',
      
      fiscalIdentity: DonorService.DetectFiscalIdentityByNIF(data.nif || ''),
      donationIds: data.donationIds || [],
    };
  }

  static GetRandomDonor(): DonorDTO {
    const mockDonors: { [key: string]: DonorDTO } = MockDonors; // Explicit typing here

    const refugeeKeys = Object.keys(mockDonors);
    const randomKey = refugeeKeys[Math.floor(Math.random() * refugeeKeys.length)];
    return mockDonors[randomKey];
  }

  static DetectFiscalIdentityByNIF(nif: string): FiscalIdentity {
    if (!nif || nif.length !== 9) {
        console.log("Invalid NIF length");
        return FiscalIdentity.Individual;
    }

    const firstDigit = parseInt(nif.charAt(0), 10);

    if (firstDigit === 5) {
        return FiscalIdentity.Company;
    } else {
      return FiscalIdentity.Individual;
    }
  }
}
