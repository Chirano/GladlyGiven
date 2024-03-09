package pt.gladlyGivenApi.GladlyGiven.Repositories;

import org.springframework.data.domain.Page;
import pt.gladlyGivenApi.GladlyGiven.Models.Review;

public interface ReviewService {

    public Review findReviewById(long id);
    public Review createReview(Review review);

    Page<Review> findAllReviews(int page, int size, String sort);

    public Review findReviewByAppointmentId(long appointmentId);
}
