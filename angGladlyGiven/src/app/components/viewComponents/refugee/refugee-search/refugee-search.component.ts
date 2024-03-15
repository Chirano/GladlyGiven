import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ServiceProviderDTO } from 'src/app/classes/userProfiles/ServiceProviderDTO';
import { MockServiceProviders } from 'src/app/classes/userProfiles/mockUsers/MockServiceProviders';
import { ServiceProviderService } from 'src/app/services/data/javaSpring/serviceProvider/service-provider.service';
import { EventManagerService } from 'src/app/services/events/event-manager.service';
import { RefugeePage } from '../RefugeePage';
import { RefugeeService } from 'src/app/services/data/javaSpring/refugee/refugee.service';
import { RefugeeSearch } from 'src/app/classes/RefugeeSearch';

@Component({
  selector: 'app-refugee-search',
  templateUrl: './refugee-search.component.html',
  styleUrls: ['./refugee-search.component.scss']
})

export class RefugeeSearchComponent implements OnChanges {
  // 1) search
  // 2) list service providers
  @Input() previousSearch: string = "";
  serviceProviders: ServiceProviderDTO[] = [];

  constructor(
    private serviceProviderService: ServiceProviderService,
    ) {
    
    EventManagerService.OnRefugeeSearched.subscribe(this.onSearchSubmit.bind(this));
    EventManagerService.OnSelectedServiceProvider.subscribe(this.OnServiceProviderClicked.bind(this));
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.searchServiceProviders(this.previousSearch);
  }

  ngOnInit(): void {
    // Initialize the component with all service providers
    //this.searchServiceProviders(this.previousSearch);
    //console.log("Initialized!");
  }

  searchServiceProviders(query: string): void {
    this.serviceProviderService.getServiceProviderByFirstName(query);
  }

  
  OnRefugeeSearched(query: string) {
    console.log("Query to filter:", query);
    this.serviceProviders = [];
    this.listServiceProviders();
  }

  
  onSearchSubmit(refugeeSearch : RefugeeSearch): void {
    var array = this.serviceProviderService
      .searchServiceProvidersByServiceDescriptionAndCityName(refugeeSearch.serviceDescription, refugeeSearch.cityName)
      .subscribe((serviceProviders: ServiceProviderDTO[]) => {
        this.serviceProviders = serviceProviders;
      });
      console.log("Services providers", array);
  }

  listServiceProviders(): void {
    // Push each mock service provider object into the serviceProviders array
    this.serviceProviders.push(MockServiceProviders.serviceProvider1);
    this.serviceProviders.push(MockServiceProviders.serviceProvider2);
    this.serviceProviders.push(MockServiceProviders.serviceProvider3);
  }

  private OnServiceProviderClicked(serviceProvider: ServiceProviderDTO) {
    if (RefugeeService.targetRefugeePage) {
      console.log("", serviceProvider);
      EventManagerService.OnRefugeeViewChanged.emit(RefugeePage.RequestAppointment);
    }
  }
}
