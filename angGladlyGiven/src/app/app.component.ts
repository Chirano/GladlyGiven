import { Component } from '@angular/core';
import { EventManagerService } from './services/events/event-manager.service';
import { AuthService } from './services/authentication/auth.service';
import { SaveService } from './services/saveData/save.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'angGladlyGiven';
  
  constructor(
    private eventManager: EventManagerService,
    private authService: AuthService,
    private saveService: SaveService,
  ) {
    
  }
}
