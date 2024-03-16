import { Component, Input } from '@angular/core';
import { format } from 'date-fns';
import { Availability } from 'src/app/classes/Availability';
import { ServiceProviderDTO } from 'src/app/classes/userProfiles/ServiceProviderDTO';
import { AvailabilityService } from 'src/app/services/availability/availability.service';
import { ServiceProviderService } from 'src/app/services/data/javaSpring/serviceProvider/service-provider.service';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})

export class AppointmentComponent {
  startDateError: string = '';
  startTimeError: string = '';

  serviceProvider: ServiceProviderDTO | null = null;
  
  availability: Availability = {
    id: 0,
    serviceProviderId: 0,
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
  };

  availabilities: Availability[] = [];

  constructor(private availabilityService: AvailabilityService) {}
}
