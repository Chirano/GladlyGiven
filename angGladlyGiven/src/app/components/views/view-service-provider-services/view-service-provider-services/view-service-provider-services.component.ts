import { Component, OnInit } from '@angular/core';
import { HealthService } from 'src/app/classes/HealthServices';
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
  allHealthServices : HealthService [] = [];
  healthServices : HealthService[] = [];
  healthService : HealthService ={
    id: 0,
    description: "",
  }
  toaddhealthService : HealthService ={
    id: 0, 
    description: " ",
  }


  ngOnInit(): void {
    this.loadServices();
    this.loadAllServices();
  }

  loadServices(): void{
    this.service.getAllServicesByServiceId(AuthService.SessionContext.userId).subscribe(healthServices => this.healthServices = healthServices);
  }

  removeService(serviceId:number): void{
    this.service.removeService(AuthService.SessionContext.userId, serviceId).subscribe(healthServices => this.healthServices = healthServices);
  }

  addService(serviceId: number): void{
    const obj = [

    ];
    obj.push(this.toaddhealthService)
    this.service.addService(AuthService.SessionContext.userId, serviceId).subscribe(healthServices => this.healthServices = healthServices);
  }

  loadAllServices(){
    this.service.getAllServices().subscribe(allHealthServices => this.allHealthServices = allHealthServices);
  }
}
