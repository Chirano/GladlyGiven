import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Review } from 'src/app/classes/Review';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private url = 'http://localhost:8080';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' ,
    'Accept': 'application/json' })
  };

  constructor(private http : HttpClient) { }

  // createReview(review: Review): Observable<Review> {
  //   const newReview: Review = {
  //     reviewId:review.reviewId,
  //     appointmentId: review.appointmentId,
  //     rating: review.rating,
  //     description: review.description,
  //     date: this.formatDate(new Date()),
  //   };
  //   console.log(newReview);

  //   return this.http.post<Review>(`${this.url}/review`, newReview, this.httpOptions);
  // }
  // createReview(review: Review): Observable<Review> {
  //   console.log('Review to be sent:', review); // Log the review object
  //   const newReview: Review = {
  //     reviewId: review.reviewId,
  //     appointmentId: review.appointmentId,
  //     rating: review.rating,
  //     description: review.description,
  //     date: this.formatDate(new Date()),
  //   };
  //   console.log('Formatted review:', newReview); // Log the formatted review object
  
  //   return this.http.post<Review>(`${this.url}/review`, newReview, this.httpOptions);
  // }

  createReview(review: Review): Observable<Review> {
    // Convert the rating property to a number
    review.rating = +review.rating;
  
    // Format the date
    review.date = this.formatDate(new Date());
  
    // Log the review object before sending the request
    console.log('Review to be sent:', review);
  
    // Send the HTTP request
    return this.http.post<Review>(`${this.url}/review`, review, this.httpOptions);
  }
  
  

  formatDate(date: Date): string {
    const dateOfAppointment : Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return date.toLocaleDateString('pt-PT', dateOfAppointment);
  }

  getReviewsByServiceProviderId(): Observable<Review[]>{
    return this.http.get<Review[]>(this.url+"/review/serviceprovider/1");
  }

}
