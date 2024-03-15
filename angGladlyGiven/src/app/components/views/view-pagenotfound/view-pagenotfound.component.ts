import { Component } from '@angular/core';
import { RouterPaths } from 'src/app/classes/routing/RoutePaths';
import { EventManagerService } from 'src/app/services/events/event-manager.service';

@Component({
  selector: 'app-view-pagenotfound',
  templateUrl: './view-pagenotfound.component.html',
  styleUrls: ['./view-pagenotfound.component.scss']
})
export class ViewPagenotfoundComponent {
  constructor(
    private eventManager : EventManagerService,
  ) {}

  toHome() : void {
    EventManagerService.OnRouteEvent.emit(RouterPaths.Home);
  }
}
