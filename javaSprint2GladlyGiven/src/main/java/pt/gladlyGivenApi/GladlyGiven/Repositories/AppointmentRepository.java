package pt.gladlyGivenApi.GladlyGiven.Repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import pt.gladlyGivenApi.GladlyGiven.Models.Appointment;

import java.util.List;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    Page<Appointment> findAllAppointmentsByRefugeeId(Long refugeeId, Pageable pageable);
    Page<Appointment> findAllAppointmentsByServiceProviderId(Long serviceProviderId, Pageable pageable);

    List<Appointment> findAllAppointmentsByServiceProviderId(Long id);
}

