import { DonorDTO } from "../userProfiles/DonorDTO";
import { SignUpDetails } from "./SignUpDetails";

export interface SignUpRequestDonor {
    signUpDetails: SignUpDetails,
    donorDTO: DonorDTO,
}