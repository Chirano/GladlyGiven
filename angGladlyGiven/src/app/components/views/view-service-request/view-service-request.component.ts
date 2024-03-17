import { Component, OnInit } from '@angular/core';
import { format } from 'date-fns';
import { ServiceRequest } from 'src/app/classes/ServiceRequest';
import { ServiceRequestJava } from 'src/app/classes/ServiceRequestJava';
import { RouterPaths } from 'src/app/classes/routing/RoutePaths';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { EventManagerService } from 'src/app/services/events/event-manager.service';
import { ServiceRequestService } from 'src/app/services/service-request/service-request.service';


@Component({
  selector: 'app-view-service-request',
  templateUrl: './view-service-request.component.html',
  styleUrls: ['./view-service-request.component.scss']
})
export class ViewServiceRequestComponent {

  currentDate: string = format (new Date(), 'dd/MM/yyyy');

  serviceRequest: ServiceRequest = {
   id                 : 0,
   dateRequest        : this.currentDate = format(new Date(), 'dd/MM/yyyy'),
   idCategory         : 0,
   description        : '',
   status             : 0,
};  

serviceRequestJava: ServiceRequestJava = {
 
 
  idCategory         : 0,
  description        : '',
 
};  

serviceRequests: ServiceRequest[]=[];
serviceRequestJavas: ServiceRequestJava[]=[];

confirmationMsg = '';
sucess = false;


constructor(
  private serviceRequestService : ServiceRequestService){}
 
ngOnInit(): void {
  this.mostrarDataAtual()
   
  }

  mostrarDataAtual(): void {
    const dataAtual = new Date();
    const dia = dataAtual.getDate();
    const mes = dataAtual.getMonth() + 1;
    const ano = dataAtual.getFullYear();

    this.currentDate = `${dia}/${mes}/${ano}`;
  }


  registerNewServiceRequest(id: number, dateRequest: string, idCategory: number, description: string, status: number): void {
    // Call the request service to create the Service Request
    this.serviceRequestService.registerNewServiceRequest({
      id,
      dateRequest,
      idCategory,
      description,
      status,
    } as ServiceRequest)
      .subscribe({
        next: (registerNewServiceRequest) => {
          // Handle the created Service Request as needed
          console.log('Register created:', registerNewServiceRequest);
          // Optionally, update UI or perform any additional actions here
          this.serviceRequest = registerNewServiceRequest;
        },
        error: (error) => {
          console.error('Failed to create Service Request', error);
          // Optionally, show an error message to the user
        }
      });
  }
  getCategoryString(idCategory: number): string {
    return this.serviceRequestService.getIdCategoryString(idCategory);
  }

  registerNewServiceRequestJava(idCategory: number, description: string): void {
    // Call the request service to create the Service Request
    this.serviceRequestService.registerNewServiceRequestJava({
  
      idCategory,
      description,

    } as ServiceRequestJava)
      .subscribe({
        next: (registerNewServiceRequestJava) => {
          // Handle the created Service Request as needed
          console.log('Register create:', registerNewServiceRequestJava);
          // Optionally, update UI or perform any additional actions here
          this.serviceRequestJava = registerNewServiceRequestJava;
        },
        error: (error) => {
          console.error('Failed to create Service Request', error);
          // Optionally, show an error message to the user
        }
      });
  }

  toListServiceRequest() {
    EventManagerService.OnRouteEvent.emit(RouterPaths.ViewListServiceRequest);
  }

  message: string = '';
  submitForm() {
    this.message = 'New service request successful!';
    setTimeout(() => {
    location.reload();
    }, 2000);
  }

}
