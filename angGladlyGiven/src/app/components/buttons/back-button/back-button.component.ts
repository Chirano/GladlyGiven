import { Component } from '@angular/core';
import { EventManagerService } from 'src/app/services/events/event-manager.service';

@Component({
  selector: 'app-back-button',
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.scss']
})

export class BackButtonComponent {
  
  Back() {
    //console.log("Trying to go back!");
    EventManagerService.OnBackEvent.emit();
  }
}
