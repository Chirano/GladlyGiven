import { Component, Input } from '@angular/core';
import { Availability } from 'src/app/classes/Availability';
import { ServiceProviderDTO } from 'src/app/classes/userProfiles/ServiceProviderDTO';

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
    endTime: '00:00'
  }

  serviceProvider : ServiceProviderDTO | undefined;

  serviceProviderName : string = "Service Provider Name";

  ngOnInit() {

  }

  ngOnChanged() {

  }
}
