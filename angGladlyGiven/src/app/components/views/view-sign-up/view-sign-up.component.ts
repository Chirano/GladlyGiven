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
  ) { }


  signUp(form: any) {
    if (form.valid) {

      const password = form.value.password;
      const confirmPassword = form.value.confirmPassword;

      if (password !== confirmPassword) {
        console.error("Passwords don't match");
        return;
      }

      const signUpDetails: SignUpDetails = {
        name: "",
        email: form.value.email,
        password: password,
      };

      console.log("Signed Up:", signUpDetails);
      EventManagerService.OnSingUpEvent.emit(signUpDetails);
      EventManagerService.OnRouteEvent.emit(RoutePaths.SignUpHelpIntention);
    } else {
      console.error("Form is invalid");
    }
  }


  
  toSignIn() {
    EventManagerService.OnRouteEvent.emit(RoutePaths.SignIn);
  }
}
