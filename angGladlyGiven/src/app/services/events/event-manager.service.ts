// Author: Tiago Barracha ti.barracha@gmail.com

import { Injectable, EventEmitter } from '@angular/core';
import { SignInDetails as SignInDetails } from 'src/app/classes/authentication/SignInDetails';
import { SignUpDetails } from 'src/app/classes/authentication/SignUpDetails';
import { RoutingService } from '../routes/routing.service';
import { AuthService } from '../authentication/auth.service';
import { RefugeeDTO } from 'src/app/classes/userProfiles/RefugeeDTO';
import { ServiceProviderDTO } from 'src/app/classes/userProfiles/ServiceProviderDTO';
import { DonorDTO } from 'src/app/classes/userProfiles/DonorDTO';
import { RefugeeService } from '../data/javaSpring/refugee/refugee.service';
import { ServiceProviderService } from '../data/javaSpring/serviceProvider/service-provider.service';
import { DonorService } from '../data/javaSpring/donor/donor.service';
import { Contact } from 'src/app/classes/userProfiles/Contact';
import { ServiceRequest } from 'src/app/classes/ServiceRequest';
import { RefugeePage } from 'src/app/components/viewComponents/refugee/RefugeePage';

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
  static OnLogout: EventEmitter<void> = new EventEmitter<void>();
  static OnSignInEvent: EventEmitter<SignInDetails> = new EventEmitter<SignInDetails>();
  static OnSingUpEvent: EventEmitter<SignUpDetails> = new EventEmitter<SignUpDetails>();
  
  static OnSignUpRefugeeEvent: EventEmitter<RefugeeDTO> = new EventEmitter<RefugeeDTO>();
  static OnSignUpServiceProviderEvent: EventEmitter<ServiceProviderDTO> = new EventEmitter<ServiceProviderDTO>();
  static OnSignUpDonorEvent: EventEmitter<DonorDTO> = new EventEmitter<DonorDTO>();

  static OnSignUpServiceRequestEvent: EventEmitter<ServiceRequest> = new EventEmitter<ServiceRequest>();

  static OnContactEvent: EventEmitter<Contact> = new EventEmitter<Contact>();

  // Refugee View events
  static OnSelectedRefugee: EventEmitter<RefugeeDTO> = new EventEmitter<RefugeeDTO>();
  static OnRefugeeViewChanged: EventEmitter<RefugeePage> = new EventEmitter<RefugeePage>();
  static OnRefugeeSearched: EventEmitter<string> = new EventEmitter<string>();

  // Service Provider events
  static OnSelectedServiceProvider: EventEmitter<ServiceProviderDTO> = new EventEmitter<ServiceProviderDTO>();

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
