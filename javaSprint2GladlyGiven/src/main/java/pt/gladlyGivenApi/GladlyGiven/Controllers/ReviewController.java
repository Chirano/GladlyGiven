package pt.gladlyGivenApi.GladlyGiven.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.Link;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pt.gladlyGivenApi.GladlyGiven.Models.Review;
import pt.gladlyGivenApi.GladlyGiven.Services.ReviewServiceImpl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@RestController
public class ReviewController {

    @Autowired
    ReviewServiceImpl reviewService;

    @PostMapping(value= "/review", consumes = "application/json", produces = "application/json")
        public ResponseEntity<Review> createReview(@RequestBody Review review){
            Review newReview = reviewService.createReview(review);

            if(newReview == null){
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }

            return new ResponseEntity(newReview, HttpStatus.CREATED);
        }

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

}
