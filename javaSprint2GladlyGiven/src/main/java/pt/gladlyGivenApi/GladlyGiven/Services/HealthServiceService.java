package pt.gladlyGivenApi.GladlyGiven.Services;
import org.springframework.beans.factory.annotation.Autowired;
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

    public HealthService createHealthService(HealthService healthService) {
        Category category = findCategoryById(healthService.category.id);

        if(category == null){
            Category newCategory;
            newCategory = new Category(category.description);
        }
        HealthService newHealthService = new HealthService(healthService.id, healthService.description, category);

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
        Category newCategory =  categoryRepository.save(category);
        return newCategory;
    }
}
