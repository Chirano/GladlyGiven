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

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Entity
public class ServiceProvider extends MonetaryUser<ServiceProvider> implements IDTOable<ServiceProviderDTO> {

    @Column(unique = true)
    @Max(16)
    public String licenseNumber;

    public Long categoryId;

    @ManyToMany
    @JoinTable(name = "service_provider_health_services",
            joinColumns = @JoinColumn(name = "service_provider_id"),
            inverseJoinColumns = @JoinColumn(name = "health_service_id"))
    public List<HealthService> healthServices;

    @ElementCollection
    public List<Long> reviewIds;

    @Min(0)
    public float reviewAverage; // fetched from Entity Framework API reviewObject

    public String streetName;
    public String doorNumber;
    public String cityName;
    public String postalCode;

    /**
     * Initializes a new instance of ServiceProvider with default values.
     */
    public ServiceProvider() {

    }

    /**
     * Constructs a new ServiceProvider object with the provided attributes.
     *
     * @param firstName      The first name of the service provider.
     * @param lastName       The last name of the service provider.
     * @param email          The email of the service provider.
     * @param gender         The gender of the service provider.
     * @param password       The password of the service provider.
     * @param mainLanguage       The language preference of the service provider.
     * @param phoneNumber    The phone number of the service provider.
     * @param nif            The NIF (Número de Identificação Fiscal) of the service provider.
     * @param licenseNumber  The license number of the service provider.
     * @param categoryId     The category ID of the service provider.
     * @param reviewIds      The list of review IDs associated with the service provider.
     */
    public ServiceProvider(String firstName, String lastName, Email email, String gender, String password,
                           Language mainLanguage, Language secondLanguage, PhoneNumber phoneNumber, String nif, String licenseNumber,
                           long categoryId, List<Long> reviewIds) {
        super(firstName, lastName, email, gender, password, mainLanguage, secondLanguage, phoneNumber, nif);
        this.licenseNumber = licenseNumber;
        this.categoryId = categoryId;
        this.reviewIds = reviewIds;
    }

    /**
     * Constructs a new ServiceProvider object with the provided attributes.
     *
     * @param firstName      The first name of the service provider.
     * @param lastName       The last name of the service provider.
     * @param email          The email of the service provider.
     * @param gender         The gender of the service provider.
     * @param password       The password of the service provider.
     * @param mainLanguage       The language preference of the service provider.
     * @param phoneNumber    The phone number of the service provider.
     * @param nif            The NIF (Número de Identificação Fiscal) of the service provider.
     * @param licenseNumber  The license number of the service provider.
     * @param categoryId     The category ID of the service provider.
     * @param reviewIds      The list of review IDs associated with the service provider.
     * @param streetName     The street name of the service provider's address.
     * @param doorNumber     The door number of the service provider's address.
     * @param cityName       The city name of the service provider's address.
     * @param postalCode     The postal code of the service provider's address.
     */
    public ServiceProvider(String firstName, String lastName, Email email, String gender, String password,
                           Language mainLanguage, Language secondLanguage, PhoneNumber phoneNumber, String nif, String licenseNumber,
                           long categoryId, List<Long> reviewIds, String streetName, String doorNumber,
                           String cityName, String postalCode) {
        super(firstName, lastName, email, gender, password, mainLanguage, secondLanguage, phoneNumber, nif);
        this.licenseNumber = licenseNumber;
        this.categoryId = categoryId;
        this.reviewIds = reviewIds;
        this.streetName = streetName;
        this.doorNumber = doorNumber;
        this.cityName = cityName;
        this.postalCode = postalCode;
    }

    /**
     * Converts the ServiceProvider object to a ServiceProviderDTO (Data Transfer Object).
     *
     * @return The ServiceProviderDTO representing this ServiceProvider object.
     */
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
        serviceProvider.secondLanguage = new Language(serviceProviderDTO.secondLanguage);
        serviceProvider.mainPhoneNumber = new PhoneNumber(serviceProviderDTO.mainPhoneNumber);
        serviceProvider.nif = serviceProviderDTO.nif;
        serviceProvider.paymentInfoId = serviceProviderDTO.paymentInfoId;
        serviceProvider.invoiceInfoId = serviceProviderDTO.invoiceInfoId;
        serviceProvider.licenseNumber = serviceProviderDTO.licenseNumber;
        serviceProvider.categoryId = serviceProviderDTO.categoryId;
        serviceProvider.healthServices = null;
        serviceProvider.reviewIds = serviceProviderDTO.reviewIds != null ? Arrays.asList(serviceProviderDTO.reviewIds) : null;
        serviceProvider.reviewAverage = serviceProviderDTO.reviewAverage;
        serviceProvider.streetName = serviceProviderDTO.streetName;
        serviceProvider.doorNumber = serviceProviderDTO.doorNumber;
        serviceProvider.cityName = serviceProviderDTO.cityName;
        serviceProvider.postalCode = serviceProviderDTO.postalCode;

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
        sb.append("| Street Name: ").append(streetName).append("\n");
        sb.append("| Door Number: ").append(doorNumber).append("\n");
        sb.append("| City Name: ").append(cityName).append("\n");
        sb.append("| Postal Code: ").append(postalCode).append("\n");

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
