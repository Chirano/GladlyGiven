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

  getHello() {
    EventManagerService.OnJavaHello.emit();
  }

  constructor(
      private eventManager : EventManagerService,
    ) {

  }

  // could also send form data as parameters for this method
  // instead of fetching from DOM
  signIn(form : any) {
    EventManagerService.OnJavaHello.emit();

    const signInDetails : SignInDetails = {
      email: (document.getElementById('email') as HTMLInputElement).value,
      password: (document.getElementById('password') as HTMLInputElement).value
    }

    //console.log("Sign In Component:", signInDetails);
    EventManagerService.OnSignInEvent.emit(signInDetails);
  }

  toSignUp() {
    EventManagerService.OnRouteEvent.emit(RouterPaths.SignUp);
  }

  toFaq() {
    EventManagerService.OnRouteEvent.emit(RouterPaths.ViewFaq);
  }
}
