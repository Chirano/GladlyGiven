package pt.gladlyGivenApi.GladlyGiven.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pt.gladlyGivenApi.GladlyGiven.Models.DTO.ServiceProviderDTO;
import pt.gladlyGivenApi.GladlyGiven.Models.Users.ServiceProvider;
import pt.gladlyGivenApi.GladlyGiven.Services.Users.ServiceProviderService;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/search")
public class SearchController {
    @Autowired
    private ServiceProviderService serviceProviderService;

    /**
     * Retrieves service providers based on the description of a service and a city name.
     *
     * @param serviceDescription The description of the service to search for.
     * @param cityName The name of the city where the service providers are located.
     * @return A ResponseEntity containing a list of ServiceProviderDTO objects representing the service providers
     *         offering the specified service in the given city, or a ResponseEntity with status NO_CONTENT
     *         if no service providers are found.
     */
    @GetMapping("/service/{serviceDescription}/{cityName}")
    public ResponseEntity<List<ServiceProviderDTO>> searchServiceProvidersByServiceDescriptionAndCityName(
            @PathVariable("serviceDescription") String serviceDescription,
            @PathVariable("cityName") String cityName) {

        List<ServiceProvider> serviceProviders = serviceProviderService.findByHealthServiceDescriptionAndCityName(serviceDescription, cityName);

        if (serviceProviders.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        List<ServiceProviderDTO> serviceProviderDTOS = new ArrayList<>();
        for(ServiceProvider sp : serviceProviders) {
            serviceProviderDTOS.add(new ServiceProviderDTO(sp));
        }

        return new ResponseEntity<>(serviceProviderDTOS, HttpStatus.OK);
    }
}
