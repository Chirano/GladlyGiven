import { Component, Input } from '@angular/core';
import { format } from 'date-fns';
import { Availability, AvailabilityStatus } from 'src/app/classes/Availability';
import { ServiceProviderDTO } from 'src/app/classes/userProfiles/ServiceProviderDTO';
import { AvailabilityService } from 'src/app/services/availability/availability.service';

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
    availabilityStatus: AvailabilityStatus.Free, 
  };

  availabilities: Availability[] = [];

  constructor(private availabilityService: AvailabilityService) {}
}
