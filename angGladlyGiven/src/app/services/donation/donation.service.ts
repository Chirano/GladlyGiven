import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DonationService {

  constructor(private http: HttpClient) { }
  
  private fromDotNet = "https://localhost:7280/donations";

  private fromJava = "http://localhost:8080/api/appointments/total";

  getDonationsAmonunt(): Observable<number>{

    var amount = this.http.get<any>(this.fromDotNet+"/amount");
    return amount;
  }
  
  getTotalDonors(): Observable<number>{
    var totalDonors = this.http.get<number>(this.fromDotNet+"/countdonors");
    return totalDonors;
  }

  getTotalAppointments(): Observable<number> {
    var appointments = this.http.get<number>(this.fromJava);
    return appointments;
  }
}