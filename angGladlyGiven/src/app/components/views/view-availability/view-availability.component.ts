import { Component } from '@angular/core';
import { Availability, AvailabilityStatus } from 'src/app/classes/Availability';
import { AvailabilityService } from 'src/app/services/availability/availability.service';
import { format } from 'date-fns';

@Component({
  selector: 'app-view-availability',
  templateUrl: './view-availability.component.html',
  styleUrls: ['./view-availability.component.scss']
})
export class ViewAvailabilityComponent {

  startDateError : string = '';
  startTimeError : string = '';


  availability: Availability =  {
    id : 0,
    serviceProviderId : 0,
    startDate : '',
    endDate: '',
    startTime: '',
    endTime: '',
    availabilityStatus: AvailabilityStatus.Free, 
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
      //Formatar a data para dd/MM/yyyy.
      const formattedStartDate = format(new Date(startDate), 'dd/MM/yyyy');
      const formattedEndDate = format(new Date(endDate), 'dd/MM/yyyy');
      
      this.availabilityService.addAvailability({
        id, 
        serviceProviderId,
        startDate: formattedStartDate,
        endDate: formattedEndDate,
        startTime,
        endTime
      } as Availability)
      .subscribe({
        next: (addedAvailability) => {
          this.availability = addedAvailability;
        }
      })
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
