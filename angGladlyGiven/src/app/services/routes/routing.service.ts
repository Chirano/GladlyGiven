import { Injectable } from '@angular/core';
import { EventManagerService } from '../events/event-manager.service';
import { RouteEnum } from 'src/app/enums/RouteEnum';
import { Router } from '@angular/router';
import { RoutePaths } from 'src/app/classes/RoutePaths';

@Injectable({
  providedIn: 'root'
})
export class RoutingService {

  constructor(private router : Router) {
    EventManagerService.OnRouteEvent.subscribe(this.OnRoutingEvent.bind(this));
  }

  private OnRoutingEvent(routeEnum : RouteEnum) {
    var targetRoute : string = "home";

    switch (routeEnum) {
      case RouteEnum.SignIn:
        targetRoute = RoutePaths.SignIn;
        break;

      case RouteEnum.SignUp:
        targetRoute = RoutePaths.SignUp;
        break;

      case RouteEnum.Admin:
        targetRoute = RoutePaths.Admin;
        break;

      case RouteEnum.ServiceProvider:
        targetRoute = RoutePaths.ServiceProvider;
        break;

      case RouteEnum.Refugee:
        targetRoute = RoutePaths.Refugee;
        break;

      case RouteEnum.Donor:
        targetRoute = RoutePaths.Donor;
        break;

      default:
        targetRoute = RoutePaths.SignIn;
        break;
    }

    console.log("Target route: ", targetRoute);
    this.router.navigate([targetRoute]);
  }
}
