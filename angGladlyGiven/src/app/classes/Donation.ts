import { DonationType } from "./DonationType";
import { FiscalIdentity } from "./FiscalIdentity";

//Author: Sónia Ribeiro

/**
 * Interface representing a donation.
 */

export interface Donation{

    /**
   * The unique identifier of the donation.
   */
    id: number;

    /**
   * The unique identifier of the donor.
   */

    donorId: number;

    /**
   * The amount of the donation.
   */

    amount: number;

    /**
   * The type of donation (e.g., Singular, Monthly, Yearly).
   */

    donationType: DonationType;

    /**
   * The fiscal identity of the donor (e.g., Individual, Company).
   */

    fiscalIdentity: FiscalIdentity;

    /**
   * The date of the donation in string format.
   */

    date: string;
}
