import { Component } from '@angular/core';
import { format } from 'date-fns';
import { Availability, AvailabilityStatus } from 'src/app/classes/Availability';
import { ServiceProviderDTO } from 'src/app/classes/userProfiles/ServiceProviderDTO';
import { AvailabilityService } from 'src/app/services/availability/availability.service';
import { ServiceProviderService } from 'src/app/services/data/javaSpring/serviceProvider/service-provider.service';

@Component({
  selector: 'app-availability-input',
  templateUrl: './availability-input.component.html',
  styleUrls: ['./availability-input.component.scss'],
})
export class AvailabilityInputComponent {
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

  availabilities: Availability[] = [];

  constructor(private availabilityService: AvailabilityService) {}

  addAvailability(
    id: number,
    serviceProviderId: number,
    startDate: string,
    endDate: string,
    startTime: string,
    endTime: string
  ): void {
    //Formatar a data para dd/MM/yyyy.
    const formattedStartDate = format(new Date(startDate), 'yyyy-MM-dd');
    const formattedEndDate = format(new Date(endDate), 'yyyy-MM-dd');
    const serviceProvider : ServiceProviderDTO = ServiceProviderService.selectedServiceProvider;
    

    this.availabilityService
      .addAvailability({
        id,
        serviceProviderId: serviceProvider.id,
        startDate: formattedStartDate,
        endDate: formattedEndDate,
        startTime,
        endTime,
      } as Availability)
      .subscribe({
        next: (addedAvailability) => {
          this.availability = addedAvailability;
          console.log("Added availability:", addedAvailability);
        },
      });
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

  // Format the date to "yyyy-MM-dd" format
  private formatDate(dateString: string): string {
    const parts = dateString.split('/');
    if (parts.length === 3) {
      return parts[2] + '-' + parts[1] + '-' + parts[0];
    }
    return '';
  }
}
