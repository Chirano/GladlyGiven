import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Donation } from 'src/app/classes/Donation';
import { Observable, of } from 'rxjs';
import { SessionContext } from 'src/app/classes/authentication/SessionContext';
import { AuthService } from '../authentication/auth.service';

//Author: Sónia Ribeiro
/**
 * Service for managing donations.
 */

@Injectable({
  providedIn: 'root'
})
export class DonationServiceService {

  /**
   * The URL for API requests.
   */
  private url = 'https://localhost:7280';

  /**
   * The user ID of the donor.
   */

  userId: number | null = null;

   /**
   * The session context associated with the donation service.
   */

  sessionContext: SessionContext | null = AuthService.SessionContext;


  /**
   * HTTP options for API requests.
   */

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json',
    'Accept': 'application/json' }),
  };


  /**
   * Initializes a new instance of the DonationServiceService class.
   * @param http - The HTTP client for making requests.
   * @param authService - The authentication service.
   */

  constructor(private http: HttpClient, private authService: AuthService) { }

  /**
   * Creates a new donation.
   * @param donation - The donation to create.
   * @returns An observable of the created donation.
   */
  createDonation(donation: Donation): Observable<Donation> {
    const newDonation: Donation = {
      id:donation.id,
      donorId: AuthService.SessionContext.userId,
      amount: donation.amount,
      donationType: donation.donationType,
      fiscalIdentity: donation.fiscalIdentity,
      date: this.formatDate(new Date()),
    };
    console.log(newDonation);

    return this.http.post<Donation>(`${this.url}/donation`, newDonation, this.httpOptions);
  }

   /**
   * Formats a date object into a string.
   * @param date - The date to format.
   * @returns A formatted date string.
   */

  formatDate(date: Date): string {
    const dateOfAppointment : Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return date.toLocaleDateString('pt-PT', dateOfAppointment);
  }

  /**
   * Retrieves donations by donor ID.
   * @param userId - The ID of the donor.
   * @param page - The page number (optional, default is 1).
   * @param pageSize - The page size (optional, default is 4).
   * @returns An observable of the donations.
   */

  getDonationsByDonorId(userId: number, page: number = 1, pageSize = 4): Observable<Donation[]> {

    return this.http.get<Donation[]>(`${this.url}/donations/donor/${userId}?page=${page}&pageSize=${pageSize}`);
  }
}



