import { Component, Input } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { Appointment } from 'src/app/classes/Appointment';
import { AppointmentDTO, AppointmentStatus } from 'src/app/classes/AppoitmentDTO';
import { Availability, AvailabilityStatus } from 'src/app/classes/Availability';
import { ServiceProviderDTO } from 'src/app/classes/userProfiles/ServiceProviderDTO';
import { UserType } from 'src/app/classes/userProfiles/UserType';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { ServiceProviderService } from 'src/app/services/data/javaSpring/serviceProvider/service-provider.service';

@Component({
  selector: 'app-availability',
  templateUrl: './availability.component.html',
  styleUrls: ['./availability.component.scss']
})
export class AvailabilityComponent {
  @Input() availability: Availability =  {
    id : 0,
    serviceProviderId : 0,
    startDate : '01/01/2024',
    endDate: '01/01/2024',
    startTime: '00:00',
    endTime: '00:00',
    availabilityStatus: AvailabilityStatus.Free, 
  }

  serviceProvider : ServiceProviderDTO | null = null;

  serviceProviderName : string = "Service Provider Name";
  
  constructor(private serviceProviderService : ServiceProviderService) {
    
  }

  ngOnInit() {
    this.serviceProviderService.getServiceProviderById(this.availability.serviceProviderId.toString()).subscribe({
      next: (serviceProvider: ServiceProviderDTO) => {
        this.serviceProvider = serviceProvider;
        console.log("Availability Service Provider:", serviceProvider);
      },
      error: (error: any) => {
        console.error('Error fetching service provider:', error);
      }
    }); 
  }

  ngOnChanged() {

  }

  // Refugee Button Clicks
  // ---------------------------------------------------------
  RefugeeRequestsAppointment() {
    console.log("Refugee Requested Appointment", this.serviceProvider, this.availability);

    if (this.serviceProvider != null) {
      const appointment : AppointmentDTO = {
        id: 0,
        serviceProviderId: this.serviceProvider.id,
        refugeeId: AuthService.SessionContext.userId,
        healthServiceId: this.serviceProvider.categoryId,
        appointmentDate: this.availability.startDate,
        address: this.serviceProvider.cityName,
        status: AppointmentStatus.WAITING_VALIDATION,
        observations: "",
        startDate: this.availability.startDate,
        startTime: this.availability.startTime,
        endTime: this.availability.endTime,
      }

      console.log('Appointment DTO:', appointment); // Log the appointment DTO before sending
        this.serviceProviderService.createAppointment(appointment).subscribe(
            response => console.log('Appointment created successfully:', response),
            error => console.error('Error creating appointment:', error)
        );
    }
  }

  RefugeeCancelsAppointment() {
    console.log("Canceled");
  }


  // Availability Status
  // ---------------------------------------------------------
  isFree() {
    return this.availability.availabilityStatus == AvailabilityStatus.Free;
  }


  // User Filter
  // ---------------------------------------------------------

  isGuest() {
    return AuthService.SessionContext.userType === UserType.None;
  }

  isNotGuest() {
    return AuthService.SessionContext.userType != UserType.None;
  }

  isAdmin(): boolean {
    return AuthService.SessionContext.userType === UserType.Admin;
  }

  isRefugee(): boolean {
    return AuthService.SessionContext.userType === UserType.Refugee;
  }

  isServiceProvider(): boolean {
    return AuthService.SessionContext.userType === UserType.ServiceProvider;
  }

  isDonor(): boolean {
    return AuthService.SessionContext.userType === UserType.Donor;
  }
}
