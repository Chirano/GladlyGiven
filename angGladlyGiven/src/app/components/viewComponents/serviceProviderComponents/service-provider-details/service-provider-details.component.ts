import { Component, Input, SimpleChanges } from '@angular/core';
import { ServiceProviderDTO } from 'src/app/classes/userProfiles/ServiceProviderDTO';
import { ServiceProviderService } from 'src/app/services/data/javaSpring/serviceProvider/service-provider.service';
import { EventManagerService } from 'src/app/services/events/event-manager.service';

@Component({
  selector: 'app-service-provider-details',
  templateUrl: './service-provider-details.component.html',
  styleUrls: ['./service-provider-details.component.scss']
})

export class ServiceProviderDetailsComponent {
  @Input() serviceProvider: ServiceProviderDTO | null = null;

  name: string = 'John Doe';
  category: string = 'Category';
  services: string = 'Service 1, Service 2';
  location: string = 'New York, USA';

  constructor(private serviceProviderService: ServiceProviderService) {

  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateServiceProvider();
  }

  SetServiceProvider(serviceProvider: ServiceProviderDTO) {
    if (serviceProvider == null) {
      return;
    }

    this.name = `${serviceProvider.firstName} ${serviceProvider.lastName}`;
    
    this.serviceProviderService.getCategoryById(serviceProvider.categoryId)
    .subscribe(category => {
      console.log("Category:", category);
      this.category = category?.description || "category not found"; // Set the category value inside the subscription callback
    });

    this.serviceProviderService.getHealthServicesStringByIds(serviceProvider.servicesIds)
    .subscribe(services => {
      // Split the string into an array of services
      const serviceArray = services.split(', ');
      // Take the first three services
      const firstThreeServices = serviceArray.slice(0, 3);
      // Join the first three services back into a string
      this.services = `${firstThreeServices.join(', ')}, ...`;
    });

    this.location = serviceProvider.cityName;
  }

  private updateServiceProvider() {
    if (this.serviceProvider) {
      this.SetServiceProvider(this.serviceProvider);
    }
  }

  OnClickedServiceProvider() {
    //console.log("Service provider clicked");
    if (this.serviceProvider) {
      EventManagerService.OnSelectedServiceProvider.emit(this.serviceProvider);
    }
  }
}
