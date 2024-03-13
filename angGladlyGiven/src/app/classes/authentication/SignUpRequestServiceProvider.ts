import { ServiceProviderDTO } from "../userProfiles/ServiceProviderDTO";
import { SignUpDetails } from "./SignUpDetails";

export interface SignUpRequestServiceProvider {
    signUpDetails: SignUpDetails,
    serviceProviderDTO: ServiceProviderDTO,
}