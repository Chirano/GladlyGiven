package pt.gladlyGivenApi.GladlyGiven.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.Link;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pt.gladlyGivenApi.GladlyGiven.Models.Appointment;
import pt.gladlyGivenApi.GladlyGiven.Models.Review;
import pt.gladlyGivenApi.GladlyGiven.Services.AppointmentService;
import pt.gladlyGivenApi.GladlyGiven.Services.ReviewServiceImpl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

/**
 * Author: Sónia Ribeiro
 */

/**
 * Controller class for managing reviews.
 */
@RestController
public class ReviewController {

    /**
     * Service for managing reviews.
     */
    @Autowired
    ReviewServiceImpl reviewService;

    /**
     * Service for managing appointments.
     */
    @Autowired
    AppointmentService appointmentService;


    /**
     * Retrieves a review by its ID
     * @param reviewId The ID of the review to retrieve
     * @return ResponseEntity with the retrieved review if found, or HTTP status NOT_FOUND if not found.
     */
    @GetMapping(value = "/review/{reviewId}")
    public ResponseEntity<Review> findReviewById(@PathVariable("reviewId") long reviewId){

        Review review = reviewService.findReviewById(reviewId);

        if(review == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(review, HttpStatus.OK);
    }


    /**
     * Creates a new review
     * @param review  The review to be created
     * @return ResponseEntity with the created review if successful, or HTTP status BAD_REQUEST if unsuccessful
     */

    @PostMapping(value= "/review", consumes = "application/json", produces = "application/json")
        public ResponseEntity<Review> createReview(@RequestBody Review review){
            Review newReview = reviewService.createReview(review);

            if(newReview == null){
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }

            return new ResponseEntity(newReview, HttpStatus.CREATED);
        }


    /**
     * Retrieves all reviews
     * @param page Page number for pagination
     * @param size Number of items per page
     * @param sort Sorting parameter for reviews
     * @return ResponseEntity with a collection of reviews if found, or HTTP status NO_CONTENT if not found.
     */
    @GetMapping(value="/reviews", produces = "application/json")
    public ResponseEntity<CollectionModel<Review>> findAllReviews(@RequestParam(name="page") Optional<Integer> page, @RequestParam(name="size")Optional<Integer>size, @RequestParam(name="sort")Optional<String> sort){

        int _page=page.orElse(0);
        int _size=size.orElse(10);
        String _sort = sort.orElse("rating");

        Page<Review> listReviews = reviewService.findAllReviews(_page,_size,_sort);
        if(listReviews.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        CollectionModel<Review> response = CollectionModel.of(listReviews);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }


    /**
     * Retrieves a review by appointment ID
     * @param id The ID of the appointment
     * @return ResponseEntity with the retrieved review if found, or HTTP status NOT_FOUND if not found
     */

    @GetMapping(value = "review/appointment/{id}", produces = "application/json")
    public ResponseEntity<Review> findReviewByAppointmentId(@PathVariable("id") long id){
        Review review = reviewService.findReviewByAppointmentId(id);
        if(review == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(review, HttpStatus.OK);
    }

    /**
     * Retrieves all reviews by service provider
     * @param id The ID of the service provider
     * @return ResponseEntity with a list of reviews if found, or HTTP status NO_CONTENT if not found
     */

    @GetMapping(value = "review/serviceprovider/{id}", produces = "application/json")
    public ResponseEntity<List<Review>> findAllReviewsByServiceProvider(@PathVariable("id") long id)
    {
        List<Appointment> appointments = appointmentService.findAllAppointmentsByServiceProviderId(id);
        if(appointments == null){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        List<Review> reviews = new ArrayList<>();
        for(Appointment appointment : appointments)
        {
            Review review = reviewService.findReviewByAppointmentId(appointment.getId());
            reviews.add(review);
        }

        return new ResponseEntity<>(reviews, HttpStatus.OK);
    }

}
