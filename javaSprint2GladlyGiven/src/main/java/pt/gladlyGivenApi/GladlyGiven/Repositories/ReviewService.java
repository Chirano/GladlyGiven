package pt.gladlyGivenApi.GladlyGiven.Repositories;

import org.springframework.data.domain.Page;
import pt.gladlyGivenApi.GladlyGiven.Models.Review;

/**
 * Author:Sónia Ribeiro
 */
/**
 * Service interface for managing reviews.
 */
public interface ReviewService {

    /**
     * Retrieves a review by its ID.
     *
     * @param id The ID of the review to retrieve.
     */
    public Review findReviewById(long id);

    /**
     * Creates a new review.
     *
     * @param review The review to be created.
     */

    public Review createReview(Review review);

    /**
     * Retrieves all reviews with pagination and sorting.
     *
     * @param page Page number for pagination.
     * @param size Number of items per page.
     * @param sort Sorting parameter for reviews.
     */

    Page<Review> findAllReviews(int page, int size, String sort);

    /**
     * Retrieves a review by appointment ID.
     *
     * @param appointmentId The ID of the appointment associated with the review.
     */

    public Review findReviewByAppointmentId(long appointmentId);
}
