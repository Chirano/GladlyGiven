import { Component, OnInit } from '@angular/core';
import { HealthServices } from 'src/app/classes/HealthServices';
import { SessionContext } from 'src/app/classes/authentication/SessionContext';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { HealthserviceService } from 'src/app/services/healthservices/healthservice.service';

@Component({
  selector: 'app-view-service-provider-services',
  templateUrl: './view-service-provider-services.component.html',
  styleUrls: ['./view-service-provider-services.component.scss']
})
export class ViewServiceProviderServicesComponent implements OnInit{

  constructor(private service : HealthserviceService){}

  healthServices : HealthServices[] = [];

  ngOnInit(): void {
    this.loadServices();
  }

  loadServices(): void{
    console.log(AuthService.SessionContext.userId);
    this.service.getAllServicesByServiceId(AuthService.SessionContext.userId).subscribe(healthServices => this.healthServices = healthServices);
  }
}
