// Author: Tiago Barracha
// ti.barracha@gmail.com

package pt.gladlyGivenApi.GladlyGiven.Models.Users;

import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import pt.gladlyGivenApi.GladlyGiven.Models.Availability;
import pt.gladlyGivenApi.GladlyGiven.Models.DTO.ServiceProviderDTO;
import pt.gladlyGivenApi.GladlyGiven.Models.Email;
import pt.gladlyGivenApi.GladlyGiven.Models.HealthServices.HealthService;
import pt.gladlyGivenApi.GladlyGiven.Models.Language;
import pt.gladlyGivenApi.GladlyGiven.Models.PhoneNumber;

import java.util.List;

@Entity
public class ServiceProvider extends MonetaryUser<ServiceProvider> {

    @Column(unique = true)
    @Max(16)
    public String licenseNumber;

    public Long categoryId; // fetched from Entity Framework API

    @ManyToMany
    @JoinTable(name = "service_provider_health_services",
            joinColumns = @JoinColumn(name = "service_provider_id"),
            inverseJoinColumns = @JoinColumn(name = "health_service_id"))
    public List<HealthService> healthServices;

    @ElementCollection
    public List<Long> reviewIds;

    @Min(0)
    public float reviewAverage; // fetched from Entity Framework API reviewObject

    @ManyToOne
    public List<Availability> availabilities;

    public ServiceProvider() {

    }

    public ServiceProvider(String firstName, String lastName, Email email, String gender,
                           String password, Language language, PhoneNumber phoneNumber, String nif,
                           String licenseNumber, long categoryId) {
        super(firstName, lastName, email, gender, password, language, phoneNumber, nif);
        this.licenseNumber = licenseNumber;
        this.categoryId = categoryId;
    }

    public ServiceProvider(String firstName, String lastName, Email email, String gender, String password,
                           Language language, PhoneNumber phoneNumber, String nif, String licenseNumber,
                           long categoryId,List<Long> reviewIds) {
        super(firstName, lastName, email, gender, password, language, phoneNumber, nif);
        this.licenseNumber = licenseNumber;
        this.categoryId = categoryId;
        this.reviewIds = reviewIds;
    }


    public ServiceProvider toDTO() {
       return this;
    }
}
