package pt.gladlyGivenApi.GladlyGiven.Services;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import pt.gladlyGivenApi.GladlyGiven.Models.Review;
import pt.gladlyGivenApi.GladlyGiven.Repositories.ReviewRepository;
import pt.gladlyGivenApi.GladlyGiven.Repositories.ReviewService;


@Service
public class ReviewServiceImpl implements ReviewService {

    @Autowired
    ReviewRepository reviewRepository;

    public ReviewServiceImpl(ReviewRepository reviewRepository) {
        this.reviewRepository = reviewRepository;
    }

    @Transactional
    @Override
    public Review createReview(Review review) {
        if(reviewRepository.existsById(review.reviewId)){
            throw new IllegalArgumentException("The review already exists!");
        }
        reviewRepository.save(review);
        return review;
    }

    @Override
    public Page<Review> findAllReviews(int page, int size, String sort) {
        return reviewRepository.findAll(PageRequest.of(page, size, Sort.by(sort)));
    }

    public Review findReviewByAppointment(long appointmentId){
        return reviewRepository.findReviewByAppointmentId(appointmentId);
    }

}
