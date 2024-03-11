// Author: Tiago Barracha ti.barracha@gmail.com

import { Injectable, EventEmitter } from '@angular/core';
import { SignInDetails as SignInDetails } from 'src/app/classes/authentication/SignInDetails';
import { SignUpDetails } from 'src/app/classes/authentication/SignUpDetails';
import { RoutingService } from '../routes/routing.service';
import { AuthService } from '../authentication/auth.service';
import { RefugeeDTO } from 'src/app/classes/userProfiles/Refugee';
import { ServiceProvider } from 'src/app/classes/userProfiles/ServiceProvider';
import { Donor } from 'src/app/classes/userProfiles/Donor';
import { RefugeeService } from '../data/javaSpring/refugee/refugee.service';
import { ServiceProviderService } from '../data/javaSpring/serviceProvider/service-provider.service';
import { DonorService } from '../data/javaSpring/donor/donor.service';

@Injectable({
  providedIn: 'root'
})

export class EventManagerService {

  // hello Events
  static OnJavaHello: EventEmitter<void> = new EventEmitter<void>();
  static OnDotNetHello: EventEmitter<void> = new EventEmitter<void>();

  // route Events
  static OnRouteEvent: EventEmitter<string> = new EventEmitter<string>();
  static OnBackEvent: EventEmitter<void> = new EventEmitter<void>();

  // Auth Events
  static OnSignInEvent: EventEmitter<SignInDetails> = new EventEmitter<SignInDetails>();
  static OnSingUpEvent: EventEmitter<SignUpDetails> = new EventEmitter<SignUpDetails>();
  
  static OnSignUpRefugeeEvent: EventEmitter<RefugeeDTO> = new EventEmitter<RefugeeDTO>();
  static OnSignUpServiceProviderEvent: EventEmitter<ServiceProvider> = new EventEmitter<ServiceProvider>();
  static OnSignUpDonorEvent: EventEmitter<Donor> = new EventEmitter<Donor>();


  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // INITIALIZE SERVICES WITH EVENTS HERE
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  constructor(
      private authService : AuthService,
      private routingService: RoutingService,
      private refugeeService: RefugeeService,
      private serviceProviderService: ServiceProviderService,
      private donorService: DonorService,
    ) {
    
  }
}
