package pt.gladlyGivenApi.GladlyGiven.Models.DTO;

import pt.gladlyGivenApi.GladlyGiven.Interfaces.IValidateable;

public abstract class AppUserDTO implements IValidateable {
    public long id;

    public String firstName;

    public String lastName;

    public String email;

    public String gender;

    public String photoURL;

    public String mainLanguage;
    public String secondLanguage;

    public String mainPhoneNumber;

    public AppUserDTO() {
    }

    public AppUserDTO(String firstName, String lastName, String email, String gender) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.gender = gender;
    }

    public AppUserDTO(String firstName, String lastName, String email, String gender, String mainLanguage, String secondLanguage, String mainPhoneNumber) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.gender = gender;
        this.mainLanguage = mainLanguage;
        this.secondLanguage = secondLanguage;
        this.mainPhoneNumber = mainPhoneNumber;
    }

    @Override
    public boolean isValid() {
        return id != 0 &&
                firstName != null && !firstName.isEmpty() &&
                lastName != null && !lastName.isEmpty() &&
                email != null && !email.isEmpty() &&
                gender != null && !gender.isEmpty() &&
                mainLanguage != null && !mainLanguage.isEmpty() &&
                secondLanguage != null && !secondLanguage.isEmpty() &&
                mainPhoneNumber != null && !mainPhoneNumber.isEmpty();
    }
}
