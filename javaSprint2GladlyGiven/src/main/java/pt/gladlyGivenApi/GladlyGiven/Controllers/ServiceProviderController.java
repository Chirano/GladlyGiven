// Author: Tiago Barrach
// ti.barracha@gmail.com

package pt.gladlyGivenApi.GladlyGiven.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pt.gladlyGivenApi.GladlyGiven.Models.Appointment;
import pt.gladlyGivenApi.GladlyGiven.Models.Availability;
import pt.gladlyGivenApi.GladlyGiven.Models.DTO.HealthServiceDTO;
import pt.gladlyGivenApi.GladlyGiven.Models.DTO.ServiceProviderDTO;
import pt.gladlyGivenApi.GladlyGiven.Models.HealthServices.HealthService;
import pt.gladlyGivenApi.GladlyGiven.Models.Users.ServiceProvider;
import pt.gladlyGivenApi.GladlyGiven.PageUtils;
import pt.gladlyGivenApi.GladlyGiven.Services.HealthServiceService;
import pt.gladlyGivenApi.GladlyGiven.Services.Users.ServiceProviderService;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("/api/serviceProvider")
public class ServiceProviderController {

    // Services
    // --------------------------------------------------------------------------------------
    @Autowired
    private ServiceProviderService serviceProviderService;

    @Autowired
    private HealthServiceService healthServiceService;



    // Service Provider
    // --------------------------------------------------------------------------------------
    // --- get ---
    @GetMapping("/{id}")
    public ServiceProvider getServiceProvider(@PathVariable("id") Long id) {
        return serviceProviderService.findServiceProviderById(id);
    }

    @GetMapping("/email/{email}")
    public ServiceProvider getServiceProviderByEmail(@PathVariable("email") String email) {
        return serviceProviderService.findServiceProviderByEmail(email);
    }

    @GetMapping("/firstname/{name}")
    public ServiceProvider getServiceProviderByFirstName(@PathVariable("name") String firstName) {
        return serviceProviderService.findServiceProviderByFirstName(firstName);
    }

    @GetMapping("/lastname/{name}")
    public ServiceProvider getServiceProviderByLastName(@PathVariable("name") String lastName) {
        return serviceProviderService.findServiceProviderByLastName(lastName);
    }

    @GetMapping("/licensenumber/{licensenumber}")
    public ServiceProvider getServiceProviderByLicenseNumber(@PathVariable("licensenumber") String licenseNumber) {
        return serviceProviderService.findServiceProviderByLicenseNumber(licenseNumber);
    }

    @GetMapping(value = "/healthservice/{id}", produces = "application/json")
    public ResponseEntity<List<ServiceProviderDTO>> getServiceProvidersByHealthService(@PathVariable("id") long id)
    {
        HealthService healthService = healthServiceService.findHealthServiceById(id);
        if(healthService == null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        List<ServiceProvider> serviceProviders = serviceProviderService.findServicesProvidersByHealthService(id);
        if(serviceProviders.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        List<ServiceProviderDTO> serviceProviderDTOS = new ArrayList<>();
        for(ServiceProvider serviceProvider : serviceProviders){
            ServiceProviderDTO serviceProviderDTO = new ServiceProviderDTO(serviceProvider);
            serviceProviderDTOS.add(serviceProviderDTO);
        }
        return new ResponseEntity<>(serviceProviderDTOS, HttpStatus.OK);
    }



    // --- create ---
    @PostMapping("/params")
    public ServiceProvider createServiceProviderViaRequestParams(@RequestParam String firstName, @RequestParam String lastName, @RequestParam String email, @RequestParam String gender, @RequestParam String password, @RequestParam String mainLanguage, @RequestParam String secondLanguage, @RequestParam String phoneNumber, @RequestParam String nif, @RequestParam String licenseNumber, @RequestParam long categoryId) {
        return serviceProviderService.createServiceProvider(
                firstName,
                lastName,
                email,
                gender,
                password,
                mainLanguage,
                secondLanguage,
                phoneNumber,
                nif,
                licenseNumber,
                categoryId
        );
    }

    @PostMapping("/body")
    public ServiceProvider createServiceProviderViaRequestBody(@RequestBody ServiceProviderDTO serviceProvider) {
        return serviceProviderService.createServiceProvider(serviceProvider, false);
    }


    // --- update ---
    @PutMapping
    public ServiceProvider updateServiceProvider(@RequestBody ServiceProvider serviceProvider) {
        return serviceProviderService.updateServiceProvider(serviceProvider);
    }

    @PutMapping("/{serviceProviderId}/addservice/{healthServiceId}")
    public ResponseEntity<List<HealthServiceDTO>> addServiceToServiceProvider(@PathVariable("serviceProviderId") Long serviceProviderId,
                                                                        @PathVariable ("healthServiceId") Long serviceId) {

        ServiceProvider serviceProvider = serviceProviderService.findServiceProviderById(serviceProviderId);
        HealthService healthService = healthServiceService.findHealthServiceById(serviceId);

        if(serviceProvider == null || healthService == null ){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        if(serviceProvider.healthServices.contains(healthService)){
            throw new RuntimeException();
        }

        ServiceProvider updatedServiceProvider = serviceProviderService.addServicesToServiceProvider(serviceProvider,
                                                    healthService);
        List<HealthService> healthServiceList = updatedServiceProvider.healthServices;

        List<HealthServiceDTO> healthServiceDTOS = new ArrayList<>();

        for(HealthService healthService1 : healthServiceList){
            HealthServiceDTO healthServiceDTO = new HealthServiceDTO(healthService1);
            healthServiceDTOS.add(healthServiceDTO);
        }
        return new ResponseEntity<>(healthServiceDTOS, HttpStatus.OK);
    }

    @PutMapping("/{serviceProviderId}/removeservice/{healthServiceId}")
    public ResponseEntity<List<HealthServiceDTO>> removeServiceofServiceProvider(
                                        @PathVariable("serviceProviderId") Long serviceProviderId,
                                        @PathVariable ("healthServiceId") Long serviceId)
    {
        ServiceProvider serviceProvider = serviceProviderService.findServiceProviderById(serviceProviderId);
        HealthService healthService = healthServiceService.findHealthServiceById(serviceId);

        if(serviceProvider == null || healthService == null ){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        if(!serviceProvider.healthServices.contains(healthService)){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        ServiceProvider updatedServiceProvider = serviceProviderService.removeHealthService(serviceProvider, healthService);List<HealthServiceDTO> healthServiceDTOS = new ArrayList<>();
        List<HealthService> healthServiceList = updatedServiceProvider.healthServices;

        for(HealthService healthService1 : healthServiceList){
            HealthServiceDTO healthServiceDTO = new HealthServiceDTO(healthService1);
            healthServiceDTOS.add(healthServiceDTO);
        }
        return new ResponseEntity<>(healthServiceDTOS, HttpStatus.OK);
    }



    // Service Provider Availability
    // --------------------------------------------------------------------------------------
    
    /**
     * Retrieves a paginated list of all availabilities for all service providers.
     * @param page Page number for pagination (optional, defaults to 0).
     * @param size Number of items per page (optional, defaults to 10).
     * @return ResponseEntity with a list of availabilities if found.
     */
    @GetMapping("/availabilities")
    public ResponseEntity<List<Availability>> findAllAvailabilities(@RequestParam Optional<Integer> page,
                                                 @RequestParam Optional<Integer> size) {
        int _page = page.orElse(0);
        int _size = size.orElse(10);

        Page<Availability> availabilityPage = this.serviceProviderService.findAllAvailabilities(_page, _size);

        //Converter page em list.
        List<Availability> availabilityList = PageUtils.pageToList(availabilityPage);

        return new ResponseEntity<>(availabilityList, HttpStatus.OK);
    }

    /**
     * Retrieves a paginated list of availabilities associated with a specific user.
     *
     * @param userId The unique identifier of the user.
     * @param page   Page number for pagination (optional, defaults to 0).
     * @param size   Number of items per page (optional, defaults to 10).
     * @return ResponseEntity with a list of availabilities if found.
     */
    @GetMapping("/availabilities/{userId}")
    public ResponseEntity<List<Availability>> findAllAvailabilitiesByUserId(@PathVariable ("userId") Long userId, @RequestParam Optional<Integer> page,
                                                                    @RequestParam Optional<Integer> size) {
        int _page = page.orElse(0);
        int _size = size.orElse(10);

        Page<Availability> availabilityPage = this.serviceProviderService.findAllAvailabilitiesByUserId(userId, _page, _size);

        //Converter page em list.
        List<Availability> availabilityList = PageUtils.pageToList(availabilityPage);

        return new ResponseEntity<>(availabilityList, HttpStatus.OK);
    }

    @GetMapping("/availabilities/status/{availabilityStatus}")
    public ResponseEntity<List<Availability>> findAvailabilitiesByStatus(@PathVariable ("availabilityStatus") int availabilityStatus,
                                                                         @RequestParam Optional<Integer> page,
                                                                         @RequestParam Optional<Integer> size) {
        int _page = page.orElse(0);
        int _size = size.orElse(10);

        Page<Availability> availabilityPage = this.serviceProviderService.findAvailabilitiesByStatus(availabilityStatus, _page, _size);

        //Converter page em list.
        List<Availability> availabilityList = PageUtils.pageToList(availabilityPage);

        return new ResponseEntity<>(availabilityList, HttpStatus.OK);
    }

    /**
     * Creates a new availability entry for a service provider.
     * @param availability The Availability object representing the availability information.
     * @return The newly created Availability object.
     */
    @PostMapping(value = "/availability", consumes = "application/json", produces = "application/json")
    public Availability createAvailability(@RequestBody Availability availability) {
        return this.serviceProviderService.createAvailability(availability);
    }


    // Service Reviews
    // --------------------------------------------------------------------------------------
    @PostMapping("/review/{id}")
    public ServiceProvider addServiceReview(@PathVariable("id") Long serviceProviderId, @RequestParam Long reviewId) {
        return serviceProviderService.addServiceReview(serviceProviderId, reviewId);
    }

    @PostMapping("/review/{licensenumber}")
    public ServiceProvider addServiceReview(@PathVariable("licensenumber") String licenseNumber, @RequestParam Long reviewId) {
        return serviceProviderService.addServiceReview(licenseNumber, reviewId);
    }

    // TODO: Add Average
}
