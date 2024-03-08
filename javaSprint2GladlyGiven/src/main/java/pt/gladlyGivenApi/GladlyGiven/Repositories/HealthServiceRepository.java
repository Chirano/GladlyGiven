package pt.gladlyGivenApi.GladlyGiven.Repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import pt.gladlyGivenApi.GladlyGiven.Models.HealthServices.HealthService;

public interface HealthServiceRepository extends JpaRepository<HealthService, Long> {

    /*
    Author:Sónia Ribeiro
     */
//    @Query("SELECT h FROM HealthService h WHERE h.serviceProvider.id = :serviceProviderId ")
//    Page<HealthService> findAllHealthServicesByProvider(Long serviceProviderId, Pageable page);
}
