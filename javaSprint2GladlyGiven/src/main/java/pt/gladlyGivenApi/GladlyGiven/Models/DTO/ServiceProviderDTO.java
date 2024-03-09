package pt.gladlyGivenApi.GladlyGiven.Models.DTO;


import pt.gladlyGivenApi.GladlyGiven.Models.Users.ServiceProvider;

import java.util.List;

public class ServiceProviderDTO {
    public long id;

    public String firstName;

    public String lastName;

    public String email;

    public String gender;

    public String language;

    public String phoneNumber;


    public ServiceProviderDTO(long id, String firstName, String lastName, String email, String gender, String language,
                              String phoneNumber)
    {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.gender = gender;
        this.language = language;
        this.phoneNumber = phoneNumber;
    }

    public ServiceProviderDTO(ServiceProvider serviceProvider){
        this.id = serviceProvider.id;
        this.firstName = serviceProvider.firstName;
        this.lastName = serviceProvider.lastName;
        this.email = serviceProvider.email.email;
        this.gender = serviceProvider.gender;
        this.language = serviceProvider.mainLanguage.language;
        this.phoneNumber = serviceProvider.mainPhoneNumber.number;
    }
}
