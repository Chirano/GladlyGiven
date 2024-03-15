import { Component } from '@angular/core';
import { RefugeeSearch } from 'src/app/classes/RefugeeSearch';
import { ServiceProviderService } from 'src/app/services/data/javaSpring/serviceProvider/service-provider.service';
import { EventManagerService } from 'src/app/services/events/event-manager.service';

@Component({
  selector: 'app-refugee-searchbar',
  templateUrl: './refugee-searchbar.component.html',
  styleUrls: ['./refugee-searchbar.component.scss']
})

export class RefugeeSearchbarComponent {

  constructor(
    private serviceProviderService : ServiceProviderService,
    private eventManager: EventManagerService
  ) {

  }

  onSearchSubmit(serviceDescription: string, cityName : string) {
    if (!serviceDescription || serviceDescription.trim() === '' || !cityName || cityName.trim() === '') {
      console.log("Entrou no ciclo if")
      return;
    }

    console.log("searched for:", serviceDescription, cityName);
    EventManagerService.OnRefugeeSearched.emit({serviceDescription, cityName} as RefugeeSearch);
  }
}
