import { Component, EventEmitter, OnInit } from '@angular/core';
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
  allHealthServices : HealthServices [] = [];
  healthService : HealthServices ={
    id: 0,
    description: "",
  }

  toaddhealthService : HealthServices ={
    id: 0, 
    description: " ",
  }


  ngOnInit(): void {
    this.loadServices();
    this.loadServicesToAdd();
  }

  loadServices(): void{
    console.log(AuthService.SessionContext.userId);
    this.service.getAllServicesByServiceId(AuthService.SessionContext.userId).subscribe(healthServices => this.healthServices = healthServices);
  }

  removeService(serviceId:number): void{
    this.service.removeService(AuthService.SessionContext.userId, serviceId).subscribe(healthServices => this.healthServices = healthServices);
  }

  addService(serviceId: number): void{
    console.log(2, AuthService.SessionContext.userId)
    const obj = [

    ];
    obj.push(this.toaddhealthService)
    this.service.addService(AuthService.SessionContext.userId, serviceId).subscribe(healthServices => this.healthServices = healthServices);
  }

  loadServicesToAdd(){
    this.service.getAllServices().subscribe(allHealthServices => this.allHealthServices = allHealthServices);
  }
}
