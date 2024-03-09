// Author: Tiago Barracha ti.barracha@gmail.com

import { Injectable } from '@angular/core';
import { EventManagerService } from '../events/event-manager.service';
import { SignInDetails } from 'src/app/classes/authentication/SignInDetails';
import { RouterPaths } from 'src/app/classes/routing/RoutePaths';
import { MockSessionContexts } from 'src/app/classes/authentication/MockSessionContexts';
import { SignUpDetails } from 'src/app/classes/authentication/SignUpDetails';
import { SessionContext } from 'src/app/classes/authentication/SessionContext';
import { UserType } from 'src/app/classes/userProfiles/UserType';
import { Refugee } from 'src/app/classes/userProfiles/Refugee';
import { ServiceProvider } from 'src/app/classes/userProfiles/ServiceProvider';
import { Donor } from 'src/app/classes/userProfiles/Donor';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  static isSigningUp : boolean = false;

  private signUpDetails : SignUpDetails | null = null;
  private sessionContext: SessionContext = 
  {
    userId: -1,
    name: "",
    email: "",
    userType: UserType.None,
  };
  
  constructor() {
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
    AuthService.isSigningUp = true;

    this.signUpDetails = inputSignUpDetails;
    EventManagerService.OnRouteEvent.emit(RouterPaths.SignUpHelpIntention);
  }


  private SignUpRefugee(refugee: Refugee) {

  }

  private SignUpServiceProvider(serviceProvider: ServiceProvider) {

  }

  private SignUpDonor(donor: Donor) {

  }
}
