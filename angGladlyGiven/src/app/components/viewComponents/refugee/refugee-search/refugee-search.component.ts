import { Component, Input } from '@angular/core';
import { ServiceProviderDTO } from 'src/app/classes/userProfiles/ServiceProviderDTO';
import { ServiceProviderService } from 'src/app/services/data/javaSpring/serviceProvider/service-provider.service';
import { EventManagerService } from 'src/app/services/events/event-manager.service';

@Component({
  selector: 'app-refugee-search',
  templateUrl: './refugee-search.component.html',
  styleUrls: ['./refugee-search.component.scss']
})

export class RefugeeSearchComponent {
  // 1) search
  // 2) list service providers
  // 3) 

  @Input() serviceProviders: ServiceProviderDTO[] | undefined;

  constructor(
    private serviceProviderService: ServiceProviderService,
    private eventManagerService: EventManagerService,
    ) {
    EventManagerService.OnRefugeeSearched.subscribe(this.OnRefugeeSearched.bind(this));
  }

  ngOnInit(): void {
    // Initialize the component with all service providers
    this.searchServiceProviders('');
  }

  searchServiceProviders(query: string): void {
    this.serviceProviderService.getServiceProviderByFirstName(query);
  }

  OnRefugeeSearched(query: string) {
    console.log("Query to filter:", query);
  }
}
