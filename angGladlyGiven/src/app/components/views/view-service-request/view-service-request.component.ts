import { Component, OnInit } from '@angular/core';
import { ServiceRequest } from 'src/app/classes/ServiceRequest';
import { RouterPaths } from 'src/app/classes/routing/RoutePaths';
import { EventManagerService } from 'src/app/services/events/event-manager.service';


@Component({
  selector: 'app-view-service-request',
  templateUrl: './view-service-request.component.html',
  styleUrls: ['./view-service-request.component.scss']
})
export class ViewServiceRequestComponent implements OnInit{
  private serviceRequest: ServiceRequest | null = null;
  currentDate: string | undefined;

  constructor() { }

  ngOnInit(): void {
    this.mostrarDataAtual();
  }

  mostrarDataAtual(): void {
    const dataAtual = new Date();
    const dia = dataAtual.getDate();
    const mes = dataAtual.getMonth() + 1;
    const ano = dataAtual.getFullYear();

    this.currentDate = `${dia}/${mes}/${ano}`;
  }

  registerNewServiceRequest(form: any) {
  
    if (form.valid) {
      // Access form controls using refugeeForm.controls
      this.serviceRequest = {
        // app user:
        id                 : -1,
        dateRequest        : form.value.dataRequest,
        idCategory         : [],
        description        : form.value.description,
        status             : form.value.status,
      };
      
      // console.log(this.refugee);
      EventManagerService.OnSignUpServiceRequestEvent.emit(this.serviceRequest);
    } else {
      console.log("Form is invalid");
    }
  }

  toListServiceRequest() {
    EventManagerService.OnRouteEvent.emit(RouterPaths.ViewListServiceRequest);
  }

}
