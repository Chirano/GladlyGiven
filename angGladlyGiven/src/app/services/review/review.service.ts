import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Review } from 'src/app/classes/Review';
import { Observable, of } from 'rxjs';

//Author: Sónia Ribeiro
/**
 * Service for managing reviews.
 */

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  /**
   * The URL for API requests.
   */
  private url = 'http://localhost:8080';

  /**
   * HTTP options for API requests.
   */

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' ,
    'Accept': 'application/json' })
  };

  /**
   * Initializes a new instance of the ReviewService class.
   * @param http - The HTTP client for making requests.
   */

  constructor(private http : HttpClient) { }

   /**
   * Creates a new review.
   * @param review - The review to create.
   * @returns An observable of the created review.
   */

  createReview(review: Review): Observable<Review> {
    const newReview: Review = {
      reviewId:review.reviewId,
      appointmentId: review.appointmentId,
      rating: review.rating,
      description: review.description,
      date: this.formatDate(new Date()),
    };
    console.log(newReview);

    return this.http.post<Review>(`${this.url}/review`, newReview, this.httpOptions);
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
   * Retrieves reviews by service provider ID.
   * @returns An observable of the reviews.
   */

  getReviewsByServiceProviderId(): Observable<Review[]>{
    return this.http.get<Review[]>(this.url+"/review/serviceprovider/1");
  }

}
