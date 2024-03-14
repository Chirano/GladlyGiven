import { Component } from '@angular/core';
import { RouterPaths } from 'src/app/classes/routing/RoutePaths';
import { EventManagerService } from 'src/app/services/events/event-manager.service';
import { RefugeePage } from '../RefugeePage';

@Component({
  selector: 'app-refugee-header',
  templateUrl: './refugee-header.component.html',
  styleUrls: ['./refugee-header.component.scss']
})

export class RefugeeHeaderComponent {
  targetPage: RefugeePage = RefugeePage.Home;

  ToRefugeeHome() {
    this.targetPage = RefugeePage.Home;
    this.pageChanged();
    //EventManagerService.OnRouteEvent.emit(RouterPaths.ViewRefugeeHome);
  }
  
  ToRefugeeSearch() {
    this.targetPage = RefugeePage.Search;
    this.pageChanged();
    //EventManagerService.OnRouteEvent.emit(RouterPaths.ViewRefugeeSearch);
  }

  ToRefugeeHelpRequest() {
    this.targetPage = RefugeePage.Home;
    this.pageChanged();
    //EventManagerService.OnRouteEvent.emit(RouterPaths.ViewRefugeeHelpRequest);
  }

  ToRefugeeAppointments() {
    this.targetPage = RefugeePage.Appointments;
    this.pageChanged();
    //EventManagerService.OnRouteEvent.emit(RouterPaths.ViewRefugeeAppointments);
  }

  ToRefugeeProfile() {
    this.targetPage = RefugeePage.Profile;
    this.pageChanged();
    //EventManagerService.OnRouteEvent.emit(RouterPaths.ViewRefugeeHome);
  }

  private pageChanged() {
    EventManagerService.OnRefugeeViewChanged.emit(this.targetPage);
  }
}
