import { Component } from '@angular/core';
import { RouterPaths } from 'src/app/classes/routing/RoutePaths';
import { EventManagerService } from 'src/app/services/events/event-manager.service';
import { RefugeePage } from '../../viewComponents/refugee/RefugeePage';

@Component({
  selector: 'app-view-refugee',
  templateUrl: './view-refugee.component.html',
  styleUrls: ['./view-refugee.component.scss']
})

export class ViewRefugeeComponent {

  static targetRefugeePage: RefugeePage = RefugeePage.Home;

  constructor(
    private eventManager: EventManagerService
  ) {
    EventManagerService.OnRefugeeViewChanged.subscribe(this.targetPageChanged.bind(this));
  }
  
  private targetPageChanged(targetPage: RefugeePage) {
    ViewRefugeeComponent.targetRefugeePage = targetPage;
  }

  isHome() : boolean {
    return ViewRefugeeComponent.targetRefugeePage == RefugeePage.Home;
  }

  isSearch() : boolean {
    return ViewRefugeeComponent.targetRefugeePage == RefugeePage.Search;
  }

  isAppointments() : boolean {
    return ViewRefugeeComponent.targetRefugeePage == RefugeePage.Appointments;
  }

  isRequestAppointment() : boolean {
    return ViewRefugeeComponent.targetRefugeePage == RefugeePage.RequestAppointment;
  }

  isProfile() : boolean {
    return ViewRefugeeComponent.targetRefugeePage == RefugeePage.Profile;
  }

  //Author: Sónia Ribeiro
  //este método terá de ser colocado no view do apointment
  
  /**
 * Emits an event to navigate to the view review page.
 */
  toCreateReview(): void{
    EventManagerService.OnRouteEvent.emit(RouterPaths.ViewReview);
  }
}
