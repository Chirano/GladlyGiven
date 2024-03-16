import { Component } from '@angular/core';
import { Availability, AvailabilityStatus } from 'src/app/classes/Availability';
import { ServiceProviderDTO } from 'src/app/classes/userProfiles/ServiceProviderDTO';
import { ServiceProviderService } from 'src/app/services/data/javaSpring/serviceProvider/service-provider.service';

@Component({
  selector: 'app-appointment-request',
  templateUrl: './appointment-request.component.html',
  styleUrls: ['./appointment-request.component.scss']
})
export class AppointmentRequestComponent {
  startDateError: string = '';
  startTimeError: string = '';

  availability: Availability = {
    id: 0,
    serviceProviderId: 0,
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    availabilityStatus: AvailabilityStatus.Free, 
  };

  serviceProvider : ServiceProviderDTO | null = null;

  constructor(private serviceProviderService : ServiceProviderService) {}

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

  requestAppointment( id: number, serviceProviderId: number, startDate: string, endDate: string, startTime: string, endTime: string ) : void {
    
  }

  // Exibir mensagem de erro ou destacar visualmente o campo de entrada
  validateDate(): void {
    if (this.availability.startDate > this.availability.endDate) {
      this.startDateError = 'End date must be after start date';
    } else {
      this.startDateError = '';
    }
  }

  // Exibir mensagem de erro ou destacar visualmente o campo de entrada
  validateTime(): void {
    if (this.availability.startTime > this.availability.endTime) {
      this.startTimeError = 'End time must be after start time';
    } else {
      this.startTimeError = '';
    }
  }
}
