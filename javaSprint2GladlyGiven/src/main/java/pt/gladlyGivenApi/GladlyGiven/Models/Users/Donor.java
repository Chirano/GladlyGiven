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

    public Donor(String firstName, String lastName, Email email, String gender, String password, Language language,
                 PhoneNumber phoneNumber, String nif, String paymentInfoId, String invoiceInfoId, FiscalIdentity fiscalIdentity) {
        super(firstName, lastName, email, gender, password, language, phoneNumber, nif, paymentInfoId, invoiceInfoId);
        this.fiscalIdentity = fiscalIdentity;
        this.donationIds = new ArrayList<>();
    }

    public Donor(String firstName, String lastName, Email email, String gender, String password, Language language, PhoneNumber phoneNumber, String nif, String paymentInfoId, String invoiceInfoId, FiscalIdentity fiscalIdentity, List<String> donationIds) {
        super(firstName, lastName, email, gender, password, language, phoneNumber, nif, paymentInfoId, invoiceInfoId);
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
        donorDTO.mainPhoneNumber = this.mainPhoneNumber.number;
        donorDTO.nif = this.nif;
        donorDTO.paymentInfoId = this.paymentInfoId;
        donorDTO.invoiceInfoId = this.invoiceInfoId;
        donorDTO.fiscalIdentity = this.fiscalIdentity;
        donorDTO.donationIds = this.donationIds;
        return donorDTO;
    }
}
