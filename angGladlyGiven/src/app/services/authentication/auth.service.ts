// Author: Tiago Barracha ti.barracha@gmail.com

import { Injectable } from '@angular/core';
import { EventManagerService } from '../events/event-manager.service';
import { AuthDetails } from 'src/app/classes/AuthDetails';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor() {
    EventManagerService.OnAuthEvent.subscribe(this.AuthFilter.bind(this));
  }

  private AuthFilter(authDetails: AuthDetails) {
    console.log("Auth Event Detected:", authDetails);
  }

  FilterAuthentication(authDetails: AuthDetails) {
    console.log("Auth filtered!");
  }
}
