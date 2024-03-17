package pt.gladlyGivenApi.GladlyGiven.Controllers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.repository.query.Param;
import org.springframework.hateoas.CollectionModel;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pt.gladlyGivenApi.GladlyGiven.Models.DTO.HealthServiceDTO;
import pt.gladlyGivenApi.GladlyGiven.Models.HealthServices.Category;
import pt.gladlyGivenApi.GladlyGiven.Models.HealthServices.HealthService;
import pt.gladlyGivenApi.GladlyGiven.Models.Users.ServiceProvider;
import pt.gladlyGivenApi.GladlyGiven.Services.HealthServiceService;
import pt.gladlyGivenApi.GladlyGiven.Services.Users.ServiceProviderService;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("/api")
public class HealthServicesController {

    /**
     * Autowired field representing the service responsible for managing health services.
     */
    @Autowired
    private HealthServiceService service;

    /**
     * Autowired field representing the service responsible for managing service providers.
     */
    @Autowired
    private ServiceProviderService spService;

    /**
     * Retrieves all health services available in the system.
     *
     * @return ResponseEntity containing a list of services if successful,
     *         or ResponseEntity with HttpStatus.NO_CONTENT if no services are found.
     */
    @GetMapping("/healthservices")
    public ResponseEntity<List<HealthService>> getAllHealthServices(){
        List<HealthService> healthServices = service.findAllHealthServices();
        if(healthServices == null){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<>(healthServices, HttpStatus.OK);
    }

    @GetMapping("/healthservices/category/{id}")
    public ResponseEntity<List<HealthService>> getHealthServicesByCategory(@PathVariable("id") long id){
        List<HealthService> healthServices = service.findHealthServiceByCategory(id);
        if(healthServices == null){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<>(healthServices, HttpStatus.OK);
    }


    /**
     * Retrieves all health services provided by a service provider identified by the given ID.
     *
     * @param serviceProviderId The ID of the service provider whose services are to be retrieved.
     * @return ResponseEntity containing a list of services provided by the service provider with
     *         HttpStatus.OK if successful,or ResponseEntity with HttpStatus.BAD_REQUEST if the
     *         service provider is not found, or ResponseEntity with HttpStatus.NO_CONTENT if no
     *         health services are found for the service provider.
     *
     * Author:Sónia Ribeiro
     */
    @GetMapping(value= "/healthservices/serviceProvider/{serviceProviderId}", produces = "application/json")
    public ResponseEntity<List<HealthServiceDTO>> getAllServicesByProviderId(@PathVariable("serviceProviderId") long serviceProviderId)
    {
        ServiceProvider serviceProvider = spService.findServiceProviderById(serviceProviderId);
        if(serviceProvider == null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        List<HealthService> healthServices = service.findAllHealthServicesByProviderId(serviceProviderId);

        if(healthServices.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        List<HealthServiceDTO> healthServiceDTOS = new ArrayList<>();

        for(HealthService healthService : healthServices){
        HealthServiceDTO healthServiceDTO = new HealthServiceDTO(healthService);
        healthServiceDTOS.add(healthServiceDTO);
        }
       return new ResponseEntity<>(healthServiceDTOS, HttpStatus.OK);
   }

    /**
     * Retrieves a health service by its ID.
     *
     * @param id The ID of the health service to retrieve.
     * @return ResponseEntity containing the health service with HttpStatus.OK if found,
     *         or ResponseEntity with HttpStatus.NOT_FOUND if the health service is not found.
     */
    @GetMapping(value = "/healthservice/{id}")
    public ResponseEntity<HealthService> getHealthServiceById(@PathVariable long id){
        HealthService healthService = service.findHealthServiceById(id);

        if(healthService == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(healthService, HttpStatus.OK);
    }

    /**
     * Adds a new health service.
     *
     * @param description The description of the health service.
     * @param category The category of the health service.
     * @return ResponseEntity containing the newly created health service with HttpStatus.CREATED if creation is successful,
     *         or ResponseEntity with HttpStatus.BAD_REQUEST if the description or category is null,
     *         or ResponseEntity with HttpStatus.NO_CONTENT if the operation fails.
     */
    @PostMapping("/healthservice")
    public ResponseEntity<HealthService> addHealthService(@RequestParam String description, String category){
        if(description == null || category == null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        HealthService newHealthService = service.createHealthService(description, category);
        if(newHealthService == null){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<>(newHealthService, HttpStatus.CREATED);
    }

    /**
     * Deletes a health service by its ID.
     *
     * @param id The ID of the health service to delete.
     * @return ResponseEntity containing the deleted health service with HttpStatus.OK if deletion is successful,
     *         or ResponseEntity with HttpStatus.BAD_REQUEST if the health service is not found.
     */
    @DeleteMapping("/healthservice/id")
    public ResponseEntity<HealthService> deleteHealthService(@RequestParam Long id){
        HealthService healthService = service.findHealthServiceById(id);
        if(healthService == null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        service.deleteHealthService(id);
        return new ResponseEntity<>(healthService, HttpStatus.OK);
    }

    /**
     * Retrieves all categories available in the system.
     *
     * @return ResponseEntity containing a list of categories if successful,
     *         or ResponseEntity with HttpStatus.NO_CONTENT if no categories are found.
     */
    @GetMapping("/categories")
    public ResponseEntity<List<Category>> getAllCategories()
    {
        List<Category> healthServices = service.findAllCategories();
        if(healthServices == null){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<>(healthServices, HttpStatus.OK);
    }

    /**
     * Retrieves a category by its ID.
     *
     * @param id The ID of the category to retrieve.
     * @return ResponseEntity containing the category with HttpStatus.OK if found,
     *         or ResponseEntity with HttpStatus.NOT_FOUND if the category is not found.
     */
    @GetMapping(value = "/category/{id}", produces = "application/json")
    public ResponseEntity<Category> getCategoryById(@PathVariable Long id){
        Category category = service.findCategoryById(id);
        if(category == null)
        {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(category, HttpStatus.OK);
    }

    /**
     * Adds a new category to the system.
     *
     * @param category The category to be added.
     * @return ResponseEntity containing the newly created category with HttpStatus.CREATED if successful,
     *         or ResponseEntity with HttpStatus.NO_CONTENT if the operation fails.
     */
    @PostMapping("/category")
    public ResponseEntity<Category> addCategory(@RequestBody Category category){
        Category newCategory = service.createCategory(category);

        if(newCategory == null){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<>(newCategory, HttpStatus.CREATED);
    }
}
