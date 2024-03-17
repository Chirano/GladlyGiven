package pt.gladlyGivenApi.GladlyGiven.Services;

import org.apache.commons.lang3.NotImplementedException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import pt.gladlyGivenApi.GladlyGiven.Enums.AppointmentStatus;
import pt.gladlyGivenApi.GladlyGiven.Models.Appointment;
import pt.gladlyGivenApi.GladlyGiven.Models.Users.ServiceProvider;
import pt.gladlyGivenApi.GladlyGiven.Repositories.AppointmentRepository;
import pt.gladlyGivenApi.GladlyGiven.Repositories.Users.ServiceProviderRepository;

import java.util.List;


@Service
public class AppointmentService {

    @Autowired
    AppointmentRepository appointmentRepository;


    /**
     * Retrieves a paginated list of appointments from the repository.
     * @param page The page number of the result set to retrieve.
     * @param size The number of elements per page
     * @return A list of appointments from the repository
     */
    public Page<Appointment> findAllAppointments(int page, int size) {

        Page<Appointment> appointmentPage = this.appointmentRepository.findAll(PageRequest.of(page,size));

        if(!appointmentPage.hasContent()) {
            //TODO: throw new TableIsEmptyException();
            throw new IllegalArgumentException("TableIsEmptyException");
        }

        return appointmentPage;
    }


    /**
     * Retrieves an appointment by its unique identifier
     * @param id The unique identifier of the appointment to be retrieved
     * @return The found appointment or an empty optional if no appointment is found.
     */
    public Appointment findAppointmentById(long id) {
        return this.appointmentRepository.findById(id).orElse(null);
    }


    /**
     * Retrieves a paginated list of appointments associated with a specific refugee based on their unique identifier.
     * @param refugeeId The unique identifier of the refugee for whom appointments are to be retrieved.
     * @param page The page number of the result set to retrieve
     * @param size The number of elements per page
     * @return The list of appointments associated with the specified refugee.
     */
    public Page<Appointment> findAllAppointmentsByRefugeeId(long refugeeId, int page, int size) {
        Page<Appointment> appointmentPage = this.appointmentRepository.findAllAppointmentsByRefugeeId(refugeeId,PageRequest.of(page, size));

        if(!appointmentPage.hasContent()) {
            //TODO: throw new TableIsEmptyException();
            throw new IllegalArgumentException("TableIsEmptyException");
        }
        return appointmentPage;
    }

    /**
     * Retrieves a paginated list of appointments associated with a specific service provider based on their unique identifier.
     * @param serviceProviderId The unique identifier of the service provider for whom appointments are to be retrieved.
     * @param page The page number of the result set to retrieve
     * @param size The number of elements per page
     * @return The list of appointments associated with the specified service provider.
     */
    public Page<Appointment> findAllAppointmentsByServiceProviderId(long serviceProviderId, int page, int size) {
        Page<Appointment> appointmentPage = this.appointmentRepository.findAllAppointmentsByServiceProviderId(serviceProviderId, PageRequest.of(page, size));

        if(!appointmentPage.hasContent()) {
            //TODO: throw new TableIsEmptyException();
            throw new IllegalArgumentException("TableIsEmptyException");
        }
        return appointmentPage;
    }


    /**
     * Retrieves a list of appointments associated with a specific service provider.
     *
     * @param serviceProviderId The unique identifier of the service provider.
     * @return A list of appointment objects representing appointments linked to the specified service provider.
     */
    public List<Appointment> findAllAppointmentsByServiceProviderId(long serviceProviderId){
        return this.appointmentRepository.findAllAppointmentsByServiceProviderId(serviceProviderId);
    }


    /**
     * Creates a new appointment and saves it to the repository with the status set to waiting validation
     * @param appointment The appointment object containing the details of the appointment to be created.
     * @return The created appointment with updated information, including the assigned status and any additional generated fields.
     */
    public Appointment createAppointment(Appointment appointment) {
        if(appointment == null) {
            System.out.println("Tried to create emtpy appointment");
            return new Appointment();
        }

        appointment.setStatus(AppointmentStatus.WAITING_VALIDATION);

        //Todo: Obter o refugeeId (Angular?)
        //Todo: Obter o serviceProviderId (Angular?)


        Appointment newAppointment = this.appointmentRepository.save(appointment);

        return newAppointment;
    }

    /**
     * Updates an existing appointment by saving the provided appointment object to the repository.
     * @param appointment The appointment object containing the updated details to be saved.
     * @return The updated appointment object reflecting changes made and saved in the repository.
     */
    public Appointment updateAppointment(Appointment appointment) {
        Appointment updatedAppointment = this.appointmentRepository.save(appointment);

        return updatedAppointment;
    }

    /**
     * Cancels an existing appointment by updating its status to canceled and saving the changes to the repository.
     * @param id The appointment id object to be canceled.
     * @return The updated appointment object reflecting the cancellation status, saved in the repository.
     */
    public Appointment cancelAppointment(long id) {
        Appointment a = appointmentRepository.findById(id).orElse(null);
        if(a == null){
            return null;
        }
        a.setStatus(AppointmentStatus.CANCELED);
        a = this.appointmentRepository.save(a);
        return a;
    }


    /**
     * Retrieves the total number of appointments.
     *
     * @return The total number of appointments.
     */
    public int getTotalAppointments(){
        return appointmentRepository.countTotalAppointments();
    }

}
