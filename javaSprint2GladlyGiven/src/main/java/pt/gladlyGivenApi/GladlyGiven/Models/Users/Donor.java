// Author: Tiago Barrach
// ti.barracha@gmail.com

package pt.gladlyGivenApi.GladlyGiven.Models.Users;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.Setter;
import pt.gladlyGivenApi.GladlyGiven.Enums.FiscalIdentity;
import pt.gladlyGivenApi.GladlyGiven.Interfaces.IDTOable;
import pt.gladlyGivenApi.GladlyGiven.Models.DTO.DonorDTO;
import pt.gladlyGivenApi.GladlyGiven.Models.Email;
import pt.gladlyGivenApi.GladlyGiven.Models.Language;
import pt.gladlyGivenApi.GladlyGiven.Models.PhoneNumber;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
public class Donor extends MonetaryUser<Donor> implements IDTOable<DonorDTO> {

    public FiscalIdentity fiscalIdentity;

    @ElementCollection
    public List<String> donationIds;

    public Donor() {

    }

    public Donor(String firstName, String lastName, Email email, String gender, String password, Language mainLanguage, Language secondLanguage, PhoneNumber phoneNumber, String nif, String paymentInfoId, String invoiceInfoId, FiscalIdentity fiscalIdentity, List<String> donationIds) {
        super(firstName, lastName, email, gender, password, mainLanguage, secondLanguage, phoneNumber, nif, paymentInfoId, invoiceInfoId);
        this.fiscalIdentity = fiscalIdentity;
        this.donationIds = donationIds;
    }

    @Override
    public DonorDTO toDTO() {
        DonorDTO donorDTO = new DonorDTO();
        donorDTO.id = this.id;
        donorDTO.firstName = this.firstName;
        donorDTO.lastName = this.lastName;
        donorDTO.email = this.email.email;
        donorDTO.gender = this.gender;
        donorDTO.photoURL = this.photoURL;
        donorDTO.mainLanguage = this.mainLanguage.language;
        donorDTO.secondLanguage = this.secondLanguage.language;
        donorDTO.mainPhoneNumber = this.mainPhoneNumber.number;
        donorDTO.nif = this.nif;
        donorDTO.paymentInfoId = this.paymentInfoId;
        donorDTO.invoiceInfoId = this.invoiceInfoId;
        donorDTO.fiscalIdentity = this.fiscalIdentity;
        donorDTO.donationIds = this.donationIds;
        return donorDTO;
    }

    public static Donor fromDTO(DonorDTO donorDTO) {
        Donor donor = new Donor();
        donor.id = donorDTO.id;
        donor.firstName = donorDTO.firstName;
        donor.lastName = donorDTO.lastName;
        donor.email = new Email(donorDTO.email);
        donor.gender = donorDTO.gender;
        donor.mainLanguage = new Language(donorDTO.mainLanguage);
        donor.secondLanguage = new Language(donorDTO.secondLanguage);
        donor.mainPhoneNumber = new PhoneNumber(donorDTO.mainPhoneNumber);
        donor.nif = donorDTO.nif;
        donor.paymentInfoId = donorDTO.paymentInfoId;
        donor.invoiceInfoId = donorDTO.invoiceInfoId;
        donor.fiscalIdentity = donorDTO.fiscalIdentity;
        donor.donationIds = donorDTO.donationIds;
        return donor;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append("-----------------------------------\n");
        sb.append("|            Donor Card           |\n");
        sb.append("-----------------------------------\n");
        sb.append("| ID: ").append(id).append("\n");
        sb.append("| Name: ").append(firstName).append(" ").append(lastName).append("\n");
        sb.append("| Email: ").append(email.email).append("\n");
        sb.append("| Gender: ").append(gender).append("\n");
        sb.append("| Main Language: ").append(mainLanguage.language).append("\n");
        sb.append("| Second Language: ").append(secondLanguage.language).append("\n");
        sb.append("| Main Phone Number: ").append(mainPhoneNumber.number).append("\n");
        sb.append("| NIF: ").append(nif).append("\n");
        sb.append("| Payment Info ID: ").append(paymentInfoId).append("\n");
        sb.append("| Invoice Info ID: ").append(invoiceInfoId).append("\n");
        sb.append("| Fiscal Identity: ").append(fiscalIdentity).append("\n");
        sb.append("| Donation IDs: ").append(donationIds).append("\n");
        sb.append("-----------------------------------\n");
        return sb.toString();
    }
}
