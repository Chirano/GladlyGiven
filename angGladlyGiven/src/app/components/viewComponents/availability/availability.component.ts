import { Component, Input } from '@angular/core';
import { Availability } from 'src/app/classes/Availability';
import { ServiceProviderDTO } from 'src/app/classes/userProfiles/ServiceProviderDTO';
import { ServiceProviderService } from 'src/app/services/data/javaSpring/serviceProvider/service-provider.service';

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

  serviceProvider : ServiceProviderDTO | null = null;

  serviceProviderName : string = "Service Provider Name";
  
  constructor(private serviceProviderService : ServiceProviderService) {
    
  }

  ngOnInit() {
    this.serviceProviderService.getServiceProviderById(this.availability.serviceProviderId.toString()).subscribe({
      next: (serviceProvider: ServiceProviderDTO) => {
        this.serviceProvider = serviceProvider;
        console.log("Availability Service Provider:", serviceProvider);
      },
      error: (error: any) => {
        console.error('Error fetching service provider:', error);
      }
    }); 
  }

  ngOnChanged() {

  }
}
