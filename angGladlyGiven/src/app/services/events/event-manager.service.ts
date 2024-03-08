// Author: Tiago Barracha ti.barracha@gmail.com

import { Injectable, EventEmitter } from '@angular/core';
import { SignInDetails as SignInDetails } from 'src/app/classes/authentication/SignInDetails';
import { SignUpDetails } from 'src/app/classes/authentication/SignUpDetails';
import { RoutingService } from '../routes/routing.service';
import { AuthService } from '../authentication/auth.service';

@Injectable({
  providedIn: 'root'
})

export class EventManagerService {

  // route Events
  static OnRouteEvent: EventEmitter<string> = new EventEmitter<string>();
  static OnBackEvent: EventEmitter<void> = new EventEmitter<void>();

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
