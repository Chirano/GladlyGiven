package pt.gladlyGivenApi.GladlyGiven.Models.DTO;

import pt.gladlyGivenApi.GladlyGiven.Enums.FiscalIdentity;

import java.util.List;

public class DonorDTO extends AppUserDTO {
    public String nif;

    public String paymentInfoId;

    public String invoiceInfoId;

    public FiscalIdentity fiscalIdentity;

    public List<String> donationIds;
}
