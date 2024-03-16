package pt.gladlyGivenApi.GladlyGiven.Repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import pt.gladlyGivenApi.GladlyGiven.Models.Availability;

import java.util.List;

public interface AvailabilityRepository extends JpaRepository<Availability, Long> {
    List<Availability> findAllByServiceProviderId(Long serviceProviderId);

    Page<Availability> findAllAvailabilitiesByServiceProviderId(Long serviceProviderId, Pageable pageable);

    Page<Availability> findByStartDate(String startDate, Pageable pageable);

    Page<Availability> findByStartTime(String startTime, Pageable pageable);

    Page<Availability> findByEndDate(String endDate, Pageable pageable);

    Page<Availability> findByEndTime(String endTime, Pageable pageable);

    Page<Availability> findByAvailabilityStatus(int availabilityStatus, Pageable pageable);
}
