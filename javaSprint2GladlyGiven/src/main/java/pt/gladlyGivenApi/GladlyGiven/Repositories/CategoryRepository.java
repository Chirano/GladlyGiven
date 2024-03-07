package pt.gladlyGivenApi.GladlyGiven.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import pt.gladlyGivenApi.GladlyGiven.Models.HealthServices.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {

}
