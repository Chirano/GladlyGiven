package pt.gladlyGivenApi.GladlyGiven.Models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;

/**
 * Author: Sónia Ribeiro
 */

/**
 * Represents a review entity.
 */
@Entity
public class Review {

    /**
     * Unique identifier for the review.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public long reviewId;

    /**
     * Identifier for the appointment associated with this review.
     */

    public long appointmentId;

    /**
     * Rating given in the review. Should be between 1 and 5 (inclusive).
     */
    @Min(1)
    @Max(5)
    public int rating;

    /**
     * Description of the review.
     */
    @Max(100)
    public String description;

    /**
     * Date of the review.
     */
    public String date;

    /**
     * Constructs a new Review object with the provided attributes.
     *
     * @param reviewId      the unique identifier for the review
     * @param appointmentId the identifier for the appointment associated with the review
     * @param rating        the rating given in the review (1-5)
     * @param description   the description of the review
     * @param date          the date of the review
     */

    public Review(long reviewId, long appointmentId, int rating, String description, String date) {
        this.reviewId = reviewId;
        this.appointmentId = appointmentId;
        this.rating = rating;
        this.description = description;
        this.date = date;
    }

    /**
     * Constructs a new Review object with default attributes.
     */
    public Review(){}


    /**
     * Gets the review ID.
     *
     * @return the review ID
     */
    public long getReviewId() {
        return reviewId;
    }

    /**
     * Gets the appointment ID associated with this review.
     *
     * @return the appointment ID
     */
    public long getAppointmentId() {
        return appointmentId;
    }

    /**
     * Gets the rating given in the review.
     *
     * @return the rating (1-5)
     */
    public int getRating() {
        return rating;
    }

    /**
     * Gets the description of the review.
     *
     * @return the description
     */
    public String getDescription() {
        return description;
    }

    /**
     * Gets the date of the review.
     *
     * @return the date
     */
    public String getDate() {
        return date;
    }

    /**
     * Sets the review ID.
     *
     * @param reviewId the review ID to set
     */
    public void setReviewId(long reviewId) {
        this.reviewId = reviewId;
    }

    /**
     * Sets the appointment ID associated with this review.
     *
     * @param appointmentId the appointment ID to set
     */
    public void setAppointmentId(long appointmentId) {
        this.appointmentId = appointmentId;
    }

    /**
     * Sets the rating given in the review.
     *
     * @param rating the rating to set (1-5)
     */
    public void setRating(int rating) {
        this.rating = rating;
    }

    /**
     * Sets the description of the review.
     *
     * @param description the description to set
     */
    public void setDescription(String description) {
        this.description = description;
    }

    /**
     * Sets the date of the review.
     *
     * @param date the date to set
     */
    public void setDate(String date) {
        this.date = date;
    }
}
