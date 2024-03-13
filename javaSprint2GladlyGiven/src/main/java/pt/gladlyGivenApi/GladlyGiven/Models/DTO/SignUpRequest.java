package pt.gladlyGivenApi.GladlyGiven.Models.DTO;

import pt.gladlyGivenApi.GladlyGiven.Models.Users.SignUpDetails;

public abstract class SignUpRequest {
    public SignUpDetails signUpDetails;

    @Override
    public String toString() {
        final StringBuffer sb = new StringBuffer("SignUpRequest{");
        sb.append("signUpDetails=").append(signUpDetails.toString());
        sb.append('}');
        return sb.toString();
    }
}
