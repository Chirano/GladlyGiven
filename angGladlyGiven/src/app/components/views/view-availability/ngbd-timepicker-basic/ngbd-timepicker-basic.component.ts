import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-ngbd-timepicker-basic',
  standalone: true,
	imports: [NgbTimepickerModule, FormsModule, JsonPipe],
  templateUrl: './ngbd-timepicker-basic.component.html',
  styleUrls: ['./ngbd-timepicker-basic.component.scss']
})

export class NgbdTimepickerBasicComponent {
  time = { hour: 13, minute: 30 };
}
