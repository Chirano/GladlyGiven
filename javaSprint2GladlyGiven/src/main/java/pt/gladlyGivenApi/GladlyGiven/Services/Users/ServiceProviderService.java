package pt.gladlyGivenApi.GladlyGiven.Services.Users;

import jakarta.transaction.Transactional;
import org.apache.commons.lang3.NotImplementedException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import pt.gladlyGivenApi.GladlyGiven.Enums.AvailabilityStatus;
import pt.gladlyGivenApi.GladlyGiven.Models.HealthServices.HealthService;
import pt.gladlyGivenApi.GladlyGiven.PageUtils;
import pt.gladlyGivenApi.GladlyGiven.Models.Availability;
import pt.gladlyGivenApi.GladlyGiven.Models.Email;
import pt.gladlyGivenApi.GladlyGiven.Models.Language;
import pt.gladlyGivenApi.GladlyGiven.Models.PhoneNumber;
import pt.gladlyGivenApi.GladlyGiven.Models.Users.ServiceProvider;
import pt.gladlyGivenApi.GladlyGiven.Repositories.AvailabilityRepository;
import pt.gladlyGivenApi.GladlyGiven.Repositories.HealthServiceRepository;
import pt.gladlyGivenApi.GladlyGiven.Repositories.Users.ServiceProviderRepository;

import java.util.ArrayList;
import java.util.List;

@Service
public class ServiceProviderService extends AppUserService {

    // Repositories
    // ---------------------------------------------------------------------
    @Autowired
    private ServiceProviderRepository serviceProviderRepository;

    @Autowired
    private AvailabilityRepository availabilityRepository;

    @Autowired
    private HealthServiceRepository healthServiceRepository;



    // Service Provider
    // ---------------------------------------------------------------------
    // find ---
    public ServiceProvider findServiceProviderById(Long id) {
        return findUserById(id, serviceProviderRepository);
    }

    public ServiceProvider findServiceProviderByEmail(String email) {
        return findUserByEmail(email, serviceProviderRepository);
    }

    public ServiceProvider findServiceProviderByFirstName(String firstName) {
        return findUserByFirstName(firstName, serviceProviderRepository);
    }

    public ServiceProvider findServiceProviderByLastName(String lastName) {
        return findUserByLastName(lastName, serviceProviderRepository);
    }

    public ServiceProvider findServiceProviderByLicenseNumber(String licenseNumber) {
        return serviceProviderRepository.findByLicenseNumber(licenseNumber).orElse(null);
    }

    public List<ServiceProvider> findServicesProvidersByHealthService(long id){
        return serviceProviderRepository.findByHealthServiceId(id);
    }
    // create ---
    public ServiceProvider createServiceProvider(ServiceProvider serviceProvider, boolean isServiceOriginated) {
        return createUser(serviceProvider, serviceProviderRepository, isServiceOriginated);
    }

    @Transactional
    public ServiceProvider createServiceProvider(String firstName, String lastName, String emailAddress, String gender, String password, String language, String phoneNumber, String nif, String licenseNumber, long categoryId) {
        ServiceProvider serviceProvider = findServiceProviderByFirstName(firstName);

        if (serviceProvider == null) {
            Email email = findOrCreateEmail(emailAddress);
            Language userLanguage = findOrCreateLanguage(language);
            PhoneNumber userPhoneNumber = findOrCreatePhoneNumber(phoneNumber);

            serviceProvider = new ServiceProvider(
                    firstName,
                    lastName,
                    email,
                    gender,
                    password,
                    userLanguage,
                    userPhoneNumber,
                    nif,
                    licenseNumber,
                    categoryId
            );

            serviceProvider = createServiceProvider(serviceProvider, true);
        }

        return serviceProvider;
    }


    // update ---
    public ServiceProvider updateServiceProvider(ServiceProvider serviceProvider) {
        if (serviceProvider == null)
            return null;

        ServiceProvider existing = updateUser(serviceProvider, serviceProviderRepository);

        if (existing != null) {
            if (!existing.licenseNumber.equalsIgnoreCase(serviceProvider.licenseNumber))
                existing.licenseNumber = serviceProvider.licenseNumber;

            if (existing.categoryId != serviceProvider.categoryId)
                existing.categoryId = serviceProvider.categoryId;
        }

        return existing;
    }

    public ServiceProvider addServicesToServiceProvider(ServiceProvider serviceProvider, HealthService service) {

        if(serviceProvider.healthServices.contains(service)){
            return null;
        }

        serviceProvider.healthServices.add(service);
        serviceProvider = serviceProviderRepository.save(serviceProvider);

        return serviceProvider;
    }

    public ServiceProvider removeHealthService(ServiceProvider serviceProvider, HealthService service)
    {
        if (!serviceProvider.healthServices.contains(service)){
            return null;
        }

        serviceProvider.healthServices.remove(service);
        serviceProvider = serviceProviderRepository.save(serviceProvider);

        return serviceProvider;
    }

    // Service Provider Availability
    // ---------------------------------------------------------------------
    public Availability findAvailability(Long id) {
        return availabilityRepository.findById(id).orElse(null);
    }

    public List<Availability> findAvailabilitiesByStartDateTime(int pageNumber, int pageSize, String startDateTimeString) {
        Pageable pageable = PageRequest.of(pageNumber, pageSize, Sort.by("availability.startDateTimeString"));
        Page<Availability> page = availabilityRepository.findByStartDateTime(startDateTimeString, pageable);

        return PageUtils.pageToList(page);
    }

    public Availability createAvailability(Availability availability) {
        //Checar se já existe uma availability com o mesmo id
        Availability av = this.availabilityRepository.findById(availability.id).orElse(null);

        if(av != null) {
            throw new NotImplementedException(); //Availability already exists
        }

        availability.availabilityStatus = AvailabilityStatus.Free;
        Availability newAv = this.availabilityRepository.save(availability);

        return newAv;
    }

    //TODO:
    public List<Availability> findAvailabilitiesByStatus(int pageNumber, int pageSize, String availabilityStatus) {


        return null;
    }

    // Service Reviews
    // ---------------------------------------------------------------------
    private ServiceProvider addServiceReview(ServiceProvider serviceProvider, Long reviewId) {
        if (serviceProvider != null) {
            if (serviceProvider.reviewIds == null)
                serviceProvider.reviewIds = new ArrayList<>();

            if (!serviceProvider.reviewIds.contains(reviewId)) {
                serviceProvider.reviewIds.add(reviewId);
                serviceProvider = serviceProviderRepository.save(serviceProvider);
            }
        }

        return serviceProvider;
    }

    public ServiceProvider addServiceReview(Long serviceProviderId, Long reviewId) {
        ServiceProvider serviceProvider = findServiceProviderById(serviceProviderId);
        return addServiceReview(serviceProvider, reviewId);
    }

    public ServiceProvider addServiceReview(String serviceProviderlicenseNumber, Long reviewId) {
        ServiceProvider serviceProvider = findServiceProviderByLicenseNumber(serviceProviderlicenseNumber);
        return addServiceReview(serviceProvider, reviewId);
    }
}
