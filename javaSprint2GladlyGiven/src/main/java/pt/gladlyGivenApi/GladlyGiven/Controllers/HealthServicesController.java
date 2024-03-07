package pt.gladlyGivenApi.GladlyGiven.Controllers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pt.gladlyGivenApi.GladlyGiven.Models.HealthServices.Category;
import pt.gladlyGivenApi.GladlyGiven.Models.HealthServices.HealthService;
import pt.gladlyGivenApi.GladlyGiven.Services.HealthServiceService;

import java.util.List;

@RestController
@RequestMapping("/api")
public class HealthServicesController {

    @Autowired
    private HealthServiceService service;


    @GetMapping("/healthservices")
    public ResponseEntity<List<HealthService>> getAllHealthServices(){
        List<HealthService> healthServices = service.findAllHealthServices();
        if(healthServices == null){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<>(healthServices, HttpStatus.OK);
    }

    @GetMapping(value = "/healthservice/{id}")
    public ResponseEntity<HealthService> getHealthServiceById(@PathVariable long id){
        HealthService healthService = service.findHealthServiceById(id);

        if(healthService == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(healthService, HttpStatus.OK);
    }

    @PostMapping("/healthservice")
    public ResponseEntity<HealthService> addHealthService(@RequestBody HealthService healthService){
        if(healthService == null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        HealthService newHealthService = service.createHealthService(healthService);
        if(newHealthService == null){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<>(newHealthService, HttpStatus.CREATED);
    }

    @DeleteMapping("/healthservice/id")
    public ResponseEntity<HealthService> deleteHealthService(@RequestParam Long id){
        HealthService healthService = service.findHealthServiceById(id);
        if(healthService == null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        service.deleteHealthService(id);
        return new ResponseEntity<>(healthService, HttpStatus.OK);
    }

    @GetMapping("/categories")
    public ResponseEntity<List<Category>> getAllCategories()
    {
        List<Category> healthServices = service.findAllCategories();
        if(healthServices == null){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<>(healthServices, HttpStatus.OK);
    }

    @GetMapping(value = "/category/{id}", produces = "application/json")
    public ResponseEntity<Category> getCategoryById(@PathVariable Long id){
        Category category = service.findCategoryById(id);
        if(category == null)
        {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(category, HttpStatus.OK);
    }

    @PostMapping("/category")
    public ResponseEntity<Category> addCategory(@RequestBody Category category){
        Category newCategory = service.createCategory(category);

        if(newCategory == null){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<>(newCategory, HttpStatus.CREATED);
    }
}
