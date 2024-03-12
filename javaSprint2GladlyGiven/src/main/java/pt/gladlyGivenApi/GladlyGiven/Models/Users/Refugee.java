// Author: Tiago Barracha
// ti.barracha@gmail.com

package pt.gladlyGivenApi.GladlyGiven.Models.Users;

import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.Max;
import pt.gladlyGivenApi.GladlyGiven.Interfaces.IDTOable;
import pt.gladlyGivenApi.GladlyGiven.Models.DTO.RefugeeDTO;
import pt.gladlyGivenApi.GladlyGiven.Models.Email;
import pt.gladlyGivenApi.GladlyGiven.Models.Country;
import pt.gladlyGivenApi.GladlyGiven.Models.Language;
import pt.gladlyGivenApi.GladlyGiven.Models.PhoneNumber;

@Entity
public class Refugee extends AppUser<Refugee> implements IDTOable<RefugeeDTO> {
    @Max(16)
    public String protocolId;

    @Max(16)
    public String snsNumber;

    @Max(16)
    public String nationality;

    @Max(32)
    @ManyToOne
    public Country country;

    public Refugee() {
        super();
    }

    public Refugee(String firstName, String lastName, Email email, String gender, String password, String protocolId, String snsNumber, String nationality) {
        super(firstName, lastName, email, gender, password);
        this.protocolId = protocolId;
        this.snsNumber = snsNumber;
        this.nationality = nationality;
    }

    public Refugee(String firstName, String lastName, Email email, String gender, String password, String protocolId, String snsNumber, String nationality, Country country, Language language, PhoneNumber phoneNumber) {
        super(firstName, lastName, email, gender, password, language, phoneNumber);
        this.protocolId = protocolId;
        this.snsNumber = snsNumber;
        this.nationality = nationality;
        this.country = country;
    }

    @Override
    public RefugeeDTO toDTO() {
        RefugeeDTO refugeeDTO = new RefugeeDTO();
        refugeeDTO.id = this.id;
        refugeeDTO.firstName = this.firstName;
        refugeeDTO.lastName = this.lastName;
        refugeeDTO.email = this.email.email;
        refugeeDTO.gender = this.gender;
        refugeeDTO.photoURL = this.photoURL;
        refugeeDTO.mainLanguage = this.mainLanguage.language;
        refugeeDTO.mainPhoneNumber = this.mainPhoneNumber.number;
        refugeeDTO.protocolId = this.protocolId;
        refugeeDTO.snsNumber = this.snsNumber;
        refugeeDTO.nationality = this.nationality;
        refugeeDTO.country = this.country.country;
        return refugeeDTO;
    }

    public static Refugee fromDTO(RefugeeDTO dto) {
        Email email = new Email();
        email.email = dto.email;

        Language language = new Language();
        language.language = dto.mainLanguage;

        PhoneNumber phoneNumber = new PhoneNumber();
        phoneNumber.number = dto.mainPhoneNumber;

        Country country = new Country();
        country.country = dto.country;

        Refugee refugee = new Refugee();
        refugee.id = dto.id;
        refugee.firstName = dto.firstName;
        refugee.lastName = dto.lastName;
        refugee.email = email;
        refugee.gender = dto.gender;
        refugee.photoURL = dto.photoURL;
        refugee.mainLanguage = language;
        refugee.mainPhoneNumber = phoneNumber;
        refugee.protocolId = dto.protocolId;
        refugee.snsNumber = dto.snsNumber;
        refugee.nationality = dto.nationality;
        refugee.country = country;

        return refugee;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append("-----------------------------------\n");
        sb.append("|           Refugee Card           |\n");
        sb.append("-----------------------------------\n");
        sb.append("| ID: ").append(id).append("\n");
        sb.append("| Name: ").append(firstName).append(" ").append(lastName).append("\n");
        sb.append("| Email: ").append(email.email).append("\n");
        sb.append("| Gender: ").append(gender).append("\n");
        sb.append("| Protocol ID: ").append(protocolId).append("\n");
        sb.append("| SNS Number: ").append(snsNumber).append("\n");
        sb.append("| Nationality: ").append(nationality).append("\n");
        sb.append("| Country: ").append(country.country).append("\n");
        sb.append("| Main Language: ").append(mainLanguage.language).append("\n");
        sb.append("| Second Language: ").append(secondLanguage.language).append("\n");
        sb.append("| Main Phone Number: ").append(mainPhoneNumber.number).append("\n");
        sb.append("-----------------------------------\n");
        return sb.toString();
    }
}
