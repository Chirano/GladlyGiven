//Author: Sónia Ribeiro

/**
 * Interface representing a review.
 */

export interface Review {

    /**
   * The unique identifier of the review.
   */

    reviewId: number,

    /**
   * The unique identifier of the appointment associated with the review.
   */

    appointmentId: number,

    /**
   * The rating given in the review.
   */

    rating: number,

    /**
   * The description or feedback provided in the review.
   */

    description: string,

    /**
   * The date when the review was submitted, in string format.
   */

    date: string
}