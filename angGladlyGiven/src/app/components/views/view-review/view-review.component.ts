import { Component } from '@angular/core';
import { Review } from 'src/app/classes/Review';
import { ReviewService } from 'src/app/services/review/review.service';

@Component({
  selector: 'app-view-review',
  templateUrl: './view-review.component.html',
  styleUrls: ['./view-review.component.scss']
})
export class ViewReviewComponent {

  review: Review = {
    reviewId:0,
    appointmentId: 0,
    rating: 0,
    description: ' ',
    date: ' ',
  };

  constructor(private reviewService : ReviewService){}

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
