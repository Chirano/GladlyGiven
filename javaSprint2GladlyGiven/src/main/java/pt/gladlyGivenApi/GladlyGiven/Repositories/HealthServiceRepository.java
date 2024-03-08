package pt.gladlyGivenApi.GladlyGiven.Repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import pt.gladlyGivenApi.GladlyGiven.Models.HealthServices.HealthService;
import pt.gladlyGivenApi.GladlyGiven.Models.Users.ServiceProvider;

import java.util.List;

public interface HealthServiceRepository extends JpaRepository<HealthService, Long> {

    /*
    Author:Sónia Ribeiro
     */
    @Query(value = "SELECT hs FROM HealthService hs JOIN hs.serviceProviderList sp WHERE sp.id = :serviceProviderId")
    List<HealthService> findByServiceProviderId(@Param("serviceProviderId") Long serviceProviderId);
}
