// Author: Tiago Barracha ti.barracha@gmail.com

import { Injectable } from '@angular/core';
import { EventManagerService } from '../events/event-manager.service';
import { AuthDetails } from 'src/app/classes/AuthDetails';
import { RouteEnum } from 'src/app/Enums/RouteEnum';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  // auth details
  authAdmin: AuthDetails = {
    email: "admin",
    password: "admin"
  }

  authServiceProvider: AuthDetails = {
    email: "service",
    password: "service"
  }

  refugeeAuth: AuthDetails = {
    email: "refugee",
    password: "refugee"
  }

  donorAuth: AuthDetails = {
    email: "donor",
    password: "donor"
  }

  constructor() {
    EventManagerService.OnAuthEvent.subscribe(this.AuthFilter.bind(this));
  }

  private AuthFilter(authDetails: AuthDetails) {

    var targetRoute: RouteEnum = RouteEnum.Home;

    switch(authDetails.email) {
      case this.authAdmin.email:
        targetRoute = RouteEnum.ViewAdmin;
        break;
      
      case this.authAdmin.email:
        targetRoute = RouteEnum.ViewAdmin;
        break;
        
      case this.authAdmin.email:
        targetRoute = RouteEnum.ViewAdmin;
        break;
        
      case this.authAdmin.email:
        targetRoute = RouteEnum.ViewAdmin;
        break;
    }

    console.log("Target route:", targetRoute);
  }
}
