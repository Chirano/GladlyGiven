import { Component } from '@angular/core';
import { ServiceProviderDTO } from 'src/app/classes/userProfiles/ServiceProviderDTO';
import { MockServiceProviders } from 'src/app/classes/userProfiles/mockUsers/MockServiceProviders';
import { EventManagerService } from 'src/app/services/events/event-manager.service';
import { RefugeePage } from '../RefugeePage';

@Component({
  selector: 'app-refugee-request-appointment',
  templateUrl: './refugee-request-appointment.component.html',
  styleUrls: ['./refugee-request-appointment.component.scss']
})

export class RefugeeRequestAppointmentComponent {
  serviceProvider: ServiceProviderDTO = MockServiceProviders.serviceProvider1;

  constructor() {
    EventManagerService.OnSelectedServiceProvider.subscribe(this.OnServiceProviderClicked.bind(this));
  }

  private OnServiceProviderClicked(serviceProvider: ServiceProviderDTO) {

  }

  ToRefugeeHome() {
    EventManagerService.OnRefugeeViewChanged.emit(RefugeePage.Home);
  }
}
