package pt.gladlyGivenApi.GladlyGiven.Models.Users;

public class SignUpDetails {
    public String name;

    public String email;

    public String password;

    public SignUpDetails() {

    }

    public SignUpDetails(String name, String email, String password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }

    @Override
    public String toString() {
        final StringBuffer sb = new StringBuffer("SignUpDetails{");
        sb.append("name='").append(name).append('\'');
        sb.append(", email='").append(email).append('\'');
        sb.append(", password='").append(password).append('\'');
        sb.append('}');
        return sb.toString();
    }
}
