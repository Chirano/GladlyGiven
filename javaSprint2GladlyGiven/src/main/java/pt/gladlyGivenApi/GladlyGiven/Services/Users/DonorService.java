package pt.gladlyGivenApi.GladlyGiven.Services.Users;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import pt.gladlyGivenApi.GladlyGiven.Models.Email;
import pt.gladlyGivenApi.GladlyGiven.Models.Language;
import pt.gladlyGivenApi.GladlyGiven.Models.PhoneNumber;
import pt.gladlyGivenApi.GladlyGiven.Models.Users.Donor;
import pt.gladlyGivenApi.GladlyGiven.Models.Users.Refugee;
import pt.gladlyGivenApi.GladlyGiven.Repositories.EmailRepository;
import pt.gladlyGivenApi.GladlyGiven.Repositories.LanguageRepository;
import pt.gladlyGivenApi.GladlyGiven.Repositories.Users.*;

@Service
public class DonorService extends AppUserService{

    @Autowired
    DonorRepository donorRepository;

    @Autowired
    EmailRepository emailRepository;

    @Autowired
    LanguageRepository languageRepository;


    public Page<Donor> findAllDonors(int page, int size){
        return donorRepository.findAll(PageRequest.of(page, size));
    }

    public Donor findDonorById(Long id){
        return donorRepository.findById(id).orElse(null);
    }

    @Transactional
    public Donor createDonor(Donor donor){
        if(donorRepository.existsById(donor.id)){
            return null;
        }

        Email email = findOrCreateEmail(donor.email.toString());
        PhoneNumber phoneNumber = findOrCreatePhoneNumber(donor.mainPhoneNumber.toString());
        Language language = findOrCreateLanguage(donor.mainLanguage.toString());

        Donor newDonor = new Donor(donor.firstName, donor.lastName, email, donor.gender, donor.password,
                language, phoneNumber, donor.nif, donor.paymentInfoId, donor.invoiceInfoId, donor.fiscalIdentity);
        newDonor = createDonor(newDonor, true);

        return newDonor;
    }

    @Transactional
    public Donor createDonor(Donor donor, boolean isServiceOriginated) {
        if (donor == null)
            return null;

        Donor ref = null;

        // if didn't come from service, try to find if it already exists
        if (!isServiceOriginated) {
            ref = donorRepository.findByNif(donor.nif).orElse(null);
        }

        if (ref == null) {
            ref = addCreationDateToUser(donor);
            ref = donorRepository.save(ref);
        }

        return ref;
    }

    @Transactional
    public Donor updateDonor(Donor donor){
        Donor existingDonor = donorRepository.findById(donor.id).orElse(null);

        if(existingDonor == null){
            return null;
        }

        existingDonor.setFirstName(donor.getFirstName());
        existingDonor.setLastName(donor.getLastName());
        existingDonor.setGender(donor.getGender());
        existingDonor.setPhoneNumber(donor.getPhoneNumber());
        existingDonor.setNif(donor.getNif());
        existingDonor.setPaymentInfoId(donor.getPaymentInfoId());
        existingDonor.setInvoiceInfoId(donor.getInvoiceInfoId());
        existingDonor.setFiscalIdentity(donor.getFiscalIdentity());
        return donorRepository.save(existingDonor);
    }

}
