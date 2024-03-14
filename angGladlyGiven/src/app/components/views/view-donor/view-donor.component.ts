import { Component } from '@angular/core';
import { RouterPaths } from 'src/app/classes/routing/RoutePaths';
import { EventManagerService } from 'src/app/services/events/event-manager.service';

@Component({
  selector: 'app-view-donor',
  templateUrl: './view-donor.component.html',
  styleUrls: ['./view-donor.component.scss']
})
export class ViewDonorComponent {
  
  //Author: Sónia Ribeiro

  /**
 * Emits an event to navigate to the view donation page.
 */

  toCreateDonation(): void{
    EventManagerService.OnRouteEvent.emit(RouterPaths.ViewDonation);
  }

  /**
 * Emits an event to navigate to the view list of donations page.
 */

  toDonationsList(): void {
    EventManagerService.OnRouteEvent.emit(RouterPaths.ViewListDonations);
  }
  
  
}
