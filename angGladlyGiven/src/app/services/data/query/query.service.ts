import { Injectable } from '@angular/core';
import { HealthService } from 'src/app/classes/HealthServices';
import { HealthserviceService } from '../../healthservices/healthservice.service';

@Injectable({
  providedIn: 'root'
})

export class QueryService {

  services : HealthService[] = [];
  cities : string[] =
  [
    "Lisbon",
    "Porto",
    "Coimbra",
  ];

  constructor(
    private healthService: HealthserviceService,

    ) {

  }

  GetQueriableHealthServices() {
    this.healthService.getAllServices().subscribe({
      next: (services: HealthService[]) => {
        this.services = services;
        return this.services;
      },
      error: (error) => {
        console.error('Error fetching health services:', error);
        return this.services;
      }
    });
  }

  GetQueryableCities() : string[] {
    return this.cities;
  }
}
