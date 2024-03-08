// Author: Tiago Barracha ti.barracha@gmail.com

import { Component } from '@angular/core';
import { AuthDetails } from 'src/app/classes/AuthDetails';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { EventManagerService } from 'src/app/services/events/event-manager.service';

@Component({
  selector: 'app-view-sign-in',
  templateUrl: './view-sign-in.component.html',
  styleUrls: ['./view-sign-in.component.scss']
})

export class ViewSignInComponent {

  constructor(private authService : AuthService) {

  }

  // could also send form data as parameters for this method
  // instead of fetching from DOM
  signIn() {
    const authDetails : AuthDetails = {
      email: (document.getElementById('email') as HTMLInputElement).value,
      password: (document.getElementById('password') as HTMLInputElement).value
    }

    //console.log("Auth component ran:", authDetails);
    EventManagerService.OnAuthEvent.emit(authDetails);
    //this.authService.FilterAuthentication(authDetails);
  }
}