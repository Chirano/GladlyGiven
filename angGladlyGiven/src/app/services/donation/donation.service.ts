import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { DonationReports } from 'src/app/classes/DonationsReport';
import { MockReport } from 'src/app/classes/MockReport';

@Injectable({
  providedIn: 'root'
})
export class DonationService {

  constructor(private http: HttpClient) { }
  
  private donationsUrls = "/http://localhost:8080/api/donations";

  getDonationsReport(): Observable<DonationReports> 
  {
    //get from dotnet API
    const report = of(MockReport)
    return report
    // return this.http.get<DonationReports>(this.donationsUrls);
  }

}