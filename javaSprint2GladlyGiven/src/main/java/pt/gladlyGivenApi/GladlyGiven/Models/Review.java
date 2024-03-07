package pt.gladlyGivenApi.GladlyGiven.Models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;

@Entity
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public long reviewId;

    public long appointmentId;

    @Min(1)
    @Max(5)
    public int rating;

    @Max(100)
    public String description;

    public String date;

    public Review(long reviewId, long appointmentId, int rating, String description, String date) {
        this.reviewId = reviewId;
        this.appointmentId = appointmentId;
        this.rating = rating;
        this.description = description;
        this.date = date;
    }

    public Review(){}

    public long getReviewId() {
        return reviewId;
    }

    public long getAppointmentId() {
        return appointmentId;
    }

    public int getRating() {
        return rating;
    }

    public String getDescription() {
        return description;
    }

    public String getDate() {
        return date;
    }

    public void setReviewId(long reviewId) {
        this.reviewId = reviewId;
    }

    public void setAppointmentId(long appointmentId) {
        this.appointmentId = appointmentId;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setDate(String date) {
        this.date = date;
    }
}
