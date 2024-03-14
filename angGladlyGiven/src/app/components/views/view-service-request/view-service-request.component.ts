import { Component, OnInit } from '@angular/core';
import { format } from 'date-fns';
import { ServiceRequest } from 'src/app/classes/ServiceRequest';
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

serviceRequests: ServiceRequest[]=[];

confirmationMsg = '';
sucess = false;


constructor(
  private serviceRequestService : ServiceRequestService){}
 
ngOnInit(): void {
  this.mostrarDataAtual()
   // this.donation.donorId = AuthService.SessionContext.userId; 
  }

  mostrarDataAtual(): void {
    const dataAtual = new Date();
    const dia = dataAtual.getDate();
    const mes = dataAtual.getMonth() + 1;
    const ano = dataAtual.getFullYear();

    this.currentDate = `${dia}/${mes}/${ano}`;
  }


  registerNewServiceRequest(id: number, dateRequest: string, idCategory: number, description: string, status: number): void {
    // Call the donation service to create the donation
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

  toListServiceRequest() {
    EventManagerService.OnRouteEvent.emit(RouterPaths.ViewListServiceRequest);
  }

}
