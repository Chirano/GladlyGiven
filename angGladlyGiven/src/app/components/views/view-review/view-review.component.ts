import { Component } from '@angular/core';
import { Review } from 'src/app/classes/Review';
import { ReviewService } from 'src/app/services/review/review.service';

//Author: Sónia Ribeiro

/**
 * Component for viewing and creating reviews.
 */

@Component({
  selector: 'app-view-review',
  templateUrl: './view-review.component.html',
  styleUrls: ['./view-review.component.scss']
})
export class ViewReviewComponent {

  /**
   * Represents the review being created.
   */

  review: Review = {
    reviewId:0,
    appointmentId: 0,
    rating: 0,
    description: ' ',
    date: ' ',
  };

  /**
   * Initializes a new instance of the ViewReviewComponent class.
   * @param reviewService - The service responsible for review-related operations.
   */

  constructor(private reviewService : ReviewService){}

   /**
   * Creates a new review.
   * @param reviewId - The unique identifier of the review.
   * @param appointmentId - The unique identifier of the appointment associated with the review.
   * @param rating - The rating given in the review.
   * @param description - The description or feedback provided in the review.
   * @param date - The date when the review was submitted.
   */

  createReview(reviewId:number, appointmentId: number, rating: number, description:string, date:string): void {
    const numericRating = +rating;

    
    // Call the review service to create the review
    this.reviewService.createReview({reviewId, appointmentId, rating, description, date
    } as Review) 
      .subscribe({
        next: (createdReview) => {
          // Handle the created review as needed
          console.log('Review created:', createdReview);
          // Optionally, update UI or perform any additional actions here
          this.review = createdReview;
        },
        error: (error) => {
          console.error('Failed to create review', error);
          // Optionally, show an error message to the user
        }
      });
    }
}
