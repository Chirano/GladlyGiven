import { Component } from '@angular/core';
import { CostSupport } from 'src/app/classes/CostSupport';
import { CostSupportServiceService } from 'src/app/services/cost-support/cost-support-service.service';

@Component({
  selector: 'app-view-costsupport-service-provider',
  templateUrl: './view-costsupport-service-provider.component.html',
  styleUrls: ['./view-costsupport-service-provider.component.scss'],
})
export class ViewCostsupportServiceProviderComponent {

  costSupport: CostSupport = {
    dateOfAppointment: '',
    refugeeFirstName: '',
    refugeeLastName: '',
    type: 0,
    amount: 0,
    description: '',
    dateRequest: '',
    serviceProviderId: 0,
  };

  /*
  confirmationMsg = '';
  success = false;

  constructor(private costSupportService: CostSupportServiceService) {}*/

  //VERIFICAR SE O SERVICEPROVIDERID FICA COMO PARÂMETRO.
  /*addCostSupport(
    dateOfAppointment: string,
    refugeeFirstName: string,
    refugeeLastName: string,
    type: number,
    amount: number,
    description: string,
    serviceProviderId: number
  ): void {

    this.costSupportService
      .addCostSupport({
        dateOfAppointment,
        refugeeFirstName,
        refugeeLastName,
        type,
        amount,
        description,
        serviceProviderId,
      } as CostSupport)
      .subscribe({
        next: (costSupport) => {
          this.costSupport = costSupport;
          this.success = true;
          this.confirmationMsg = 'Cost support request sent successfully!';
        },
        error: (error) => {
          console.error('Failed to send cost support request:', error);
        },
      });
  }*/
}
