// Author: Tiago Barracha ti.barracha@gmail.com

import { Injectable } from '@angular/core';
import { EventManagerService } from '../events/event-manager.service';
import { SignInDetails } from 'src/app/classes/authentication/SignInDetails';
import { RouterPaths } from 'src/app/classes/routing/RoutePaths';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  // auth details
  authAdmin: SignInDetails = {
    email: "admin",
    password: "admin"
  }

  authServiceProvider: SignInDetails = {
    email: "service",
    password: "service"
  }

  authRefugee: SignInDetails = {
    email: "refugee",
    password: "refugee"
  }

  authDonor: SignInDetails = {
    email: "donor",
    password: "donor"
  }

  constructor() {
    EventManagerService.OnSignInEvent.subscribe(this.SignInFilter.bind(this));
    //EventManagerService.OnSingUpEvent.subscribe();
  }

  private SignInFilter(signInDetails: SignInDetails) {

    console.log("sign in recieved")
    var targetRoute: string = RouterPaths.SignIn;

    switch(signInDetails.email) {
      case this.authAdmin.email:
        targetRoute = RouterPaths.ViewAdmin;
        break;
      
      case this.authServiceProvider.email:
        targetRoute = RouterPaths.ViewServiceProvider;
        break;
        
      case this.authRefugee.email:
        targetRoute = RouterPaths.ViewRefugee;
        break;
        
      case this.authDonor.email:
        targetRoute = RouterPaths.ViewDonor;
        break;

      default:
        targetRoute = RouterPaths.SignIn;
        break;
    }

    console.log("Target route:", targetRoute);
    EventManagerService.OnRouteEvent.emit(targetRoute);
  }

  private SignUpFilter() {

  }
}
