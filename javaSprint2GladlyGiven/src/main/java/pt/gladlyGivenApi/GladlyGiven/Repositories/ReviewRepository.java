package pt.gladlyGivenApi.GladlyGiven.Repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import pt.gladlyGivenApi.GladlyGiven.Models.Review;

import java.util.Optional;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    Review findReviewByAppointmentId(long id);
}
