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

  targetPage: RefugeePage = RefugeePage.Home;

  constructor(
    private eventManager: EventManagerService
  ) {
    EventManagerService.OnRefugeeViewChanged.subscribe(this.targetPageChanged.bind(this));
  }
  
  private targetPageChanged(targetPage: RefugeePage) {
    this.targetPage = targetPage;
  }

  isHome() : boolean {
    return this.targetPage == RefugeePage.Home;
  }

  isSearch() : boolean {
    return this.targetPage == RefugeePage.Search;
  }

  isAppointments() : boolean {
    return this.targetPage == RefugeePage.Appointments;
  //Author: Sónia Ribeiro
  //este método terá de ser colocado no view do apointment
  
  /**
 * Emits an event to navigate to the view review page.
 */

  toCreateReview(): void{
    EventManagerService.OnRouteEvent.emit(RouterPaths.ViewReview);
  }

  isProfile() : boolean {
    return this.targetPage == RefugeePage.Profile;
  }
}