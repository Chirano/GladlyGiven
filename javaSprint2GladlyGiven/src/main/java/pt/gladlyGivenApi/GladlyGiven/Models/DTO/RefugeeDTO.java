package pt.gladlyGivenApi.GladlyGiven.Models.DTO;

import pt.gladlyGivenApi.GladlyGiven.Interfaces.IValidateable;

public class RefugeeDTO extends AppUserDTO implements IValidateable {
    public String protocolId;

    public String snsNumber;

    public String nationality;

    public String country;

    public RefugeeDTO() {
        super();
    }

    public RefugeeDTO(String firstName, String lastName, String email, String gender, String protocolId, String snsNumber, String nationality, String country) {
        super(firstName, lastName, email, gender);
        this.protocolId = protocolId;
        this.snsNumber = snsNumber;
        this.nationality = nationality;
        this.country = country;
    }

    public RefugeeDTO(String firstName, String lastName, String email, String gender, String mainLanguage, String secondLanguage, String mainPhoneNumber, String protocolId, String snsNumber, String nationality, String country) {
        super(firstName, lastName, email, gender, mainLanguage, secondLanguage, mainPhoneNumber);
        this.protocolId = protocolId;
        this.snsNumber = snsNumber;
        this.nationality = nationality;
        this.country = country;
    }

    @Override
    public boolean isValid() {
        return super.isValid() &&
                protocolId != null && !protocolId.isEmpty() &&
                snsNumber != null && !snsNumber.isEmpty() &&
                nationality != null && !nationality.isEmpty() &&
                country != null && !country.isEmpty();
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append("-----------------------------------\n");
        sb.append("|           Refugee Card           |\n");
        sb.append("-----------------------------------\n");
        sb.append("| ID: ").append(id).append("\n");
        sb.append("| Name: ").append(firstName).append(" ").append(lastName).append("\n");
        sb.append("| Email: ").append(email).append("\n");
        sb.append("| Gender: ").append(gender).append("\n");
        sb.append("| Protocol ID: ").append(protocolId).append("\n");
        sb.append("| SNS Number: ").append(snsNumber).append("\n");
        sb.append("| Nationality: ").append(nationality).append("\n");
        sb.append("| Country: ").append(country).append("\n");
        sb.append("| Main Language: ").append(mainLanguage).append("\n");
        sb.append("| Main Phone Number: ").append(mainPhoneNumber).append("\n");
        sb.append("-----------------------------------\n");
        return sb.toString();
    }
}
