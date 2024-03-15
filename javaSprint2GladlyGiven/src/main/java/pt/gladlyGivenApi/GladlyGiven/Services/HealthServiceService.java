package pt.gladlyGivenApi.GladlyGiven.Services;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import pt.gladlyGivenApi.GladlyGiven.Models.HealthServices.Category;
import pt.gladlyGivenApi.GladlyGiven.Models.HealthServices.HealthService;
import pt.gladlyGivenApi.GladlyGiven.Models.Users.ServiceProvider;
import pt.gladlyGivenApi.GladlyGiven.Repositories.CategoryRepository;
import pt.gladlyGivenApi.GladlyGiven.Repositories.HealthServiceRepository;
import pt.gladlyGivenApi.GladlyGiven.Repositories.Users.ServiceProviderRepository;

import java.util.List;

@Service
public class HealthServiceService {

    @Autowired
    HealthServiceRepository healthServiceRepository;

    @Autowired
    CategoryRepository categoryRepository;

    @Autowired
    ServiceProviderRepository serviceProviderRepository;

    /**
     * Retrieves a list of all health services available.
     *
     * @return A list of all health services in the system.
     */
    public List<HealthService> findAllHealthServices() {
        return healthServiceRepository.findAll();
    }

    /**
     * Retrieves a health service by its ID.
     *
     * @param id The ID of the health service to retrieve.
     * @return The health service with the specified ID, or null if not found.
     */
    public HealthService findHealthServiceById(Long id)
    {
        return healthServiceRepository.findById(id).orElse(null);
    }


    /**
     * Retrieves all health services associated with a specific service provider.
     *
     * @param serviceProviderId The ID of the service provider.
     * @return A list of health services associated with the specified service provider.
     *
     * Author:Sónia Ribeiro
     */
    public List<HealthService> findAllHealthServicesByProviderId(long serviceProviderId){

        return healthServiceRepository.findByServiceProviderId(serviceProviderId);
    }

    /**
     * Creates a new health service with the provided description and category.
     *
     * @param description The description of the health service.
     * @param categoryStr The category string of the health service.
     * @return The newly created health service.
     */
    public HealthService createHealthService(String description, String categoryStr) {

        Category category = findOrCreateCategory(categoryStr);
        HealthService newHealthService = new HealthService(description, category);

        return healthServiceRepository.save(newHealthService);
    }

    /**
     * Deletes the health service with the specified ID.
     *
     * @param id The ID of the health service to delete.
     * @return The deleted health service, or null if no health service with the specified ID is found.
     */
    public HealthService deleteHealthService(Long id)
    {
        HealthService healthService = healthServiceRepository.findById(id).orElse(null);
        if(healthService == null){
            return null;
        }

        healthServiceRepository.delete(healthService);
        return  healthService;
    }

    /**
     * Retrieves all categories from the repository.
     *
     * @return A list containing all categories stored in the repository.
     */
    public List<Category> findAllCategories(){
       return categoryRepository.findAll();
    }

    /**
     * Finds a category by its ID.
     *
     * @param id The ID of the category to find.
     * @return The category with the specified ID if found, or null if not found.
     */
    public Category findCategoryById(Long id){
        return categoryRepository.findById(id).orElse(null);
    }

    /**
     * Creates a new category.
     *
     * @param category The category object to be created.
     * @return The created category object.
     */
    public Category createCategory(Category category){
        return  categoryRepository.save(category);
    }

    /**
     * Finds or creates a category based on the provided category description.
     * If a category with the given description already exists, it is returned.
     * Otherwise, a new category is created with the provided description and saved to the repository.
     *
     * @param categoryStr The description of the category.
     * @return The found or created category object.
     */
    public Category findOrCreateCategory(String categoryStr) {
        Category category = categoryRepository.findCategoryByDescription(categoryStr);

        if (category == null) {
            category = new Category(categoryStr);
            category = categoryRepository.save(category);
        }

        return category;
    }
}
