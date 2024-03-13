package pt.gladlyGivenApi.GladlyGiven.Repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import pt.gladlyGivenApi.GladlyGiven.Models.Availability;

public interface AvailabilityRepository extends JpaRepository<Availability, Long> {
    Page<Availability> findAllAvailabilitiesByServiceProviderId(Long serviceProviderId, Pageable pageable);

    Page<Availability> findByStartDate(String startDate, Pageable pageable);

    Page<Availability> findByStartTime(String startTime, Pageable pageable);

    Page<Availability> findByEndDate(String endDate, Pageable pageable);

    Page<Availability> findByEndTime(String endTime, Pageable pageable);
}
