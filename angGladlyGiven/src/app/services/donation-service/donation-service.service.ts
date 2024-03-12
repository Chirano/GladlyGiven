import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Donation } from 'src/app/classes/Donation';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DonationServiceService {

  private url = 'https://localhost:7280';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  constructor(private http : HttpClient) { }

  createDonation(donation: Donation): Observable<Donation> {
    const newDonation: Donation = {
      id:donation.id,
      donorId: donation.donorId,
      amount: donation.amount,
      donationType: donation.donationType,
      fiscalIdentity: donation.fiscalIdentity,
      date: this.formatDate(new Date()),
    };
    console.log(newDonation);

    return this.http.post<Donation>(`${this.url}/donation`, newDonation, this.httpOptions);
  }


  formatDate(date: Date): string {
    const dateOfAppointment : Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return date.toLocaleDateString('pt-PT', dateOfAppointment);
  }
}



