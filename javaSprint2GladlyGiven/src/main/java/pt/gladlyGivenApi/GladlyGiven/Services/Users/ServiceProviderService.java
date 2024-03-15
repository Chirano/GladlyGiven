package pt.gladlyGivenApi.GladlyGiven.Services.Users;

import jakarta.transaction.Transactional;
import org.apache.commons.lang3.NotImplementedException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import pt.gladlyGivenApi.GladlyGiven.Enums.AvailabilityStatus;
import pt.gladlyGivenApi.GladlyGiven.Models.HealthServices.HealthService;
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

    /**
     * Saves a service provider to the repository.
     *
     * @param serviceProvider The service provider to be saved.
     * @return The saved service provider object.
     */
    public ServiceProvider saveServiceProvider(ServiceProvider serviceProvider) {
        return saveUserToRepository(serviceProvider, serviceProviderRepository);
    }

    /**
     * Sets a new password for a service provider.
     *
     * @param serviceProvider The service provider for which to set the new password.
     * @param password The new password to be set.
     * @return The updated service provider object with the new password set.
     */
    public ServiceProvider setServiceProviderPassword(ServiceProvider serviceProvider, String password) {
        return setUserPassword(serviceProvider, password, serviceProviderRepository);
    }

    // Finds ---

    /**
     * Retrieves a service provider by its ID.
     *
     * @param id The ID of the service provider to retrieve.
     * @return The service provider with the specified ID, or null if not found.
     */
    public ServiceProvider findServiceProviderById(Long id) {
        return findUserById(id, serviceProviderRepository);
    }

    /**
     * Retrieves a service provider by its email address.
     *
     * @param email The email address of the service provider to retrieve.
     * @return The service provider with the specified email address, or null if not found.
     */
    public ServiceProvider findServiceProviderByEmail(String email) {
        return findUserByEmail(email, serviceProviderRepository);
    }

    /**
     * Retrieves a service provider by their first name.
     *
     * @param firstName The first name of the service provider to retrieve.
     * @return The service provider with the specified first name, or null if not found.
     */
    public ServiceProvider findServiceProviderByFirstName(String firstName) {
        return findUserByFirstName(firstName, serviceProviderRepository);
    }

    /**
     * Retrieves a service provider by their last name.
     *
     * @param lastName The last name of the service provider to retrieve.
     * @return The service provider with the specified last name, or null if not found.
     */
    public ServiceProvider findServiceProviderByLastName(String lastName) {
        return findUserByLastName(lastName, serviceProviderRepository);
    }

    /**
     * Retrieves a service provider by their license number.
     *
     * @param licenseNumber The license number of the service provider to retrieve.
     * @return The service provider with the specified license number, or null if not found.
     */
    public ServiceProvider findServiceProviderByLicenseNumber(String licenseNumber) {
        return serviceProviderRepository.findByLicenseNumber(licenseNumber).orElse(null);
    }

    /**
     * Retrieves a list of service providers offering a specific health service.
     *
     * @param id The ID of the health service to filter by.
     * @return A list of service providers offering the specified health service, or an empty list if none are found.
     */
    public List<ServiceProvider> findServicesProvidersByHealthService(long id){
        return serviceProviderRepository.findByHealthServiceId(id);
    }

    // create ---

    /**
     * Creates a new service provider based on the provided service provider DTO.
     *
     * @param serviceProviderDTO The service provider DTO containing information about the service provider.
     * @param isServiceOriginated A boolean indicating whether the service is originated from this service provider.
     * @return The created service provider if successful, otherwise null.
     */
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
                List<HealthService> healthServices = new ArrayList<>();
                if (serviceProviderDTO.servicesIds != null) {
                    for (Long healthServiceId : serviceProviderDTO.servicesIds) {
                        HealthService hs = this.healthServiceRepository.findById(healthServiceId).orElse(null);
                        if (hs != null) {
                            healthServices.add(hs);
                        }
                    }
                }
                System.out.println("Teste");
                serviceProvider.healthServices = healthServices;
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

    /**
     * Creates a new service provider using the provided ServiceProvider object.
     *
     * @param serviceProvider The ServiceProvider object containing the details of the service provider to be created.
     * @return The newly created ServiceProvider object, or null if the provided ServiceProvider object is null.
     */
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

    /**
     * Creates a new service provider using the provided information.
     *
     * @param firstName The first name of the service provider.
     * @param lastName The last name of the service provider.
     * @param emailAddress The email address of the service provider.
     * @param gender The gender of the service provider.
     * @param password The password of the service provider.
     * @param mainLanguage The main language preference of the service provider.
     * @param secondLanguage The second language preference of the service provider.
     * @param phoneNumber The phone number of the service provider.
     * @param nif The NIF (Número de Identificação Fiscal) of the service provider.
     * @param licenseNumber The license number of the service provider.
     * @param categoryId The category ID of the service provider.
     * @param streetName The street name of the service provider's address.
     * @param doorNumber The door number of the service provider's address.
     * @param cityName The city name of the service provider's address.
     * @param postalCode The postal code of the service provider's address.
     * @return The newly created ServiceProvider object.
     */
    @Transactional
    public ServiceProvider createServiceProvider(String firstName, String lastName, String emailAddress, String gender, String password, String mainLanguage, String secondLanguage, String phoneNumber, String nif, String licenseNumber, long categoryId, String streetName, String doorNumber, String cityName, String postalCode) {
        // Create a ServiceProviderDTO using the provided parameters
        ServiceProviderDTO serviceProviderDTO = new ServiceProviderDTO();
        serviceProviderDTO.firstName = firstName;
        serviceProviderDTO.lastName = lastName;
        serviceProviderDTO.email = emailAddress;
        serviceProviderDTO.gender = gender;
        serviceProviderDTO.mainLanguage = mainLanguage;
        serviceProviderDTO.secondLanguage = secondLanguage;
        serviceProviderDTO.mainPhoneNumber = phoneNumber;
        serviceProviderDTO.nif = nif;
        serviceProviderDTO.licenseNumber = licenseNumber;
        serviceProviderDTO.categoryId = categoryId;
        serviceProviderDTO.streetName = streetName;
        serviceProviderDTO.doorNumber = doorNumber;
        serviceProviderDTO.cityName = cityName;
        serviceProviderDTO.postalCode = postalCode;


        // Return the method call on top
        return createServiceProvider(serviceProviderDTO, true);
    }


    // update ---

    /**
     * Updates an existing service provider with the provided data.
     *
     * @param serviceProvider The service provider object containing the updated data.
     * @return The updated service provider object, or null if the provided service provider is null or not found.
     */
    @Transactional
    public ServiceProvider updateServiceProvider(ServiceProvider serviceProvider) {
        if (serviceProvider == null)
            return null;

        ServiceProvider existing = updateUser(serviceProvider, serviceProviderRepository);

        if (existing != null) {
            if (serviceProvider.licenseNumber != null && !existing.licenseNumber.equalsIgnoreCase(serviceProvider.licenseNumber))
                existing.licenseNumber = serviceProvider.licenseNumber;

            if (existing.categoryId != null && existing.categoryId != serviceProvider.categoryId)
                existing.categoryId = serviceProvider.categoryId;
        }

        return existing;
    }

    /**
     * Adds a service to the specified service provider.
     *
     * @param serviceProvider The service provider to which the health service will be added.
     * @param service The health service to be added.
     * @return The updated service provider with the added health service if successful, otherwise null.
     */
    @Transactional
    public ServiceProvider addServicesToServiceProvider(ServiceProvider serviceProvider, HealthService service) {

        if(serviceProvider.healthServices.contains(service)){
            return null;
        }

        serviceProvider.healthServices.add(service);
        serviceProvider = serviceProviderRepository.save(serviceProvider);

        return serviceProvider;
    }

    /**
     * Removes a health service from the list of services offered by a service provider.
     *
     * @param serviceProvider The service provider object from which to remove the health service.
     * @param service The health service object to be removed.
     * @return The updated service provider object after removing the health service,
     *         or null if the service provider does not offer the specified health service.
     */
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
            throw new IllegalArgumentException("Table Availabity is null!");
        }

        return avPage;
    }

    /**
     * Retrieves a page of availabilities associated with the specified user ID.
     *
     * @param id The ID of the user (service provider) whose availabilities are to be retrieved.
     * @param page The page number to be retrieved. Pages are zero-indexed.
     * @param size The size of each page to be retrieved.
     * @return A {@link Page} containing the availabilities associated with the specified user ID.
     */
    public Page<Availability> findAllAvailabilitiesByUserId(long id, int page, int size) {
        Page<Availability> avPage =  this.availabilityRepository.findAllAvailabilitiesByServiceProviderId(id, PageRequest.of(page, size));

        if(!avPage.hasContent()) {
            throw new IllegalArgumentException("There's no availabilities registered for this user id!");
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
            throw new IllegalArgumentException("Entity doesn't exist");
        }

        return availabilityRepository.findById(id).orElse(null);
    }

    /**
     * Creates a new availability entry in the system.
     *
     * @param availability The availability object to be created.
     * @return The newly created availability if successful.
     */
    @Transactional
    public Availability createAvailability(Availability availability) {
        Availability av = this.availabilityRepository.findById(availability.id).orElse(null);

        if(av != null) {
            throw new IllegalArgumentException("Availability already exists");
        }

        availability.availabilityStatus = AvailabilityStatus.Free;
        Availability newAv = this.availabilityRepository.save(availability);

        return newAv;
    }


    /**
     * Retrieves a page of availabilities based on the given availability status.
     *
     * @param availabilityStatus The availability status to filter by.
     * @param page               The page number to retrieve.
     * @param size               The number of items per page.
     * @return A Page object containing the availabilities with the specified status,
     *         paginated according to the given page and size parameters.
     */
    public Page<Availability> findAvailabilitiesByStatus(int availabilityStatus, int page, int size) {
        if(availabilityStatus == 0) {
            return this.availabilityRepository.findByAvailabilityStatus(availabilityStatus, PageRequest.of(page, size));
        } else {
            return this.availabilityRepository.findByAvailabilityStatus(availabilityStatus, PageRequest.of(page, size));
        }
    }

    // Service Reviews
    // ---------------------------------------------------------------------

    /**
     * Adds a review ID to the list of reviews associated with a service provider.
     *
     * @param serviceProvider The service provider object to which the review ID will be added.
     * @param reviewId The ID of the review to be added.
     * @return The updated service provider object after adding the review ID,
     *         or the original service provider object if it is null.
     */
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

    /**
     * Adds a review ID to the list of reviews associated with a service provider.
     *
     * @param serviceProviderId The ID of the service provider to which the review ID will be added.
     * @param reviewId The ID of the review to be added.
     * @return The updated service provider object after adding the review ID,
     *         or null if no service provider is found with the specified ID
     *         or if an error occurs during the process.
     */
    public ServiceProvider addServiceReview(Long serviceProviderId, Long reviewId) {
        ServiceProvider serviceProvider = findServiceProviderById(serviceProviderId);
        return addServiceReview(serviceProvider, reviewId);
    }

    /**
     * Adds a review ID to the list of reviews associated with a service provider identified by their license number.
     *
     * @param serviceProviderlicenseNumber The license number of the service provider to which the review ID will be added.
     * @param reviewId The ID of the review to be added.
     * @return The updated service provider object after adding the review ID,
     *         or null if no service provider is found with the specified license number
     *         or if an error occurs during the process.
     */
    public ServiceProvider addServiceReview(String serviceProviderlicenseNumber, Long reviewId) {
        ServiceProvider serviceProvider = findServiceProviderByLicenseNumber(serviceProviderlicenseNumber);
        return addServiceReview(serviceProvider, reviewId);
    }

    //TODO: NÃO ESTÁ SENDO USADO. RETIRAR!
    /**
     * Finds service providers offering a specific service in a given city.
     *
     * @param serviceId The ID of the service offered by the service providers.
     * @param cityName The name of the city where the service providers are located.
     * @return A list of ServiceProviderDTO objects representing the service providers offering the specified service
     *         in the given city, or an empty list if no service providers are found.
     */
    public List<ServiceProviderDTO> findByHealthServiceIdAndCityName(Long serviceId, String cityName) {
        List<ServiceProvider> serviceProviderList = this.serviceProviderRepository
                .findByHealthServiceIdAndCityName(serviceId, cityName);

        if(serviceProviderList == null) {
            throw new IllegalArgumentException("There's no service providers for this service and this location");
        }

        List<ServiceProviderDTO> serviceProviderDTOS = new ArrayList<>();

        for(ServiceProvider sp : serviceProviderList) {
            serviceProviderDTOS.add(new ServiceProviderDTO(sp));
        }

        return serviceProviderDTOS;
    }

    /**
     * Finds service providers by the description of a health service and the city name.
     *
     * @param serviceDescription The description of the health service.
     * @param cityName The name of the city.
     * @return A list of ServiceProvider objects that match the given service description and city name.
     * @throws NotImplementedException If no service providers are found for the given service description and city name.
     */
    public List<ServiceProvider> findByHealthServiceDescriptionAndCityName(String serviceDescription,
                                                                           String cityName) {
        List<ServiceProvider> serviceProviders = this.serviceProviderRepository.
                findByHealthServiceDescriptionAndCityName(serviceDescription, cityName);

        if(serviceProviders == null) {
            throw new IllegalArgumentException("There's no service providers for this service and this location");
        }

        return serviceProviders;
    }
}
