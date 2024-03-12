package pt.gladlyGivenApi.GladlyGiven.Models.DTO;

import pt.gladlyGivenApi.GladlyGiven.Enums.FiscalIdentity;
import java.util.List;

public class DonorDTO extends AppUserDTO {

    // Monetary user
    public String nif;
    public String paymentInfoId;
    public String invoiceInfoId;

    // donor
    public FiscalIdentity fiscalIdentity;
    public List<String> donationIds;

    public DonorDTO() {}

    public DonorDTO(String firstName, String lastName, String email, String gender) {
        super(firstName, lastName, email, gender);
    }

    public DonorDTO(String firstName, String lastName, String email, String gender, String mainLanguage, String secondLanguage, String mainPhoneNumber) {
        super(firstName, lastName, email, gender, mainLanguage, secondLanguage, mainPhoneNumber);
    }

    public DonorDTO(String firstName, String lastName, String email, String gender, String mainLanguage, String secondLanguage, String mainPhoneNumber,
                    String nif, String paymentInfoId, String invoiceInfoId,
                    FiscalIdentity fiscalIdentity, List<String> donationIds) {
        super(firstName, lastName, email, gender, mainLanguage, secondLanguage, mainPhoneNumber);
        this.nif = nif;
        this.paymentInfoId = paymentInfoId;
        this.invoiceInfoId = invoiceInfoId;
        this.fiscalIdentity = fiscalIdentity;
        this.donationIds = donationIds;
    }

    @Override
    public boolean isValid() {
        return super.isValid() &&
                nif != null && !nif.isEmpty() &&
                paymentInfoId != null && !paymentInfoId.isEmpty() &&
                invoiceInfoId != null && !invoiceInfoId.isEmpty() &&
                fiscalIdentity != null && donationIds != null;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append("-----------------------------------\n");
        sb.append("|            Donor Card           |\n");
        sb.append("-----------------------------------\n");
        sb.append("| ID: ").append(id).append("\n");
        sb.append("| Name: ").append(firstName).append(" ").append(lastName).append("\n");
        sb.append("| Email: ").append(email).append("\n");
        sb.append("| Gender: ").append(gender).append("\n");
        sb.append("| Main Language: ").append(mainLanguage).append("\n");
        sb.append("| Main Phone Number: ").append(mainPhoneNumber).append("\n");
        sb.append("| NIF: ").append(nif).append("\n");
        sb.append("| Payment Info ID: ").append(paymentInfoId).append("\n");
        sb.append("| Invoice Info ID: ").append(invoiceInfoId).append("\n");
        sb.append("| Fiscal Identity: ").append(fiscalIdentity).append("\n");
        sb.append("| Donation IDs: ").append(donationIds).append("\n");
        sb.append("-----------------------------------\n");
        return sb.toString();
    }

}
