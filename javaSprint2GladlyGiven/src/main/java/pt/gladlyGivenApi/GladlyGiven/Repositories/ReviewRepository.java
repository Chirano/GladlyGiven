package pt.gladlyGivenApi.GladlyGiven.Repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import pt.gladlyGivenApi.GladlyGiven.Models.Review;

/**
 * Author:Sónia Ribeiro
 */

/**
 * Repository interface for managing reviews in the database.
 */
public interface ReviewRepository extends JpaRepository<Review, Long> {

    /**
     * Retrieves a review by appointment ID.
     *
     * @param appointmentId The ID of the appointment.
     * @return The review associated with the given appointment ID, or null if not found.
     */
    Review findReviewByAppointmentId(long appointmentId);
}
