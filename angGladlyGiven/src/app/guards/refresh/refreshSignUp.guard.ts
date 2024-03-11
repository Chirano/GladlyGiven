import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, NavigationStart } from '@angular/router';
import { AuthState } from 'src/app/classes/authentication/AuthState';
import { RouterPaths } from 'src/app/classes/routing/RoutePaths';
import { AuthService } from 'src/app/services/authentication/auth.service';

@Injectable({
  providedIn: 'root'
})

export class RefreshSignUpGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    // check if user is signing up
    if (AuthService.authState == AuthState.SignUp) {
      return true;
    }

    // List of routes that are refreshable
    const refreshableRoutes = [
      RouterPaths.SignUpHelpIntention,
      RouterPaths.SignUpHelpType,
      RouterPaths.SignUpRefugee,
      RouterPaths.SignUpServiceProvider,
      RouterPaths.SignUpDonor,
    ];

    // Split URL and get the last part which contains the routerPath
    const currentRoutePath = state.url.split('/')[1];
    const shouldReroute = refreshableRoutes.includes(currentRoutePath);

    if (shouldReroute) {
      console.log("sign up guard activated!");
      this.router.navigate([RouterPaths.Home]);
      return false;
    }

    return true;
  }
}
