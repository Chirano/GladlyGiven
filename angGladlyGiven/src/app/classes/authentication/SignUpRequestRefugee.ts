import { RefugeeDTO } from "../userProfiles/RefugeeDTO";
import { SignUpDetails } from "./SignUpDetails";

export interface SignUpRequestRefugee {
    signUpDetails: SignUpDetails,
    refugeeDTO: RefugeeDTO,
}