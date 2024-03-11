package pt.gladlyGivenApi.GladlyGiven.Models.DTO;

public abstract class AppUserDTO {
    public long id;

    public String firstName;

    public String lastName;

    public String email;

    public String gender;

    public String photoURL;

    public String mainLanguage;

    public String mainPhoneNumber;

    public AppUserDTO() {
    }

    public AppUserDTO(String firstName, String lastName, String email, String gender) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.gender = gender;
    }

    public AppUserDTO(String firstName, String lastName, String email, String gender, String mainLanguage, String mainPhoneNumber) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.gender = gender;
        this.mainLanguage = mainLanguage;
        this.mainPhoneNumber = mainPhoneNumber;
    }
}
