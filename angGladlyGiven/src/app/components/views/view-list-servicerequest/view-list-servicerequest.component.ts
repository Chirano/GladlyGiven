import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
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
    dateRequest        : 'dd/mm/aaaa',
    idCategory         : 0,
    description        : '',
    status             : 2,
 };  

  serviceRequests: ServiceRequest[] = [];

  constructor(
    private serviceRequestService : ServiceRequestService) {}
  
    ngOnInit(): void {
      this.getServiceRequestByStatus(); // Chama o método ao iniciar o componente
      //this.getServiceRequests();
    }


    //GET: returns all costs supports saved in database.
    getServiceRequests() : void {
      console.log(AuthService.SessionContext.userId);
      this.serviceRequestService.getServiceRequest().subscribe(serviceRequests => this.serviceRequests = serviceRequests)
      }

    

    //GET: returns all costs supports saved in database.
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
        this.message = 'Status atualizado com sucesso';
        setTimeout(() => {
        location.reload();
        }, 1000);
        // Seu código para enviar os dados e realizar as operações necessárias
        // Depois de fazer o envio e atualização, você pode recarregar a página assim:
        
      }

}
