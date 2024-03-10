import { Component } from '@angular/core';
import { RouterPaths } from 'src/app/classes/routing/RoutePaths';
import { EventManagerService } from 'src/app/services/events/event-manager.service';

@Component({
  selector: 'app-view-sign-up-filter-help-type',
  templateUrl: './view-sign-up-filter-help-type.component.html',
  styleUrls: ['./view-sign-up-filter-help-type.component.scss']
})

export class ViewSignUpFilterHelpTypeComponent {
  toSignUpServiceProvider() {
    EventManagerService.OnRouteEvent.emit(RouterPaths.SignUpServiceProvider);
  }

  toSignUpDonor() {
    EventManagerService.OnRouteEvent.emit(RouterPaths.SignUpDonor);
  }
}
