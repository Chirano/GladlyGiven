import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Review } from 'src/app/classes/Review';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private url = 'https://localhost:8080';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http : HttpClient) { }

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

  formatDate(date: Date): string {
    const dateOfAppointment : Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return date.toLocaleDateString('pt-PT', dateOfAppointment);
  }
}
