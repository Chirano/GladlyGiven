import { Component } from '@angular/core';

import { ServiceRequest } from 'src/app/classes/ServiceRequest';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { ServiceRequestService } from 'src/app/services/service-request/service-request.service';

@Component({
  selector: 'app-view-list-servicerequest-all',
  templateUrl: './view-list-servicerequest-all.component.html',
  styleUrls: ['./view-list-servicerequest-all.component.scss']
})
export class ViewListServicerequestAllComponent {

  serviceRequest: ServiceRequest = {
    id: 0,
    dateRequest: '',
    idCategory: 0,
    description: '',
    status: 0,
  };

  serviceRequests: ServiceRequest[] = [];

  constructor(
    private serviceRequestService: ServiceRequestService) { }

  ngOnInit(): void {
    this.getServiceRequests(); // Chama o método ao iniciar o componente
    //this.getServiceRequests();
  }
  // Método para retornar a string correspondente ao valor do status
  getStatusString(status: number): string {
    switch (status) {
      case 0:
        return 'Pending';
      case 1:
        return 'Approval';
      case 2:
        return 'Reject';
      // Adicione mais casos conforme necessário
      default:
        return 'Unknown';
    }
  }

  //GET: returns all Service Requests saved in database.
  getServiceRequests(): void {
    console.log(AuthService.SessionContext.userId);
    this.serviceRequestService.getServiceRequest().subscribe(serviceRequests => this.serviceRequests = serviceRequests)
  }



}
