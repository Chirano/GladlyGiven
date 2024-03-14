import { Component, Input, SimpleChanges } from '@angular/core';
import { ServiceProviderDTO } from 'src/app/classes/userProfiles/ServiceProviderDTO';
import { EventManagerService } from 'src/app/services/events/event-manager.service';

@Component({
  selector: 'app-service-provider-details',
  templateUrl: './service-provider-details.component.html',
  styleUrls: ['./service-provider-details.component.scss']
})

export class ServiceProviderDetailsComponent {
  @Input() serviceProvider: ServiceProviderDTO | undefined;

  name: string = 'John Doe';
  category: string = 'Category';
  services: string = 'Service 1, Service 2';
  location: string = 'New York, USA';

  ngOnChanges(changes: SimpleChanges): void {
    this.updateServiceProvider();
  }

  SetServiceProvider(serviceProvider: ServiceProviderDTO) {
    if (serviceProvider == null) {
      return;
    }

    this.name = serviceProvider.firstName + " " + serviceProvider.lastName;
    this.category = serviceProvider.categoryId.toString();
    this.services = serviceProvider.servicesIds?.toString() || "No services found";
    this.location = serviceProvider.email;
  }

  private updateServiceProvider() {
    if (this.serviceProvider) {
      this.SetServiceProvider(this.serviceProvider);
    }
  }

  OnClickedServiceProvider() {
    EventManagerService.OnSelectedServiceProvider.emit(this.serviceProvider);
  }
}
