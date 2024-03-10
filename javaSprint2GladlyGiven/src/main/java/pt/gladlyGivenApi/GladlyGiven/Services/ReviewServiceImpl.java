package pt.gladlyGivenApi.GladlyGiven.Services;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import pt.gladlyGivenApi.GladlyGiven.Models.Review;
import pt.gladlyGivenApi.GladlyGiven.Repositories.ReviewRepository;
import pt.gladlyGivenApi.GladlyGiven.Repositories.ReviewService;

/**
 * Author: Sónia Ribeiro
 */
/**
 * This class does the implementation of the ReviewService interface for managing reviews.
 */
@Service
public class ReviewServiceImpl implements ReviewService {

    /**
     * Repository for managing reviews.
     */
    @Autowired
    ReviewRepository reviewRepository;

    /**
     * Constructs a ReviewServiceImpl with the specified ReviewRepository.
     *
     * @param reviewRepository The ReviewRepository to be used by this service.
     */
    public ReviewServiceImpl(ReviewRepository reviewRepository) {
        this.reviewRepository = reviewRepository;
    }


    /**
     * Retrieves a review by its ID.
     *
     * @param id The ID of the review to retrieve.
     * @return The review with the specified ID.
     * @throws EntityNotFoundException if the review with the given ID is not found.
     */
    @Override
    public Review findReviewById(long id) {
        Review review = reviewRepository.findById(id).orElse(null);
        if(review == null){
            throw new EntityNotFoundException("The review with this id" + id + "was not found!");
        }
        return review;
    }

    /**
     * Creates a new review.
     *
     * @param review The review to be created.
     * @return The newly created review.
     * @throws IllegalArgumentException if a review with the same ID already exists.
     */

    @Transactional
    @Override
    public Review createReview(Review review) {
        if(reviewRepository.existsById(review.reviewId)){
            throw new IllegalArgumentException("The review already exists!");
        }
        reviewRepository.save(review);
        return review;
    }

    /**
     * Retrieves all reviews with pagination and sorting.
     *
     * @param page Page number for pagination.
     * @param size Number of items per page.
     * @param sort Sorting parameter for reviews.
     * @return A Page containing a subset of reviews according to the pagination and sorting parameters.
     */

    @Override
    public Page<Review> findAllReviews(int page, int size, String sort) {
        return reviewRepository.findAll(PageRequest.of(page, size, Sort.by(sort)));
    }


    /**
     * Retrieves a review by appointment ID.
     *
     * @param appointmentId The ID of the appointment associated with the review.
     * @return The review associated with the given appointment ID.
     */
    @Override
    public Review findReviewByAppointmentId(long appointmentId) {
        return reviewRepository.findReviewByAppointmentId(appointmentId);
    }

}
