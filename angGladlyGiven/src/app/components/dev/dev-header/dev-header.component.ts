import { Component } from '@angular/core';
import { RouterPaths } from 'src/app/classes/routing/RoutePaths';
import { EventManagerService } from 'src/app/services/events/event-manager.service';

@Component({
  selector: 'app-dev-header',
  templateUrl: './dev-header.component.html',
  styleUrls: ['./dev-header.component.scss']
})

export class DevHeaderComponent {
  toHome() {
    EventManagerService.OnRouteEvent.emit(RouterPaths.Home);
  }

  toSignIn() {
    EventManagerService.OnRouteEvent.emit(RouterPaths.SignIn);
  }

  toSignUp() {
    EventManagerService.OnRouteEvent.emit(RouterPaths.SignUp);
  }

  toContact() {
    EventManagerService.OnRouteEvent.emit(RouterPaths.ViewContact);
  }

  toFaq() {
    EventManagerService.OnRouteEvent.emit(RouterPaths.ViewFaq);
  }

  toServiceRequest() {
    EventManagerService.OnRouteEvent.emit(RouterPaths.ViewServiceRequest);
  }
}
