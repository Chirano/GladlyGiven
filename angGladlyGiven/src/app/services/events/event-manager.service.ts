// Author: Tiago Barracha ti.barracha@gmail.com

import { Injectable, EventEmitter } from '@angular/core';
import { RouteEnum } from 'src/app/enums/RouteEnum';
import { SignInDetails as SignInDetails } from 'src/app/classes/authentication/SignInDetails';
import { SignUpDetails } from 'src/app/classes/authentication/SignUpDetails';
import { RoutingService } from '../routes/routing.service';
import { AuthService } from '../authentication/auth.service';

@Injectable({
  providedIn: 'root'
})

export class EventManagerService {

  // route Events
  static OnRouteEvent: EventEmitter<RouteEnum> = new EventEmitter<RouteEnum>();

  // Auth Events
  static OnSignInEvent: EventEmitter<SignInDetails> = new EventEmitter<SignInDetails>();
  static OnSingUpEvent: EventEmitter<SignUpDetails> = new EventEmitter<SignUpDetails>();

  // add services that have events here
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  constructor(
      private authManager : AuthService,
      private routeService: RoutingService,
    ) {
    
  }
}
