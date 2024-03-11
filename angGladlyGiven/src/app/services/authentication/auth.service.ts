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

import { RefugeeService } from '../data/javaSpring/refugee/refugee.service';
import { ServiceProviderService } from '../data/javaSpring/serviceProvider/service-provider.service';
import { DonorService } from '../data/javaSpring/donor/donor.service';
import { AuthState } from 'src/app/classes/authentication/AuthState';
import { Observable, catchError, filter, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  
  private helloJavaURL = "http://localhost:8080/api/hello";
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
    EventManagerService.OnJavaHello.subscribe(() => this.getHelloFromJava().subscribe());

    EventManagerService.OnSignInEvent.subscribe(this.SignInFilter.bind(this));
    EventManagerService.OnSingUpEvent.subscribe(this.SignUp.bind(this));

    EventManagerService.OnSignUpRefugeeEvent.subscribe(this.SignUpRefugee.bind(this));
    EventManagerService.OnSignUpServiceProviderEvent.subscribe(this.SignUpServiceProvider.bind(this));
    EventManagerService.OnSignUpDonorEvent.subscribe(this.SignUpDonor.bind(this));
  }


  // API Hello
  // -------------------------
  getHelloFromJava() : Observable<any> {
    const hello = this.http.get(this.helloJavaURL);
    return hello;
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


  private SignUpRefugee(refugee: Refugee) {
    this.refugeeService.postRefugeeFromBody(refugee).subscribe({
      next: (response: any) => {
        /*
        if (response.status === 200) {
          console.log("Refugee account created successfully: ", response);
          EventManagerService.OnRouteEvent.emit(RouterPaths.ViewRefugee);
        } else {
          console.log("Tried to Register Refugee: ", refugee);
        }
        */
        // Emit an event or execute a callback function with the response
        console.log(response);

        //EventManagerService.OnSignUpRefugeeResponse.emit(response);
      },
      error: (error: any) => {
        console.error("Error creating refugee account: ", error);
        // Handle the error (e.g., display an error message to the user)
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
