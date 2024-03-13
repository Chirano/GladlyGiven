import { Component } from '@angular/core';
import { Availability } from 'src/app/classes/Availability';
import { AvailabilityService } from 'src/app/services/availability/availability.service';

@Component({
  selector: 'app-view-availability',
  templateUrl: './view-availability.component.html',
  styleUrls: ['./view-availability.component.scss']
})
export class ViewAvailabilityComponent {

  availability: Availability =  {
    id : 0,
    serviceProviderId : 0,
    startDate : '',
    endDate: '',
    startTime: '',
    endTime: ''
  }

  availabilities: Availability[] = [];

  constructor(
    private availabilityService: AvailabilityService
  ) {}

  addAvailability(id : number,
    serviceProviderId : number,
    startDate : string,
    endDate: string,
    startTime: string,
    endTime: string) : void {
    this.availabilityService.addAvailability({
      id, 
      serviceProviderId,
      startDate,
      endDate,
      startTime,
      endTime
    } as Availability)
    .subscribe({
      next: (addedAvailability) => {
        this.availability = addedAvailability;
      }
    })
  }

}
