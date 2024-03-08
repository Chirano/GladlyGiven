// Author: Tiago Barracha
// ti.barracha@gmail.com

package pt.gladlyGivenApi.GladlyGiven.Models.Users;

import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import pt.gladlyGivenApi.GladlyGiven.Models.Email;
import pt.gladlyGivenApi.GladlyGiven.Models.HealthServices.HealthService;
import pt.gladlyGivenApi.GladlyGiven.Models.Language;
import pt.gladlyGivenApi.GladlyGiven.Models.PhoneNumber;

import java.util.ArrayList;
import java.util.List;

@Entity
public class ServiceProvider extends MonetaryUser<ServiceProvider> {

    @Column(unique = true)
    @Max(16)
    public String licenseNumber;

    public Long categoryId; // fetched from Entity Framework API

    @ManyToMany
    public List<HealthService> healthServiceList;

    @ElementCollection
    public List<Long> serviceIds;

    @ElementCollection
    public List<Long> reviewIds;

    @Min(0)
    public float reviewAverage; // fetched from Entity Framework API reviewObject

    public ServiceProvider() {

    }

    public ServiceProvider(String firstName, String lastName, Email email, String gender, String password, Language language, PhoneNumber phoneNumber, String nif, String licenseNumber, long categoryId) {
        super(firstName, lastName, email, gender, password, language, phoneNumber, nif);
        this.licenseNumber = licenseNumber;
        this.categoryId = categoryId;
    }

    public ServiceProvider(String firstName, String lastName, Email email, String gender, String password, Language language, PhoneNumber phoneNumber, String nif, String licenseNumber, long categoryId, List<HealthService> healthServiceList, List<Long> serviceIds,List<Long> reviewIds) {
        super(firstName, lastName, email, gender, password, language, phoneNumber, nif);
        this.licenseNumber = licenseNumber;
        this.categoryId = categoryId;
        this.healthServiceList = healthServiceList;
        this.serviceIds = serviceIds;
        this.reviewIds = reviewIds;
    }

    @Override
    public ServiceProvider toDTO() {
        return this;
    }
}
