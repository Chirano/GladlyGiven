import { Injectable } from '@angular/core';
import { EventManagerService } from '../events/event-manager.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoutingService {

  constructor(private router : Router) {
    EventManagerService.OnRouteEvent.subscribe(this.OnRoutingEvent.bind(this));
  }

  private OnRoutingEvent(targetRoute : string) {
    console.log("Target route: ", targetRoute);
    this.router.navigate([targetRoute]);
  }
}
