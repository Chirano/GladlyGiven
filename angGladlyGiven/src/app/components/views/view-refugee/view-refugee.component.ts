import { Component } from '@angular/core';
import { RouterPaths } from 'src/app/classes/routing/RoutePaths';
import { EventManagerService } from 'src/app/services/events/event-manager.service';

@Component({
  selector: 'app-view-refugee',
  templateUrl: './view-refugee.component.html',
  styleUrls: ['./view-refugee.component.scss']
})
export class ViewRefugeeComponent {

  //este método terá de ser colocado no view do apointment
  
  toCreateReview(){
    EventManagerService.OnRouteEvent.emit(RouterPaths.ViewReview);
  }
  
}
