// Author: Tiago Barracha
// ti.barracha@gmail.com

package pt.gladlyGivenApi.GladlyGiven.Repositories.Users;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import pt.gladlyGivenApi.GladlyGiven.Models.HealthServices.HealthService;
import pt.gladlyGivenApi.GladlyGiven.Models.Users.ServiceProvider;

import java.util.List;
import java.util.Optional;

public interface ServiceProviderRepository extends AppUserRepository<ServiceProvider> {
    Optional<ServiceProvider> findByLicenseNumber(String licenseNumber);

    @Query(value = "SELECT sp FROM ServiceProvider sp JOIN sp.healthServices hs WHERE hs.id = :healthServiceId")
    List<ServiceProvider> findByHealthServiceId(@Param("healthServiceId") Long healthServiceId);


    @Query("SELECT sp FROM ServiceProvider sp " +
            "JOIN sp.healthServices hs " +
            "WHERE hs.id = :id " +
            "AND sp.cityName = :cityName")
    List<ServiceProvider> findByHealthServiceIdAndCityName(@Param("id") Long healthServiceId,
                                                           @Param("cityName") String cityName);


    @Query("SELECT sp FROM ServiceProvider sp " +
            "JOIN sp.healthServices hs " +
            "WHERE hs.description = :healthServiceDescription " +
            "AND sp.cityName = :cityName")
    List<ServiceProvider> findByHealthServiceDescriptionAndCityName(@Param("healthServiceDescription")
                                                                    String healthServiceDescription,
                                                                    @Param("cityName") String cityName);
}
