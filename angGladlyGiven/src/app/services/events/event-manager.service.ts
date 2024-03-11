// Author: Tiago Barracha ti.barracha@gmail.com

import { Injectable, EventEmitter } from '@angular/core';
import { SignInDetails as SignInDetails } from 'src/app/classes/authentication/SignInDetails';
import { SignUpDetails } from 'src/app/classes/authentication/SignUpDetails';
import { RoutingService } from '../routes/routing.service';
import { AuthService } from '../authentication/auth.service';
import { Refugee } from 'src/app/classes/userProfiles/Refugee';
import { ServiceProvider } from 'src/app/classes/userProfiles/ServiceProvider';
import { Donor } from 'src/app/classes/userProfiles/Donor';
import { Contact } from 'src/app/classes/userProfiles/Contact';

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
  
  static OnSignUpRefugeeEvent: EventEmitter<Refugee> = new EventEmitter<Refugee>();
  static OnSignUpServiceProviderEvent: EventEmitter<ServiceProvider> = new EventEmitter<ServiceProvider>();
  static OnSignUpDonorEvent: EventEmitter<Donor> = new EventEmitter<Donor>();

  static OnContactEvent: EventEmitter<Contact> = new EventEmitter<Contact>();

  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // INITIALIZE SERVICES WITH EVENTS HERE
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  constructor(
      private authService : AuthService,
      private routingService: RoutingService,
    ) {
    
  }
}
