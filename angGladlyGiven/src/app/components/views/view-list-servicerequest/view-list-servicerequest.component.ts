import { Component } from '@angular/core';

import { ServiceRequest } from 'src/app/classes/ServiceRequest';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { ServiceRequestService } from 'src/app/services/service-request/service-request.service';


@Component({
  selector: 'app-view-list-servicerequest',
  templateUrl: './view-list-servicerequest.component.html',
  styleUrls: ['./view-list-servicerequest.component.scss']
})
export class ViewListServicerequestComponent {

  serviceRequest: ServiceRequest = {
    id                 : 0,
    dateRequest        : '',
    idCategory         : 0,
    description        : '',
    status             : 0,
 };  

  serviceRequests: ServiceRequest[] = [];

  constructor(
    private serviceRequestService : ServiceRequestService) {}
  
    ngOnInit(): void {
      this.getServiceRequestByStatus(); // Chama o método ao iniciar o componente
      //this.getServiceRequests();
    }

    getIdCategoryString(idCategory: number): string {
      switch (idCategory) {
        case 1:
          return 'Medicine';
        case 2:
          return 'Nurse';
        case 3:
          return 'Dentist';
        case 4:
          return 'Psychology';
        default:
          return 'unknonw';
      }
    }

    getStatusString(status: number): string {
      switch (status) {
        case 0:
          return 'Pending';
        case 1:
          return 'Approval';
        case 2:
          return 'Reject';
        default:
          return 'Unknown';
      }
    }

    //GET: returns all Service Requests saved in database.
    getServiceRequests() : void {
      console.log(AuthService.SessionContext.userId);
      this.serviceRequestService.getServiceRequest().subscribe(serviceRequests => this.serviceRequests = serviceRequests)
      }

    

    //GET: returns all Service Reques tBy Status saved in database.
    getServiceRequestByStatus() : void {
      console.log(AuthService.SessionContext.userId);
      this.serviceRequestService.getServiceRequestByStatus(AuthService.SessionContext.userId).subscribe(serviceRequests => this.serviceRequests = serviceRequests)
      }


    
    //PUT: add a status Service request to the database
    statusUpdateServiceRequest(
      id: number, 
      dateRequest: string, 
      idCategory: number, 
      description: string, 
      status: number
      ): void {
      // Call the request service to create the donation
      this.serviceRequestService.statusUpdateServiceRequest({
        id,
        dateRequest,
        idCategory,
        description,
        status,
      } as ServiceRequest)
        .subscribe({
          next: (statusUpdateServiceRequest) => {
            // Handle the created Service Request as needed
            console.log('Register created:', statusUpdateServiceRequest);
            // Optionally, update UI or perform any additional actions here
            this.serviceRequest = statusUpdateServiceRequest;
          },
          error: (error) => {
            console.error('Failed to create Service Request', error);
            // Optionally, show an error message to the user
          }
        });
      }
      message: string = '';
      submitForm() {
        this.message = 'Status successfully updated!';
        setTimeout(() => {
        location.reload();
        }, 2000);
      }

}
