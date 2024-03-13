import { Component } from '@angular/core';
import { RouterPaths } from 'src/app/classes/routing/RoutePaths';
import { EventManagerService } from 'src/app/services/events/event-manager.service';

@Component({
  selector: 'app-view-service-provider',
  templateUrl: './view-service-provider.component.html',
  styleUrls: ['./view-service-provider.component.scss']
})
export class ViewServiceProviderComponent {

  toRequestCostSupport() {
    EventManagerService.OnRouteEvent.emit(RouterPaths.ViewCostSupport);
  }

  toCostSupportList() {
    EventManagerService.OnRouteEvent.emit(RouterPaths.ViewListCostsupport);
  }

  toManageServices(){
    EventManagerService.OnRouteEvent.emit(RouterPaths.ViewHealthServicesServiceProvider);
  }
  toServiceRequest() {
    EventManagerService.OnRouteEvent.emit(RouterPaths.ViewServiceRequest);
  }
}
