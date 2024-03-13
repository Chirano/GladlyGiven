import { Component, OnInit } from '@angular/core';
import { Review } from 'src/app/classes/Review';
import { ReviewService } from 'src/app/services/review/review.service';


@Component({
  selector: 'app-view-review-service-provider',
  templateUrl: './view-review-service-provider.component.html',
  styleUrls: ['./view-review-service-provider.component.scss']
})
export class ViewReviewServiceProviderComponent implements OnInit{
  id: number = 1;

  constructor(private reviewService : ReviewService){}

  reviews: Review[] = [];
  
  ngOnInit() : void {
     this.loadReviews();
  }

  loadReviews() : void{
    this.reviewService.getReviewsByServiceProviderId().subscribe(reviews => this.reviews = reviews)
  }
}
