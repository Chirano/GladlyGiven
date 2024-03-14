package pt.gladlyGivenApi.GladlyGiven.Models.DTO;

import pt.gladlyGivenApi.GladlyGiven.Models.Users.ServiceProvider;

import java.util.Arrays;

public class ServiceProviderDTO extends AppUserDTO {

    // Monetary user
    public String nif;
    public String paymentInfoId;
    public String invoiceInfoId;

    // Service provider
    public String licenseNumber;
    public long categoryId;
    public Long[] servicesIds;
    public Long[] reviewIds;
    public float reviewAverage;
    public String streetName;
    public String doorNumber;
    public String cityName;
    public String postalCode;

    public ServiceProviderDTO() {}

    public ServiceProviderDTO(ServiceProvider serviceProvider) {
        this.id = serviceProvider.id;
        this.firstName = serviceProvider.firstName;
        this.lastName = serviceProvider.lastName;
        this.email = serviceProvider.email.email;
        this.gender = serviceProvider.gender;
        this.mainLanguage = serviceProvider.mainLanguage.language;
        this.mainPhoneNumber = serviceProvider.mainPhoneNumber.number;
        this.nif = serviceProvider.nif;
        this.paymentInfoId = serviceProvider.paymentInfoId;
        this.invoiceInfoId = serviceProvider.invoiceInfoId;
        this.licenseNumber = serviceProvider.licenseNumber;
        this.categoryId = serviceProvider.categoryId;
        ///modificar o metodo
        this.servicesIds = serviceProvider.healthServices != null ? serviceProvider.healthServices.toArray(new Long[0]) : null;
        this.reviewIds = serviceProvider.reviewIds != null ? serviceProvider.reviewIds.toArray(new Long[0]) : null;
        this.reviewAverage = serviceProvider.reviewAverage;
        this.streetName = serviceProvider.streetName;
        this.doorNumber = serviceProvider.doorNumber;
        this.cityName = serviceProvider.cityName;
        this.postalCode = serviceProvider.postalCode;
    }

    public ServiceProviderDTO(long id, String firstName, String lastName, String email, String gender, String language, String phoneNumber,
                              String nif, String paymentInfoId, String invoiceInfoId,
                              String licenseNumber, long categoryId, Long[] servicesIds,
                              Long[] reviewIds, float reviewAverage, String streetName, String doorNumber,
                              String cityName, String postalCode) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.gender = gender;
        this.mainLanguage = language;
        this.mainPhoneNumber = phoneNumber;
        this.nif = nif;
        this.paymentInfoId = paymentInfoId;
        this.invoiceInfoId = invoiceInfoId;
        this.licenseNumber = licenseNumber;
        this.categoryId = categoryId;
        this.servicesIds = servicesIds;
        this.reviewIds = reviewIds;
        this.reviewAverage = reviewAverage;
        this.streetName = streetName;
        this.doorNumber = doorNumber;
        this.cityName = cityName;
        this.postalCode = postalCode;
    }

    @Override
    public boolean isValid() {
        return super.isValid() &&
                nif != null && !nif.isEmpty() &&
                paymentInfoId != null && !paymentInfoId.isEmpty() &&
                invoiceInfoId != null && !invoiceInfoId.isEmpty();
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
        sb.append("| Main Language: ").append(mainLanguage).append("\n");
        sb.append("| Second Language: ").append(secondLanguage).append("\n");
        sb.append("| Main Phone Number: ").append(mainPhoneNumber).append("\n");
        sb.append("| NIF: ").append(nif).append("\n");
        sb.append("| Payment Info ID: ").append(paymentInfoId).append("\n");
        sb.append("| Invoice Info ID: ").append(invoiceInfoId).append("\n");
        sb.append("| License Number: ").append(licenseNumber).append("\n");
        sb.append("| Category ID: ").append(categoryId).append("\n");
        sb.append("| Service IDs: ").append(Arrays.toString(servicesIds)).append("\n");
        sb.append("| Review IDs: ").append(Arrays.toString(reviewIds)).append("\n");
        sb.append("| Review Average: ").append(reviewAverage).append("\n");
        sb.append("| Street Name: ").append(streetName).append("\n");
        sb.append("| Door Number: ").append(doorNumber).append("\n");
        sb.append("| City Name: ").append(cityName).append("\n");
        sb.append("| Postal Code: ").append(postalCode).append("\n");
        sb.append("-----------------------------------\n");
        return sb.toString();
    }

}
