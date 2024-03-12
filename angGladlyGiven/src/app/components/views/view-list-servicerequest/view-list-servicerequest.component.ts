import { Component } from '@angular/core';
import { ServiceRequest } from 'src/app/classes/ServiceRequest';
import { ServiceRequestService } from 'src/app/services/service-request/service-request.service';


@Component({
  selector: 'app-view-list-servicerequest',
  templateUrl: './view-list-servicerequest.component.html',
  styleUrls: ['./view-list-servicerequest.component.scss']
})
export class ViewListServicerequestComponent {

  serviceRequests: ServiceRequest[] = [];

  constructor(
    private serviceRequestService : ServiceRequestService) {}
  
    ngOnInit(): void {
      this.getServiceRequests(); // Chama o método ao iniciar o componente
    }


    //GET: returns all costs supports saved in database.
    getServiceRequests() : void {
      this.serviceRequestService.getServiceRequest().subscribe(serviceRequests => this.serviceRequests = serviceRequests)
    }

}
