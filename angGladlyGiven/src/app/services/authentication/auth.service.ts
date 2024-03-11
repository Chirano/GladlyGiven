// Author: Tiago Barracha ti.barracha@gmail.com

import { Injectable } from '@angular/core';
import { EventManagerService } from '../events/event-manager.service';
import { SignInDetails } from 'src/app/classes/authentication/SignInDetails';
import { RouterPaths } from 'src/app/classes/routing/RoutePaths';
import { MockSessionContexts } from 'src/app/classes/authentication/MockSessionContexts';
import { SignUpDetails } from 'src/app/classes/authentication/SignUpDetails';
import { SessionContext } from 'src/app/classes/authentication/SessionContext';

import { UserType } from 'src/app/classes/userProfiles/UserType';
import { RefugeeDTO } from 'src/app/classes/userProfiles/Refugee';
import { ServiceProvider } from 'src/app/classes/userProfiles/ServiceProvider';
import { Donor } from 'src/app/classes/userProfiles/Donor';

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
  static authState: AuthState = AuthState.None;

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



  // Sign IN - Login
  // ----------------------------------------------------------------------

  private SignInFilter(signInDetails: SignInDetails) {

    console.log("sign in recieved")
    var targetRoute: string = RouterPaths.SignIn;

    switch(signInDetails.email) {
      case MockSessionContexts.AuthAdmin.email:
        targetRoute = RouterPaths.ViewAdmin;
        this.sessionContext = MockSessionContexts.AuthAdmin;
        break;
        
      case MockSessionContexts.AuthRefugee.email:
        targetRoute = RouterPaths.ViewRefugee;
        this.sessionContext = MockSessionContexts.AuthRefugee;
        break;
      
      case MockSessionContexts.AuthServiceProvider.email:
        targetRoute = RouterPaths.ViewServiceProvider;
        this.sessionContext = MockSessionContexts.AuthServiceProvider;
        break;
        
      case MockSessionContexts.AuthDonor.email:
        targetRoute = RouterPaths.ViewDonor;
        this.sessionContext = MockSessionContexts.AuthDonor;
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
    AuthService.authState = AuthState.SignUp;

    this.signUpDetails = inputSignUpDetails;
    EventManagerService.OnRouteEvent.emit(RouterPaths.SignUpHelpIntention);
  }


  private SignUpRefugee(refugee: RefugeeDTO) {
    this.refugeeService.postRefugeeFromBody(refugee).subscribe({
      next: (response: any) => {
        // if (200 OK) =>
        // map to refugee
        // change to refugee view
        var refugee: RefugeeDTO = RefugeeService.MapToRefugee(response);
        console.log("Sign Up Refugee:", response);
        console.log("Refugee:", refugee);
      },

      error: (error: any) => {
        console.error("Error creating refugee account: ", error);
      }
    });
  }
  
  private SignUpServiceProvider(serviceProvider: ServiceProvider) {
    console.log("Registered Service Provider: ", serviceProvider);
    EventManagerService.OnRouteEvent.emit(RouterPaths.ViewServiceProvider);
  }
  
  private SignUpDonor(donor: Donor) {
    console.log("Registered Donor: ", donor);
    EventManagerService.OnRouteEvent.emit(RouterPaths.ViewDonor);
  }
}
