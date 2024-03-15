// Author: Tiago Barracha
// ti.barracha@gmail.com

package pt.gladlyGivenApi.GladlyGiven.Models.Users;

import jakarta.persistence.Column;
import jakarta.persistence.MappedSuperclass;
import jakarta.validation.constraints.Max;
import lombok.Getter;
import lombok.Setter;
import pt.gladlyGivenApi.GladlyGiven.Models.Email;
import pt.gladlyGivenApi.GladlyGiven.Models.PhoneNumber;
import pt.gladlyGivenApi.GladlyGiven.Models.Language;

@Getter
@Setter
@MappedSuperclass
public abstract class MonetaryUser<T extends MonetaryUser> extends AppUser<T> {
    @Max(16)
    @Column(unique = true)
    public String nif;

    @Max(32)
    public String paymentInfoId; // fetched from Entity Framework API

    @Max(32)
    public String invoiceInfoId; // fetched from Entity Framework API

    public MonetaryUser() {

    }

    public MonetaryUser(String firstName, String lastName, Email email, String gender, String password, Language mainLanguage, Language secondLanguage, PhoneNumber phoneNumber, String nif) {
        super(firstName, lastName, email, gender, password, mainLanguage, secondLanguage, phoneNumber);
        this.nif = nif;
    }

    public MonetaryUser(String firstName, String lastName, Email email, String gender, String password, Language mainLanguage, Language secondLanguage, PhoneNumber phoneNumber, String nif, String paymentInfoId, String invoiceInfoId) {
        super(firstName, lastName, email, gender, password, mainLanguage, secondLanguage, phoneNumber);
        this.nif = nif;
        this.paymentInfoId = paymentInfoId;
        this.invoiceInfoId = invoiceInfoId;
    }
}
