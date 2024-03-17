import { Component, OnInit } from '@angular/core';
import { Review } from 'src/app/classes/Review';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { ReviewService } from 'src/app/services/review/review.service';


@Component({
  selector: 'app-view-review-service-provider',
  templateUrl: './view-review-service-provider.component.html',
  styleUrls: ['./view-review-service-provider.component.scss']
})
export class ViewReviewServiceProviderComponent implements OnInit{

  constructor(private reviewService : ReviewService){}

  reviews: Review[] = [];
  
  ngOnInit() : void {
     this.loadReviews();
  }

  loadReviews() : void{
    this.reviewService.getReviewsByServiceProviderId(AuthService.SessionContext.userId).subscribe(reviews => this.reviews = reviews)
  }
}
