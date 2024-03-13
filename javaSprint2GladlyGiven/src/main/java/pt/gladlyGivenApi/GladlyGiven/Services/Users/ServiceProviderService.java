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
import pt.gladlyGivenApi.GladlyGiven.Models.Users.Refugee;
import pt.gladlyGivenApi.GladlyGiven.PageUtils;
import pt.gladlyGivenApi.GladlyGiven.Models.Availability;
import pt.gladlyGivenApi.GladlyGiven.Models.Users.ServiceProvider;
import pt.gladlyGivenApi.GladlyGiven.Models.DTO.ServiceProviderDTO;
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
    public ServiceProvider saveServiceProvider(ServiceProvider serviceProvider) {
        return saveUserToRepository(serviceProvider, serviceProviderRepository);
    }

    public ServiceProvider setRefugeePassword(ServiceProvider serviceProvider, String password) {
        return setUserPassword(serviceProvider, password, serviceProviderRepository);
    }

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
    @Transactional
    public ServiceProvider createServiceProvider(ServiceProviderDTO serviceProviderDTO, boolean isServiceOriginated) {
        try {
            if (serviceProviderDTO == null) {
                System.out.println("Received ServiceProviderDTO is null!");
                return null;
            }

            System.out.printf("\nTrying to create ServiceProvider: \n%s", serviceProviderDTO.toString());
            ServiceProvider serviceProvider = null;

            // try to fetch user
            try {
                serviceProvider = findServiceProviderByEmail(serviceProviderDTO.email);
            } catch (Exception e) {
                System.out.println("Error searching for Service Provider. Error:");
                System.out.println(e.getMessage());
            }

            if (serviceProvider == null) {
                System.out.println("Creating New ServiceProvider!");

                serviceProvider = ServiceProvider.fromDTO(serviceProviderDTO);

                // find or create AppUser class variables
                serviceProvider = createAppUserDependantEntities(serviceProvider);

                // find or create ServiceProvider class variables
                // TODO add or create healthServices

                serviceProvider = addCreationDateToUser(serviceProvider);
                serviceProvider = saveServiceProvider(serviceProvider);

                System.out.println("New ServiceProvider:\n" + serviceProvider.toString());
            }

            return serviceProvider;
        } catch (Exception e) {
            System.out.println("\nSomething went wrong, returning Empty Service Provider. Error message:");
            System.out.println(e.getMessage());
            return null;
        }
    }

    public ServiceProvider createServiceProvider(ServiceProvider serviceProvider) {
        if (serviceProvider == null) {
            System.out.println("Tried to create null ServiceProvider");
            return null;
        }

        ServiceProvider existing = findServiceProviderByEmail(serviceProvider.email.email);

        if (existing == null) {
            existing = createAppUserDependantEntities(serviceProvider);
            existing = addCreationDateToUser(serviceProvider);
            existing = saveServiceProvider(serviceProvider);
        }

        return existing;
    }

    @Transactional
    public ServiceProvider createServiceProvider(String firstName, String lastName, String emailAddress, String gender, String password, String language, String phoneNumber, String nif, String licenseNumber, long categoryId) {
        // Create a ServiceProviderDTO using the provided parameters
        ServiceProviderDTO serviceProviderDTO = new ServiceProviderDTO();
        serviceProviderDTO.firstName = firstName;
        serviceProviderDTO.lastName = lastName;
        serviceProviderDTO.email = emailAddress;
        serviceProviderDTO.gender = gender;
        serviceProviderDTO.mainLanguage = language;
        serviceProviderDTO.mainPhoneNumber = phoneNumber;
        serviceProviderDTO.nif = nif;
        serviceProviderDTO.licenseNumber = licenseNumber;
        serviceProviderDTO.categoryId = categoryId;

        // Return the method call on top
        return createServiceProvider(serviceProviderDTO, true);
    }



    // update ---
    @Transactional
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

    @Transactional
    public ServiceProvider addServicesToServiceProvider(ServiceProvider serviceProvider, HealthService service) {

        if(serviceProvider.healthServices.contains(service)){
            return null;
        }

        serviceProvider.healthServices.add(service);
        serviceProvider = serviceProviderRepository.save(serviceProvider);

        return serviceProvider;
    }

    @Transactional
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

    /**
     * Retrieves a paginated list of availabilities from the Availability repository.
     *
     * @param page Page number for pagination.
     * @param size Number of items per page.
     * @return Page of Availability objects representing the retrieved availabilities.
     * @throws NotImplementedException if the table 'Availability' is null.
     */
    public Page<Availability> findAllAvailabilities(int page, int size) {
        Page<Availability> avPage =  this.availabilityRepository.findAll(PageRequest.of(page, size));

        if(!avPage.hasContent()) {
            throw new NotImplementedException("Table Availabity is null!");
        }

        return avPage;
    }

    public Page<Availability> findAllAvailabilitiesByUserId(long id, int page, int size) {
        Page<Availability> avPage =  this.availabilityRepository.findAllAvailabilitiesByServiceProviderId(id, PageRequest.of(page, size));

        if(!avPage.hasContent()) {
            throw new NotImplementedException("There's no availabilities registered for this user id!");
        }

        return avPage;
    }

    /**
     * Retrieves an availability by its unique identifier.
     *
     * @param id The unique identifier of the availability.
     * @return The availability object if found, or null if not found.
     */
    public Availability findAvailabilityById(Long id) {
        Availability av = this.availabilityRepository.findById(id).orElse(null);

        if(av == null) {
            throw new NotImplementedException("Entity doesn't exist");
        }

        return availabilityRepository.findById(id).orElse(null);
    }


    @Transactional
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
