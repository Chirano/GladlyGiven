import { Component } from '@angular/core';
import { RouterPaths } from 'src/app/classes/routing/RoutePaths';
import { EventManagerService } from 'src/app/services/events/event-manager.service';

@Component({
  selector: 'app-refugee-home',
  templateUrl: './refugee-home.component.html',
  styleUrls: ['./refugee-home.component.scss']
})
export class RefugeeHomeComponent {


  toCreateReview(){
    EventManagerService.OnRouteEvent.emit(RouterPaths.ViewReview);
  }
}
