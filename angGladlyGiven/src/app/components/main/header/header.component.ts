import { Component } from '@angular/core';
import { RouterPaths } from 'src/app/classes/routing/RoutePaths';
import { UserType } from 'src/app/classes/userProfiles/UserType';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { EventManagerService } from 'src/app/services/events/event-manager.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  
  toHome() {
    EventManagerService.OnRouteEvent.emit(RouterPaths.Home);
  }

  toSignIn() {
    EventManagerService.OnRouteEvent.emit(RouterPaths.SignIn);
  }

  toSignUp() {
    EventManagerService.OnRouteEvent.emit(RouterPaths.SignUp);
  }

  toLogOut() {
    EventManagerService.OnLogout.emit();
  }
  
  // User Filter
  // ---------------------------------------------------------

  isGuest() {
    return AuthService.SessionContext.userType === UserType.None;
  }

  isNotGuest() {
    return AuthService.SessionContext.userType != UserType.None;
  }

  isAdmin(): boolean {
    return AuthService.SessionContext.userType === UserType.Admin;
  }

  isRefugee(): boolean {
    return AuthService.SessionContext.userType === UserType.Refugee;
  }

  isServiceProvider(): boolean {
    return AuthService.SessionContext.userType === UserType.ServiceProvider;
  }

  isDonor(): boolean {
    return AuthService.SessionContext.userType === UserType.Donor;
  }
}
