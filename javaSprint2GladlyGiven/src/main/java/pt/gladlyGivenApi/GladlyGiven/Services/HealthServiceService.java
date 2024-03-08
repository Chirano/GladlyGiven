package pt.gladlyGivenApi.GladlyGiven.Services;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import pt.gladlyGivenApi.GladlyGiven.Models.HealthServices.Category;
import pt.gladlyGivenApi.GladlyGiven.Models.HealthServices.HealthService;
import pt.gladlyGivenApi.GladlyGiven.Repositories.CategoryRepository;
import pt.gladlyGivenApi.GladlyGiven.Repositories.HealthServiceRepository;

import java.util.List;

@Service
public class HealthServiceService {

    @Autowired
    HealthServiceRepository healthServiceRepository;

    @Autowired
    CategoryRepository categoryRepository;

    public List<HealthService> findAllHealthServices() {
        return healthServiceRepository.findAll();
    }

    public HealthService findHealthServiceById(Long id)
    {
        return healthServiceRepository.findById(id).orElse(null);
    }

    /*
    Author:Sónia Ribeiro
     */
    public Page<HealthService> findAllHealthServicesByProviderId(long serviceProviderId, int page, int size){

        Page<HealthService> healthServicesByProviderId= healthServiceRepository.findAllHealthServicesByProvider(serviceProviderId, Pageable.unpaged());

        if(!healthServicesByProviderId.hasContent()){
            throw new IllegalArgumentException("There are no health services for this id:" + serviceProviderId);
        }
        return healthServicesByProviderId;
    }

    public HealthService createHealthService(String description, String categoryStr) {

        Category category = findOrCreateCategory(categoryStr);

        HealthService newHealthService = new HealthService(description, category);

        return healthServiceRepository.save(newHealthService);
    }

    public HealthService deleteHealthService(Long id)
    {
        HealthService healthService = healthServiceRepository.findById(id).orElse(null);
        if(healthService == null){
            return null;
        }

        healthServiceRepository.delete(healthService);
        return  healthService;
    }

    public List<Category> findAllCategories(){
       return categoryRepository.findAll();
    }

    public Category findCategoryById(Long id){
        return categoryRepository.findById(id).orElse(null);
    }

    public Category createCategory(Category category){
        return  categoryRepository.save(category);
    }

    public Category findOrCreateCategory(String categoryStr) {
        Category category = categoryRepository.findCategoryByDescription(categoryStr);

        if (category == null) {
            category = new Category(categoryStr);
            category = categoryRepository.save(category);
        }

        return category;
    }
}
