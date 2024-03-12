// Author: Tiago Barracha ti.barracha@gmail.com

import { Injectable } from '@angular/core';
import { EventManagerService } from '../events/event-manager.service';
import { SignInDetails } from 'src/app/classes/authentication/SignInDetails';
import { RouterPaths } from 'src/app/classes/routing/RoutePaths';
import { MockSessionContexts } from 'src/app/classes/authentication/MockSessionContexts';
import { SignUpDetails } from 'src/app/classes/authentication/SignUpDetails';
import { SessionContext } from 'src/app/classes/authentication/SessionContext';

import { UserType } from 'src/app/classes/userProfiles/UserType';
import { RefugeeDTO } from 'src/app/classes/userProfiles/RefugeeDTO';
import { ServiceProviderDTO } from 'src/app/classes/userProfiles/ServiceProviderDTO';
import { DonorDTO } from 'src/app/classes/userProfiles/DonorDTO';

import { RefugeeService } from '../data/javaSpring/refugee/refugee.service';
import { ServiceProviderService } from '../data/javaSpring/serviceProvider/service-provider.service';
import { DonorService } from '../data/javaSpring/donor/donor.service';
import { AuthState } from 'src/app/classes/authentication/AuthState';
import { Observable, catchError, filter, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  static AuthState: AuthState = AuthState.None;
  static SessionContext: SessionContext | null = null;

  private signUpDetails : SignUpDetails | null = null;
  private sessionContext: SessionContext = 
  {
    userId: -1,
    name: "",
    email: "",
    userType: UserType.None,
  };
  
  constructor(
    private http: HttpClient,
    private refugeeService: RefugeeService,
    private serviceProviderService: ServiceProviderService,
    private donorService: DonorService
  ) {

    EventManagerService.OnSignInEvent.subscribe(this.SignInFilter.bind(this));
    EventManagerService.OnSingUpEvent.subscribe(this.SignUp.bind(this));

    EventManagerService.OnSignUpRefugeeEvent.subscribe(this.SignUpRefugee.bind(this));
    EventManagerService.OnSignUpServiceProviderEvent.subscribe(this.SignUpServiceProvider.bind(this));
    EventManagerService.OnSignUpDonorEvent.subscribe(this.SignUpDonor.bind(this));
  }

  

  private SetSessionContext(userId: number, name: string, email: string, userType: UserType) : SessionContext {
    this.sessionContext.userId = userId;
    this.sessionContext.name = name;
    this.sessionContext.email = email;
    this.sessionContext.userType = userType;

    AuthService.SessionContext = this.sessionContext;
    return this.sessionContext;
  }

  private SetSessionContextByObject(context: SessionContext) : SessionContext {
    this.sessionContext.userId = context.userId;
    this.sessionContext.name = context.name;
    this.sessionContext.email = context.email;
    this.sessionContext.userType = context.userType;

    AuthService.SessionContext = this.sessionContext;
    return this.sessionContext;
  }

  GetSessionContext() : SessionContext {
    return this.sessionContext;
  }



  // Sign IN - Login
  // ----------------------------------------------------------------------

  private SignInFilter(signInDetails: SignInDetails) {

    console.log("sign in recieved")
    var targetRoute: string = RouterPaths.SignIn;

    switch(signInDetails.email) {
      case MockSessionContexts.AuthAdmin.email:
        targetRoute = RouterPaths.ViewAdmin;
        this.SetSessionContextByObject(MockSessionContexts.AuthAdmin);
        break;
        
      case MockSessionContexts.AuthRefugee.email:
        targetRoute = RouterPaths.ViewRefugee;
        this.SetSessionContextByObject(MockSessionContexts.AuthRefugee);
        break;
      
      case MockSessionContexts.AuthServiceProvider.email:
        targetRoute = RouterPaths.ViewServiceProvider;
        this.SetSessionContextByObject(MockSessionContexts.AuthServiceProvider);
        break;
        
      case MockSessionContexts.AuthDonor.email:
        targetRoute = RouterPaths.ViewDonor;
        this.SetSessionContextByObject(MockSessionContexts.AuthDonor);
        break;

      default:
        targetRoute = RouterPaths.SignIn;
        break;
    }

    console.log("Target route:", targetRoute);
    EventManagerService.OnRouteEvent.emit(targetRoute);
  }



  // Sign UP - Register
  // ----------------------------------------------------------------------
  private SignUp(inputSignUpDetails: SignUpDetails) {
    AuthService.AuthState = AuthState.SigningUp;

    this.signUpDetails = inputSignUpDetails;
    EventManagerService.OnRouteEvent.emit(RouterPaths.SignUpHelpIntention);
  }


  private SignUpRefugee(refugee: RefugeeDTO) {
    this.refugeeService.postRefugeeFromBody(refugee).subscribe({
      next: (response: any) => {
        var mappedRefugee: RefugeeDTO | null = RefugeeService.MapToRefugee(response);

        if (mappedRefugee == null || mappedRefugee.id < 1) {
          console.log("Refugee came empty");
        } else {
          console.log("Registered Refugee:", mappedRefugee);
          EventManagerService.OnRouteEvent.emit(RouterPaths.ViewRefugee);
          this.SetSessionContext(mappedRefugee.id, mappedRefugee.firstName, mappedRefugee.email, UserType.Refugee);
        }
      },

      error: (error: any) => {
        console.error("Error creating refugee account: ", error);
      }
    });
  }
  
  private SignUpServiceProvider(serviceProvider: ServiceProviderDTO) {
    this.serviceProviderService.postServiceProviderBody(serviceProvider).subscribe({
      next: (response: any) => {
        var mappedServiceProvider: ServiceProviderDTO | null = ServiceProviderService.MapToServiceProvider(response);

        if (mappedServiceProvider == null || mappedServiceProvider.id < 1) {
          console.log("Service Provider came empty");
        } else {
          console.log("Registered Service Provider:", mappedServiceProvider);
          EventManagerService.OnRouteEvent.emit(RouterPaths.ViewServiceProvider);
          this.SetSessionContext(mappedServiceProvider.id, mappedServiceProvider.firstName, mappedServiceProvider.email, UserType.ServiceProvider);
        }
      },

      error: (error: any) => {
        console.error("Error creating Service Provider account: ", error);
      }
    });
  }
  
  private SignUpDonor(donor: DonorDTO) {
    console.log("Registered Donor: ", donor);
    EventManagerService.OnRouteEvent.emit(RouterPaths.ViewDonor);
  }
}
