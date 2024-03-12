// Author: Tiago Barracha ti.barracha@gmail.com

import { Component } from '@angular/core';
import { SignInDetails } from 'src/app/classes/authentication/SignInDetails';
import { RouterPaths } from 'src/app/classes/routing/RoutePaths';
import { EventManagerService } from 'src/app/services/events/event-manager.service';

@Component({
  selector: 'app-view-sign-in',
  templateUrl: './view-sign-in.component.html',
  styleUrls: ['./view-sign-in.component.scss']
})

export class ViewSignInComponent {

  getHelloJava() {
    EventManagerService.OnJavaHello.emit();
  }

  getHelloDotNet() {
    EventManagerService.OnDotNetHello.emit();
  }

  constructor(
      private eventManager : EventManagerService,
    ) {

  }

  // could also send form data as parameters for this method
  // instead of fetching from DOM
  signIn(form : any) {
    if (form.valid) {
      const signInDetails : SignInDetails = {
        email: form.value.email,
        password: form.value.password
      }
  
      console.log("Sign In Component:", signInDetails);
      EventManagerService.OnSignInEvent.emit(signInDetails);
    } else {
      console.log("Form is invalid!");
    }
  }

  toSignUp() {
    EventManagerService.OnRouteEvent.emit(RouterPaths.SignUp);
  }

  toContact() {
    EventManagerService.OnRouteEvent.emit(RouterPaths.ViewContact);
  }

  toFaq() {
    EventManagerService.OnRouteEvent.emit(RouterPaths.ViewFaq);
  }

  toServiceRequest() {
    EventManagerService.OnRouteEvent.emit(RouterPaths.ViewServiceRequest);
  }
}
