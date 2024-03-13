import { Component } from '@angular/core';
import { RouterPaths } from 'src/app/classes/routing/RoutePaths';
import { EventManagerService } from 'src/app/services/events/event-manager.service';

@Component({
  selector: 'app-view-donor',
  templateUrl: './view-donor.component.html',
  styleUrls: ['./view-donor.component.scss']
})
export class ViewDonorComponent {
  
  toCreateDonation(){
    EventManagerService.OnRouteEvent.emit(RouterPaths.ViewDonation);
  }

  toDonationsList() {
    EventManagerService.OnRouteEvent.emit(RouterPaths.ViewListDonations);
  }
  
  
}
