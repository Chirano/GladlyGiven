import { Component } from '@angular/core';
import { RouterPaths } from 'src/app/classes/routing/RoutePaths';
import { RefugeeService } from 'src/app/services/data/javaSpring/refugee/refugee.service';
import { EventManagerService } from 'src/app/services/events/event-manager.service';
import { RefugeePage } from '../RefugeePage';

@Component({
  selector: 'app-refugee-home',
  templateUrl: './refugee-home.component.html',
  styleUrls: ['./refugee-home.component.scss']
})
export class RefugeeHomeComponent {


  ngOnInit() {
    RefugeeService.currentRefugeePage = RefugeePage.Home;
  }

  toCreateReview(){
    EventManagerService.OnRouteEvent.emit(RouterPaths.ViewReview);
  }
}
