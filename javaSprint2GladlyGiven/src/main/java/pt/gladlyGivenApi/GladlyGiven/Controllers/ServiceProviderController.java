// Author: Tiago Barrach
// ti.barracha@gmail.com

package pt.gladlyGivenApi.GladlyGiven.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pt.gladlyGivenApi.GladlyGiven.Models.Availability;
import pt.gladlyGivenApi.GladlyGiven.Models.HealthServices.HealthService;
import pt.gladlyGivenApi.GladlyGiven.Models.Users.ServiceProvider;
import pt.gladlyGivenApi.GladlyGiven.Services.HealthServiceService;
import pt.gladlyGivenApi.GladlyGiven.Services.Users.ServiceProviderService;

import java.util.List;

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
    public ResponseEntity<List<ServiceProvider>> getServiceProvidersByHealthService(@PathVariable("id") long id)
    {
        HealthService healthService = healthServiceService.findHealthServiceById(id);
        if(healthService == null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        List<ServiceProvider> serviceProviders = serviceProviderService.findServicesProvidersByHealthService(id);
        if(serviceProviders.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(serviceProviders, HttpStatus.OK);
    }



    // --- create ---
    @PostMapping("/params")
    public ServiceProvider createServiceProviderViaRequestParams(@RequestParam String firstName, @RequestParam String lastName, @RequestParam String email, @RequestParam String gender, @RequestParam String password, @RequestParam String language, @RequestParam String phoneNumber, @RequestParam String nif, @RequestParam String licenseNumber, @RequestParam long categoryId) {
        return serviceProviderService.createServiceProvider(
                firstName,
                lastName,
                email,
                gender,
                password,
                language,
                phoneNumber,
                nif,
                licenseNumber,
                categoryId
        );
    }

    @PostMapping("/body")
    public ServiceProvider createServiceProviderViaRequestBody(@RequestBody ServiceProvider serviceProvider) {
        return serviceProviderService.createServiceProvider(serviceProvider, false);
    }


    // --- update ---
    @PutMapping
    public ServiceProvider updateServiceProvider(@RequestBody ServiceProvider serviceProvider) {
        return serviceProviderService.updateServiceProvider(serviceProvider);
    }

    @PutMapping("/{serviceProviderId}/addservice/{healthServiceId}")
    public ResponseEntity<ServiceProvider> addServiceToServiceProvider(@PathVariable("serviceProviderId") Long serviceProviderId,
                                                      @PathVariable ("healthServiceId") Long serviceId) {

        ServiceProvider serviceProvider = serviceProviderService.findServiceProviderById(serviceProviderId);
        HealthService healthService = healthServiceService.findHealthServiceById(serviceId);

        if(serviceProvider == null || healthService == null ){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        ServiceProvider updateserviceProvider =serviceProviderService.addServicesToServiceProvider(serviceProvider, healthService);
        return new ResponseEntity<>(updateserviceProvider, HttpStatus.OK);
    }



    // Service Provider Availability
    // --------------------------------------------------------------------------------------
    @PostMapping("/availability/{id}")
    public Availability createAvailability(@PathVariable("id") Long serviceProviderId, @RequestBody Availability availability) {
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
