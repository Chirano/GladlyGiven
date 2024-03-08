import { Component } from '@angular/core';
import { SignUpDetails } from 'src/app/classes/authentication/SignUpDetails';
import { RouterPaths as RoutePaths } from 'src/app/classes/routing/RoutePaths';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { EventManagerService } from 'src/app/services/events/event-manager.service';

@Component({
  selector: 'app-view-sign-up',
  templateUrl: './view-sign-up.component.html',
  styleUrls: ['./view-sign-up.component.scss']
})

export class ViewSignUpComponent {

  constructor(
    private eventManager : EventManagerService,
    private authManager : AuthService
  ) {

}

  // could also send form data as parameters for this method
  // instead of fetching from DOM
  signUp() {

    const formPass = (document.getElementById("password") as HTMLInputElement).value;
    const formConfirmPass = (document.getElementById("confirm-password") as HTMLInputElement).value

    if (formPass != formConfirmPass) {
      console.log("Passwords don't match!");
      return;
    }

    const signUpDetails : SignUpDetails = {
      name: (document.getElementById("name") as HTMLInputElement).value,
      email: (document.getElementById("email") as HTMLInputElement).value,
      password: formPass,
    }

    //console.log("Signed Up:", signUpDetails);
    EventManagerService.OnSingUpEvent.emit(signUpDetails);
    EventManagerService.OnRouteEvent.emit(RoutePaths.SignUpHelpIntention);
  }

  toSignIn() {
    EventManagerService.OnRouteEvent.emit(RoutePaths.SignIn);
  }
}
