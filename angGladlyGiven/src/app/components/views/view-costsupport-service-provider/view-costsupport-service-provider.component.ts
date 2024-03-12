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
    id : 0,
    amount: 0,
    description: '',
    appointmentId: 0,
    serviceProviderId: 0,
    type: 0,
    dateRequest: '',
  };

  costSupports: CostSupport[] = [];

  confirmationMsg = '';
  success = false;

  constructor(
    private costSupportService: CostSupportServiceService
  ) {}

  getCostSupports() : void {
    this.costSupportService.getCostSupports().subscribe(costSupports => this.costSupports = costSupports);
  }

  //VERIFICAR SE O SERVICEPROVIDERID FICA COMO PARÂMETRO.
  addCostSupport(
    id: number,
    amount: number,
    description: string,
    appointmentId: number,
    serviceProviderId: number,
    type: number,
    dateRequest: string
  ): void {
    this.costSupportService.addCostSupport({
        id,
        amount,
        description,
        appointmentId,
        serviceProviderId,
        type,
        dateRequest
      } as CostSupport)
      .subscribe({
        next: (addedCostSupport) => {
          this.costSupport = addedCostSupport;
          this.success = true;
          this.confirmationMsg = 'Cost support request sent successfully!';
        },
        error: (error) => {
          console.error('Failed to send cost support request:', error);
        },
      });
  }
}
