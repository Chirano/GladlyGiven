// Author: Tiago Barracha
// ti.barracha@gmail.com

package pt.gladlyGivenApi.GladlyGiven.Models.Users;

import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import pt.gladlyGivenApi.GladlyGiven.Interfaces.IDTOable;
import pt.gladlyGivenApi.GladlyGiven.Models.*;
import pt.gladlyGivenApi.GladlyGiven.Models.DTO.ServiceProviderDTO;
import pt.gladlyGivenApi.GladlyGiven.Models.HealthServices.HealthService;

import java.util.Arrays;
import java.util.List;

@Entity
public class ServiceProvider extends MonetaryUser<ServiceProvider> implements IDTOable<ServiceProviderDTO> {

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
    public Availability availabilities;

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


    public ServiceProviderDTO toDTO() {
        ServiceProviderDTO serviceProviderDTO = new ServiceProviderDTO();

        serviceProviderDTO.id = this.id;
        serviceProviderDTO.firstName = this.firstName;
        serviceProviderDTO.lastName = this.lastName;
        serviceProviderDTO.email = this.email.email;
        serviceProviderDTO.gender = this.gender;
        serviceProviderDTO.mainLanguage = this.mainLanguage.language;
        serviceProviderDTO.mainPhoneNumber = this.mainPhoneNumber.number;

        serviceProviderDTO.nif = this.nif;
        serviceProviderDTO.paymentInfoId = this.paymentInfoId;
        serviceProviderDTO.invoiceInfoId = this.invoiceInfoId;

        serviceProviderDTO.licenseNumber = this.licenseNumber;
        serviceProviderDTO.categoryId = this.categoryId;
        serviceProviderDTO.servicesIds = this.healthServices != null ? this.healthServices.toArray(new Long[0]) : null;
        serviceProviderDTO.reviewIds = this.reviewIds != null ? this.reviewIds.toArray(new Long[0]) : null;
        serviceProviderDTO.reviewAverage = this.reviewAverage;

        return serviceProviderDTO;
    }

    public static ServiceProvider fromDTO(ServiceProviderDTO serviceProviderDTO) {
        ServiceProvider serviceProvider = new ServiceProvider();

        serviceProvider.id = serviceProviderDTO.id;
        serviceProvider.firstName = serviceProviderDTO.firstName;
        serviceProvider.lastName = serviceProviderDTO.lastName;
        serviceProvider.email = new Email(serviceProviderDTO.email);
        serviceProvider.gender = serviceProviderDTO.gender;
        serviceProvider.mainLanguage = new Language(serviceProviderDTO.mainLanguage);
        serviceProvider.mainPhoneNumber = new PhoneNumber(serviceProviderDTO.mainPhoneNumber);
        serviceProvider.nif = serviceProviderDTO.nif;
        serviceProvider.paymentInfoId = serviceProviderDTO.paymentInfoId;
        serviceProvider.invoiceInfoId = serviceProviderDTO.invoiceInfoId;
        serviceProvider.licenseNumber = serviceProviderDTO.licenseNumber;
        serviceProvider.categoryId = serviceProviderDTO.categoryId;
        serviceProvider.healthServices = null; // TODO
        serviceProvider.reviewIds = serviceProviderDTO.reviewIds != null ? Arrays.asList(serviceProviderDTO.reviewIds) : null;
        serviceProvider.reviewAverage = serviceProviderDTO.reviewAverage;

        return serviceProvider;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append("-----------------------------------\n");
        sb.append("|       Service Provider Card      |\n");
        sb.append("-----------------------------------\n");
        sb.append("| ID: ").append(id).append("\n");
        sb.append("| Name: ").append(firstName).append(" ").append(lastName).append("\n");
        sb.append("| Email: ").append(email).append("\n");
        sb.append("| Gender: ").append(gender).append("\n");
        sb.append("| Main Language: ").append(mainLanguage.language).append("\n");
        sb.append("| Second Language: ").append(secondLanguage.language).append("\n");
        sb.append("| Main Phone Number: ").append(mainPhoneNumber.number).append("\n");
        sb.append("| NIF: ").append(nif).append("\n");
        sb.append("| Payment Info ID: ").append(paymentInfoId).append("\n");
        sb.append("| Invoice Info ID: ").append(invoiceInfoId).append("\n");
        sb.append("| License Number: ").append(licenseNumber).append("\n");
        sb.append("| Category ID: ").append(categoryId).append("\n");

        // check if lists are null
        if (healthServices != null) {
            sb.append("| Service IDs: ").append(healthServices.toString()).append("\n");
        }

        if (reviewIds != null) {
            sb.append("| Review IDs: ").append(reviewIds.toString()).append("\n");
        }

        sb.append("| Review Average: ").append(reviewAverage).append("\n");
        sb.append("-----------------------------------\n");
        return sb.toString();
    }

}
