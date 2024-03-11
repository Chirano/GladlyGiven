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
    appointmentId: 0,
    type: 0,
    amount: 0,
    description: '',
    dateRequest: '',
    serviceProviderId: 0,
  };

  costSupports: CostSupport[] = [];

  confirmationMsg = '';
  success = false;

  constructor(
    private costSupportService: CostSupportServiceService
  ) {}

  getCostSupports(userId : number) : void {
    this.costSupportService.getCostSupports(userId).subscribe(costSupports => this.costSupports = costSupports);
  }

  //VERIFICAR SE O SERVICEPROVIDERID FICA COMO PARÂMETRO.
  addCostSupport(
    appointmentId: number,
    type: number,
    amount: number,
    description: string,
    serviceProviderId: number
  ): void {
    this.costSupportService.addCostSupport({
        appointmentId,
        type,
        amount,
        description,
        serviceProviderId,
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
