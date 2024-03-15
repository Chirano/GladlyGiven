import { ChangeDetectorRef, Component } from '@angular/core';
import { ServiceProviderDTO } from 'src/app/classes/userProfiles/ServiceProviderDTO';
import { MockServiceProviders } from 'src/app/classes/userProfiles/mockUsers/MockServiceProviders';
import { EventManagerService } from 'src/app/services/events/event-manager.service';
import { RefugeePage } from '../RefugeePage';
import { RefugeeService } from 'src/app/services/data/javaSpring/refugee/refugee.service';
import { RouterPaths } from 'src/app/classes/routing/RoutePaths';
import { ServiceProviderService } from 'src/app/services/data/javaSpring/serviceProvider/service-provider.service';
import { AppointmentRequestStep } from 'src/app/classes/AppointmentRequestStep';

@Component({
  selector: 'app-refugee-request-appointment',
  templateUrl: './refugee-request-appointment.component.html',
  styleUrls: ['./refugee-request-appointment.component.scss']
})

export class RefugeeRequestAppointmentComponent {
  serviceProvider: ServiceProviderDTO | undefined;
  requestStep : AppointmentRequestStep = AppointmentRequestStep.View;

  constructor(private changeDetector: ChangeDetectorRef) {
    EventManagerService.OnSelectedServiceProvider.subscribe(this.OnServiceProviderClicked.bind(this));
  }

  ngOnInit() {
    RefugeeService.currentRefugeePage = RefugeePage.RequestAppointment;
  }

  private OnServiceProviderClicked(clickedServiceProvider: ServiceProviderDTO) {
    console.log("Clicked:", clickedServiceProvider);
    this.serviceProvider = clickedServiceProvider;
    this.changeDetector.detectChanges();
  }

  GetServiceProvider() : ServiceProviderDTO {
    return ServiceProviderService.selectedServiceProvider;
  }

  ToRefugeeHome() {
    //EventManagerService.OnRefugeeViewChanged.emit(RefugeePage.Search);
    EventManagerService.OnRouteEvent.emit(RouterPaths.Home);
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
}
