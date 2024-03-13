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
import { SignUpRequestRefugee } from 'src/app/classes/authentication/SignUpRequestRefugee';
import { SignUpRequestDonor } from 'src/app/classes/authentication/SignUpRequestDonor';
import { SignUpRequestServiceProvider } from 'src/app/classes/authentication/SignUpRequestServiceProvider';
import { SaveService } from '../saveData/save.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private sessionContextKey = "context";

  static AuthState: AuthState = AuthState.None;
  static SessionContext: SessionContext;

  private signInURL: string                 = "http://localhost:8080/api/auth/signin";
  private signUpServiceProviderURL: string  = "http://localhost:8080/api/auth/signup/serviceprovider";
  private signUpRefugeeURL: string          = "http://localhost:8080/api/auth/signup/refugee";
  private signUpDonorURL: string            = "http://localhost:8080/api/auth/signup/donor";

  private signUpDetails : SignUpDetails = {
    email: "",
    name: "",
    password: "",
  }

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

    this.GetSessionContext();
  }

  

  private SetSessionContext(userId: number, name: string, email: string, userType: UserType) : SessionContext {
    this.sessionContext.userId = userId;
    this.sessionContext.name = name;
    this.sessionContext.email = email;
    this.sessionContext.userType = userType;

    AuthService.SessionContext = this.sessionContext;
    SaveService.saveData(this.sessionContextKey, this.sessionContext);

    console.log("Session Context: ", this.sessionContext);
    return this.sessionContext;
  }

  private SetSessionContextByObject(context: SessionContext) : SessionContext {
    this.sessionContext.userId = context.userId;
    this.sessionContext.name = context.name;
    this.sessionContext.email = context.email;
    this.sessionContext.userType = context.userType;

    AuthService.SessionContext = this.sessionContext;
    SaveService.saveData(this.sessionContextKey, this.sessionContext);

    console.log("Session Context: ", this.sessionContext);
    return this.sessionContext;
  }

  GetSessionContext() : SessionContext {
    var context = SaveService.loadData<SessionContext>(this.sessionContextKey);
    if (context != null) {
      this.SetSessionContextByObject(context);
    }

    return this.sessionContext;
  }



  // Sign IN - Login
  // ----------------------------------------------------------------------

  private SignInFilter(signInDetails: SignInDetails) {
    console.log("Sign in received");

    // is mock session?
    if (this.IsMockSession(signInDetails)) {
      console.log("Mock SignIn: ", this.sessionContext);
      this.RedirectToSessionContextView(this.sessionContext.userType);
    }
    
    // login
    else {
      console.log("Not mock SignIn. Trying to fetch user with email: ", signInDetails.email);
      this.http.post<any>(this.signInURL + "/" + signInDetails.email, signInDetails).subscribe({
        next: (response: any) => {
          console.log("SignIn successful: ", response);
          this.RedirectToSessionContextView(AuthService.mapUserType(response.userType));
        },
        error: (error: any) => {
          console.error("Error during signin: ", error);
        }
      });
    }
  }

  private IsMockSession(signInDetails: SignInDetails) : boolean {
    switch(signInDetails.email) {
      case MockSessionContexts.AuthAdmin.email:
        this.SetSessionContextByObject(MockSessionContexts.AuthAdmin);
        return true;
        
      case MockSessionContexts.AuthRefugee.email:
        this.SetSessionContextByObject(MockSessionContexts.AuthRefugee);
        return true;
      
      case MockSessionContexts.AuthServiceProvider.email:
        this.SetSessionContextByObject(MockSessionContexts.AuthServiceProvider);
        return true;
        
      case MockSessionContexts.AuthDonor.email:
        this.SetSessionContextByObject(MockSessionContexts.AuthDonor);
        return true;
    }

    return false;
  }

  private RedirectToSessionContextView(userType: UserType) {
    var targetRoute: string = RouterPaths.SignIn;

    switch(userType) {
      case UserType.Admin:
        targetRoute = RouterPaths.ViewAdmin;
        break;

      case UserType.Refugee:
        targetRoute = RouterPaths.ViewRefugee;
        break;

      case UserType.ServiceProvider:
        targetRoute = RouterPaths.ViewServiceProvider;
        break;

      case UserType.Donor:
        targetRoute = RouterPaths.ViewDonor;
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
    refugee.email = this.signUpDetails.email;
    this.signUpDetails.name = refugee.firstName;

    var signUpRequest: SignUpRequestRefugee = {
      signUpDetails: this.signUpDetails,
      refugeeDTO: refugee
    }

    console.log("SignUpRequest: ", signUpRequest);

    this.http.post<SessionContext>(this.signUpRefugeeURL, signUpRequest).subscribe({
      next: (response: SessionContext) => {
        this.SetSessionContext(response.userId, response.name, response.email, response.userType);
        EventManagerService.OnRouteEvent.emit(RouterPaths.ViewRefugee);
      },
      error: (error: any) => {
        console.error("Error creating refugee account: ", error);
      }
    });
  }
  
  private SignUpServiceProvider(serviceProvider: ServiceProviderDTO) {
    this.signUpDetails.email = serviceProvider.email;
    this.signUpDetails.name = serviceProvider.firstName;
  
    var signUpRequest: SignUpRequestServiceProvider = {
      signUpDetails: this.signUpDetails,
      serviceProviderDTO: serviceProvider
    }
  
    console.log("SignUpRequest: ", signUpRequest);
  
    this.http.post<SessionContext>(this.signUpServiceProviderURL, signUpRequest).subscribe({
      next: (response: SessionContext) => {
        this.SetSessionContext(response.userId, response.name, response.email, response.userType);
        EventManagerService.OnRouteEvent.emit(RouterPaths.ViewServiceProvider);
      },
      error: (error: any) => {
        console.error("Error creating service provider account: ", error);
      }
    });
  }
  
  private SignUpDonor(donor: DonorDTO) {
    this.signUpDetails.email = donor.email;
    this.signUpDetails.name = donor.firstName;
  
    var signUpRequest: SignUpRequestDonor = {
      signUpDetails: this.signUpDetails,
      donorDTO: donor
    }
  
    console.log("SignUpRequest: ", signUpRequest);
  
    this.http.post<SessionContext>(this.signUpDonorURL, signUpRequest).subscribe({
      next: (response: SessionContext) => {
        this.SetSessionContext(response.userId, response.name, response.email, response.userType);
        EventManagerService.OnRouteEvent.emit(RouterPaths.ViewDonor);
      },
      error: (error: any) => {
        console.error("Error creating donor account: ", error);
      }
    });
  }
  
  static mapUserType(userTypeString: string): UserType {
    const lowercaseUserType = userTypeString.toLowerCase();
    switch (lowercaseUserType) {
      case 'admin':
        return UserType.Admin;
      case 'refugee':
        return UserType.Refugee;
      case 'serviceprovider':
        return UserType.ServiceProvider;
      case 'donor':
        return UserType.Donor;
      default:
        return UserType.None;
    }
  }
}
