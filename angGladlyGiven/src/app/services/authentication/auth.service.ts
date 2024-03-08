// Author: Tiago Barracha ti.barracha@gmail.com

import { Injectable } from '@angular/core';
import { EventManagerService } from '../events/event-manager.service';
import { SignInDetails } from 'src/app/classes/authentication/SignInDetails';
import { RouteEnum } from 'src/app/enums/RouteEnum';

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
    var targetRoute: RouteEnum = RouteEnum.Home;

    switch(signInDetails.email) {
      case this.authAdmin.email:
        targetRoute = RouteEnum.Admin;
        break;
      
      case this.authServiceProvider.email:
        targetRoute = RouteEnum.ServiceProvider;
        break;
        
      case this.authRefugee.email:
        targetRoute = RouteEnum.Refugee;
        break;
        
      case this.authDonor.email:
        targetRoute = RouteEnum.Donor;
        break;
    }

    console.log("Target route:", targetRoute);
    EventManagerService.OnRouteEvent.emit(targetRoute);
  }

  private SignUpFilter() {

  }
}
