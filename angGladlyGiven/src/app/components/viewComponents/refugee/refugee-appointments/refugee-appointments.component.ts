import { Component } from '@angular/core';
import { Appointment } from 'src/app/classes/Appointment';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { RefugeeService } from 'src/app/services/data/javaSpring/refugee/refugee.service';
import { AppointmentDTO, AppointmentStatus } from 'src/app/classes/AppoitmentDTO';

@Component({
  selector: 'app-refugee-appointments',
  templateUrl: './refugee-appointments.component.html',
  styleUrls: ['./refugee-appointments.component.scss']
})
export class RefugeeAppointmentsComponent {

  constructor(private service :RefugeeService)
  {

  }

  appointments : AppointmentDTO[] = [];
  appointment : AppointmentDTO ={
    id: 0,
    serviceProviderId: 0,
    refugeeId: 0,
    healthServiceId: 0,
    appointmentDate: " ",
    address: " ",
    status: AppointmentStatus.WAITING_VALIDATION,
    observations: " ",
    startDate: " ",
    startTime: " ",
    endTime: " ",
  };


  ngOnInit()
  {
    this.loadAppointments();
  }

  loadAppointments()
  {
    this.service.getAppointmentsByRefugeeId(AuthService.SessionContext.userId).subscribe(appointments => this.appointments = appointments)
  }

  cancelAppointment(appointmentId: number){
    this.service.cancelAppointment(appointmentId).subscribe();
  }


}
