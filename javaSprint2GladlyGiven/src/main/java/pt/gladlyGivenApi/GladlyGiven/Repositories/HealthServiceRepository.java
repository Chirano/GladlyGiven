package pt.gladlyGivenApi.GladlyGiven.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import pt.gladlyGivenApi.GladlyGiven.Models.HealthServices.HealthService;

public interface HealthServiceRepository extends JpaRepository<HealthService, Long> {
}
