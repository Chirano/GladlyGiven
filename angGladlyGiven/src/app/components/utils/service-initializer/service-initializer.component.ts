import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/authentication/auth.service';

@Component({
  selector: 'app-service-initializer',
  templateUrl: './service-initializer.component.html',
  styleUrls: ['./service-initializer.component.scss']
})

export class ServiceInitializerComponent {
  constructor(
    private authService : AuthService
  ) {

  }
}
