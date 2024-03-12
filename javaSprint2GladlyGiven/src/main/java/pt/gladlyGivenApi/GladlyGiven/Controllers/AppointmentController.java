package pt.gladlyGivenApi.GladlyGiven.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pt.gladlyGivenApi.GladlyGiven.Models.Appointment;
import pt.gladlyGivenApi.GladlyGiven.Services.AppointmentService;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("/api")
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    @GetMapping(value= "/appointments", produces = "application/json")
    public List<Appointment> findAllAppointments(@RequestParam Optional<Integer> page,
                                                                 @RequestParam Optional<Integer> size) {
        int _page = page.orElse(0);
        int _size = size.orElse(10);

        Page<Appointment> appointmentPage = this.appointmentService.findAllAppointments(_page, _size);

        List<Appointment> appointmentList = new ArrayList<>();

        for(Appointment a : appointmentPage) {
            appointmentList.add(a);
        }

        return appointmentList;
    }

    @GetMapping(value = "/appointment/{id}", produces = "application/json")
    public ResponseEntity<Appointment> findAppointmentById(@PathVariable("id") long id) {
        Appointment a = this.appointmentService.findAppointmentById(id);

        if(a == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(a, HttpStatus.OK);
    }

    @GetMapping(value = "/appointments/refugee/{refugeeId}", produces = "application/json")
    public List<Appointment> findAllAppointmentsByRefugeeId(@PathVariable("refugeeId") long refugeeId,
                                                                      @RequestParam Optional<Integer> page,
                                                                      @RequestParam Optional<Integer> size) {
        int _page = page.orElse(0);
        int _size = size.orElse(10);

        Page<Appointment> appointmentPage = this.appointmentService.findAllAppointmentsByRefugeeId(refugeeId, _page, _size);

        List<Appointment> appointmentList = new ArrayList<>();

        for(Appointment a : appointmentPage) {
            appointmentList.add(a);
        }

        return appointmentList;
    }

    @GetMapping(value = "/appointments/serviceprovider/{serviceProviderId}", produces = "application/json")
    public List<Appointment> findAllAppointmentsByServiceProviderId(@PathVariable("serviceProviderId") long serviceProviderId,
                                                                           @RequestParam Optional<Integer> page,
                                                                           @RequestParam Optional<Integer> size) {
        int _page = page.orElse(0);
        int _size = size.orElse(10);

        Page<Appointment> appointmentPage = this.appointmentService.findAllAppointmentsByServiceProviderId(serviceProviderId, _page, _size);

        List<Appointment> appointmentList = new ArrayList<>();

        for(Appointment a : appointmentPage) {
            appointmentList.add(a);
        }

        return appointmentList;
    }

    @PostMapping(value = "/appointment", consumes = "application/json", produces = "application/json")
    public ResponseEntity<Appointment> createAppointment(@RequestBody Appointment appointment) {
        Appointment newAppointment = this.appointmentService.createAppointment(appointment);

        if(newAppointment == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(newAppointment, HttpStatus.CREATED);
    }

    @PutMapping(value = "/appointment/{id}", consumes = "application/json", produces = "application/json")
    public ResponseEntity<Appointment> cancelAppointment(@PathVariable("id") long id, @RequestBody Appointment ap) {
        if(ap.getId() != id) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        Appointment canceledAppointment = this.appointmentService.cancelAppointment(ap);
        return new ResponseEntity<>(canceledAppointment, HttpStatus.OK);
    }
}
