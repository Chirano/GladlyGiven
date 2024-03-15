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

    /*@GetMapping("/search/{serviceId}/{cityName}")
    public ResponseEntity<List<ServiceProviderDTO>> searchServiceProvidersByServiceIdAndCityName(
            @RequestParam Long serviceId,
            @RequestParam String cityName) {

        List<ServiceProviderDTO> serviceProviders = serviceProviderService.findByHealthServiceIdAndCityName(serviceId, cityName);

        if (serviceProviders.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<>(serviceProviders, HttpStatus.OK);
    }*/

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
