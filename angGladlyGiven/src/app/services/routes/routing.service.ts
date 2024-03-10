import { Injectable } from '@angular/core';
import { EventManagerService } from '../events/event-manager.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})

export class RoutingService {
  constructor(
      private router : Router,
      private location : Location,
    ) {
    EventManagerService.OnRouteEvent.subscribe(this.OnRoutingEvent.bind(this));
    EventManagerService.OnBackEvent.subscribe(() => this.OnBack());
  }

  private OnRoutingEvent(targetRoute : string) {
    console.log("Target route: ", targetRoute);
    this.router.navigate([targetRoute]);
  }

  private OnBack() {
    console.log("Going back!");
    this.location.back();
  }
}
