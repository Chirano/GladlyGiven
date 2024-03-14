import { Component } from '@angular/core';
import { EventManagerService } from 'src/app/services/events/event-manager.service';

@Component({
  selector: 'app-refugee-searchbar',
  templateUrl: './refugee-searchbar.component.html',
  styleUrls: ['./refugee-searchbar.component.scss']
})

export class RefugeeSearchbarComponent {

  constructor(
    private eventManager: EventManagerService
  ) {

  }

  onSearchSubmit(query: string) {
    if (!query || query.trim() === '') {
      return;
    }

    //console.log("searched for:", query);
    EventManagerService.OnRefugeeSearched.emit(query);
  }
}
