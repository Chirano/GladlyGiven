package pt.gladlyGivenApi.GladlyGiven.Services.Users;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import pt.gladlyGivenApi.GladlyGiven.Enums.FiscalIdentity;
import pt.gladlyGivenApi.GladlyGiven.Models.DTO.DonorDTO;
import pt.gladlyGivenApi.GladlyGiven.Models.Users.Donor;
import pt.gladlyGivenApi.GladlyGiven.Repositories.Users.*;

@Service
public class DonorService extends AppUserService{

    @Autowired
    DonorRepository donorRepository;


    public Page<Donor> findAllDonors(int page, int size){
        return donorRepository.findAll(PageRequest.of(page, size));
    }

    public Donor findDonorById(Long id){
        return donorRepository.findById(id).orElse(null);
    }

    public Donor findDonorByNif(String nif) {
        return donorRepository.findByNif(nif).orElse(null);
    }

    @Transactional
    public Donor createDonor(DonorDTO donorDTO) {
        try {
            if (donorDTO == null) {
                System.out.println("Received DonorDTO is null!");
                return null;
            }

            System.out.printf("\nTrying to create Donor: \n%s", donorDTO.toString());
            Donor donor = null;

            // If not service-originated, try to find if it already exists
            try {
                donor = findDonorByNif(donorDTO.nif);
            } catch (Exception e) {
                System.out.println("Didn't find donor. Creating.");
                System.out.println(e.getMessage());
            }

            if (donor == null) {
                System.out.println("Creating New Donor!");

                donor = Donor.fromDTO(donorDTO);

                // find or create AppUser class variables
                donor.email = findOrCreateEmail(donorDTO.email);
                donor.mainLanguage = findOrCreateLanguage(donorDTO.mainLanguage);
                donor.secondLanguage = findOrCreateLanguage(donorDTO.secondLanguage);
                donor.mainPhoneNumber = findOrCreatePhoneNumber(donorDTO.mainPhoneNumber);

                // Other donor-specific operations can be added here if needed

                donor = addCreationDateToUser(donor);
                donor = donorRepository.save(donor);

                System.out.println("New Donor:\n" + donor.toString());
            }

            return donor;
        } catch (Exception e) {
            System.out.println("\nSomething went wrong, returning Empty Donor. Error message:");
            System.out.println(e.getMessage());
            return null;
        }
    }

    @Transactional
    public Donor createDonor(String firstName, String lastName, String emailAddress, String gender, String password, String language, String phoneNumber, String nif, String paymentInfoId, String invoiceInfoId, int fiscalIdentity) {
        DonorDTO donorDTO = new DonorDTO();
        donorDTO.firstName = firstName;
        donorDTO.lastName = lastName;
        donorDTO.email = emailAddress;
        donorDTO.gender = gender;
        donorDTO.mainLanguage = language;
        donorDTO.mainPhoneNumber = phoneNumber;
        donorDTO.nif = nif;
        donorDTO.paymentInfoId = paymentInfoId;
        donorDTO.invoiceInfoId = invoiceInfoId;
        donorDTO.fiscalIdentity = FiscalIdentity.values()[fiscalIdentity];

        return createDonor(donorDTO);
    }

    @Transactional
    public Donor updateDonor(Donor donor){
        Donor existingDonor = donorRepository.findById(donor.id).orElse(null);

        if(existingDonor == null){
            return null;
        }

        existingDonor.firstName = donor.firstName;
        existingDonor.lastName = donor.lastName;
        existingDonor.gender = donor.gender;
        existingDonor.mainPhoneNumber = donor.mainPhoneNumber;
        existingDonor.nif = donor.nif;
        existingDonor.paymentInfoId = donor.paymentInfoId;
        existingDonor.invoiceInfoId = donor.invoiceInfoId;
        existingDonor.fiscalIdentity = donor.fiscalIdentity;

        return donorRepository.save(existingDonor);
    }

}
