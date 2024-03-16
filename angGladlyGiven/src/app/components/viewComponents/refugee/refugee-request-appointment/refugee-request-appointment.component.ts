import { Component } from '@angular/core';
import { ServiceProviderDTO } from 'src/app/classes/userProfiles/ServiceProviderDTO';
import { EventManagerService } from 'src/app/services/events/event-manager.service';
import { RefugeePage } from '../RefugeePage';
import { RefugeeService } from 'src/app/services/data/javaSpring/refugee/refugee.service';
import { RouterPaths } from 'src/app/classes/routing/RoutePaths';
import { ServiceProviderService } from 'src/app/services/data/javaSpring/serviceProvider/service-provider.service';
import { AppointmentRequestStep } from 'src/app/classes/AppointmentRequestStep';
import { Availability } from 'src/app/classes/Availability';

@Component({
  selector: 'app-refugee-request-appointment',
  templateUrl: './refugee-request-appointment.component.html',
  styleUrls: ['./refugee-request-appointment.component.scss']
})

export class RefugeeRequestAppointmentComponent {
  // Variables
  // --------------------------------------------
  serviceProvider: ServiceProviderDTO | null = null;
  availabilities: Availability[] = [];

  requestStep : AppointmentRequestStep = AppointmentRequestStep.View;



  // Constructor & Initialization
  // --------------------------------------------
  constructor(private serviceProviderService : ServiceProviderService) {

  }

  ngOnInit() {
    RefugeeService.currentRefugeePage = RefugeePage.RequestAppointment;
    this.serviceProvider = ServiceProviderService.selectedServiceProvider;
  
    if (this.serviceProvider != null) {
      console.log("Searching for availabilities");

      this.serviceProviderService.getAvailabilitiesByServiceProvider(this.serviceProvider).subscribe({
        next: (availabilities: Availability[]) => {
          this.availabilities = availabilities;
          console.log("Availabilities:", this.availabilities);
        },
        error: (error) => {
          console.error('Error fetching availabilities:', error);
        }
      });
    }
  }



  // Methods
  // --------------------------------------------
  GetServiceProvider() : ServiceProviderDTO {
    this.serviceProvider = ServiceProviderService.selectedServiceProvider
    return this.serviceProvider;
  }

  CanShowAppointmentRequestInput() : boolean {
    return this.requestStep == AppointmentRequestStep.Requesting;
  }

  ShowAppointmentInput() {
    this.requestStep = AppointmentRequestStep.Requesting;
  }

  HideAppointmentInput() {
    this.requestStep = AppointmentRequestStep.View;
  }



  // Redirection
  // --------------------------------------------
  ToRefugeeHome() {
    EventManagerService.OnRouteEvent.emit(RouterPaths.Home);
  }
}
