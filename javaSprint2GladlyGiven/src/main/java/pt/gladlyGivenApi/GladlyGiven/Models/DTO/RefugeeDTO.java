package pt.gladlyGivenApi.GladlyGiven.Models.DTO;

public class RefugeeDTO extends AppUserDTO {
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

    public RefugeeDTO(String firstName, String lastName, String email, String gender, String mainLanguage, String mainPhoneNumber, String protocolId, String snsNumber, String nationality, String country) {
        super(firstName, lastName, email, gender, mainLanguage, mainPhoneNumber);
        this.protocolId = protocolId;
        this.snsNumber = snsNumber;
        this.nationality = nationality;
        this.country = country;
    }

    @Override
    public String toString() {
        final StringBuffer sb = new StringBuffer("RefugeeDTO{");
        sb.append("protocolId='").append(protocolId).append('\'');
        sb.append(", snsNumber='").append(snsNumber).append('\'');
        sb.append(", nationality='").append(nationality).append('\'');
        sb.append(", country='").append(country).append('\'');
        sb.append(", id=").append(id);
        sb.append(", firstName='").append(firstName).append('\'');
        sb.append(", lastName='").append(lastName).append('\'');
        sb.append(", email='").append(email).append('\'');
        sb.append(", gender='").append(gender).append('\'');
        sb.append(", photoURL='").append(photoURL).append('\'');
        sb.append(", mainLanguage='").append(mainLanguage).append('\'');
        sb.append(", mainPhoneNumber='").append(mainPhoneNumber).append('\'');
        sb.append('}');
        return sb.toString();
    }
}
