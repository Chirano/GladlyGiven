package pt.gladlyGivenApi.GladlyGiven.Models.DTO;

import pt.gladlyGivenApi.GladlyGiven.Models.Users.ServiceProvider;

import java.util.Arrays;

public class ServiceProviderDTO extends AppUserDTO {

    // Monetary user
    public String nif;
    public String paymentInfoId;
    public String invoiceInfoId;
    public String licenseNumber;
    public long categoryId;
    public float reviewAverage;

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
        this.reviewAverage = serviceProvider.reviewAverage;
    }

    public ServiceProviderDTO(long id, String firstName, String lastName, String email, String gender, String language, String phoneNumber,
                              String nif, String paymentInfoId, String invoiceInfoId,
                              String licenseNumber, long categoryId, float reviewAverage) {
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
        this.reviewAverage = reviewAverage;
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
        sb.append("| Review Average: ").append(reviewAverage).append("\n");
        sb.append("-----------------------------------\n");
        return sb.toString();
    }

}
