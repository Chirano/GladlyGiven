package pt.gladlyGivenApi.GladlyGiven.Services;

import org.apache.commons.lang3.NotImplementedException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import pt.gladlyGivenApi.GladlyGiven.Enums.AppointmentStatus;
import pt.gladlyGivenApi.GladlyGiven.Models.Appointment;
import pt.gladlyGivenApi.GladlyGiven.Repositories.AppointmentRepository;


@Service
public class AppointmentService {

    @Autowired
    AppointmentRepository appointmentRepository;

    public Page<Appointment> findAllAppointments(int page, int size) {

        Page<Appointment> appointmentPage = this.appointmentRepository.findAll(PageRequest.of(page,size));

        if(!appointmentPage.hasContent()) {
            //TODO: throw new TableIsEmptyException();
            throw new IllegalArgumentException("TableIsEmptyException");
        }

        return appointmentPage;
    }

    public Appointment findAppointmentById(long id) {
        return this.appointmentRepository.findById(id).orElse(null);
    }

    public Page<Appointment> findAllAppointmentsByRefugeeId(long refugeeId, int page, int size) {
        Page<Appointment> appointmentPage = this.appointmentRepository.findAllAppointmentsByRefugeeId(refugeeId,PageRequest.of(page, size));

        if(!appointmentPage.hasContent()) {
            //TODO: throw new TableIsEmptyException();
            throw new IllegalArgumentException("TableIsEmptyException");
        }
        return appointmentPage;
    }

    public Page<Appointment> findAllAppointmentsByServiceProviderId(long serviceProviderId, int page, int size) {
        Page<Appointment> appointmentPage = this.appointmentRepository.findAllAppointmentsByServiceProviderId(serviceProviderId, PageRequest.of(page, size));

        if(!appointmentPage.hasContent()) {
            //TODO: throw new TableIsEmptyException();
            throw new IllegalArgumentException("TableIsEmptyException");
        }
        return appointmentPage;
    }

    public Appointment createAppointment(Appointment appointment) {
        if(appointment == null) {
            throw new NotImplementedException();
        }

        appointment.setStatus(AppointmentStatus.WAITING_VALIDATION);

        //Todo: Obter o refugeeId (Angular?)
        //Todo: Obter o serviceProviderId (Angular?)
        //Todo: Obter o endereço do serviceProvider

        Appointment newAppointment = this.appointmentRepository.save(appointment);

        return newAppointment;
    }

    public Appointment updateAppointment(Appointment appointment) {
        Appointment updatedAppointment = this.appointmentRepository.save(appointment);

        return updatedAppointment;
    }

    public Appointment cancelAppointment(Appointment appointment) {
        appointment.setStatus(AppointmentStatus.CANCELED);
        Appointment a = this.appointmentRepository.save(appointment);

        return a;
    }

}
