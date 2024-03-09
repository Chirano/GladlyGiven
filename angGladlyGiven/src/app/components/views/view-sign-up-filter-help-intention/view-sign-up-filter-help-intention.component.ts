import { Component } from '@angular/core';
import { RouterPaths } from 'src/app/classes/routing/RoutePaths';
import { EventManagerService } from 'src/app/services/events/event-manager.service';


@Component({
  selector: 'app-view-sign-up-filter-help-intention',
  templateUrl: './view-sign-up-filter-help-intention.component.html',
  styleUrls: ['./view-sign-up-filter-help-intention.component.scss']
})

export class ViewSignUpFilterHelpIntentionComponent {

  toSignUpRefugee() {
    EventManagerService.OnRouteEvent.emit(RouterPaths.SignUpRefugee);
  }

  toHelpType() {
    EventManagerService.OnRouteEvent.emit(RouterPaths.SignUpHelpType);
  }
}
