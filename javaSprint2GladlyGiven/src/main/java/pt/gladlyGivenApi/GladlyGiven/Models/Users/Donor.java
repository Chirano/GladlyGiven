// Author: Tiago Barrach
// ti.barracha@gmail.com

package pt.gladlyGivenApi.GladlyGiven.Models.Users;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.Setter;
import pt.gladlyGivenApi.GladlyGiven.Enums.FiscalIdentity;
import pt.gladlyGivenApi.GladlyGiven.Models.Email;
import pt.gladlyGivenApi.GladlyGiven.Models.Language;
import pt.gladlyGivenApi.GladlyGiven.Models.PhoneNumber;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
public class Donor extends MonetaryUser<Donor> {

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
    public Donor toDTO() {
        return this;
    }

}
