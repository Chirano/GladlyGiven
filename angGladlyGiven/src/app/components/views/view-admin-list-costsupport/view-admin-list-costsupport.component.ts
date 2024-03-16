import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CostSupport } from 'src/app/classes/CostSupport';
import { CostSupportServiceService } from 'src/app/services/cost-support/cost-support-service.service';


@Component({
  selector: 'app-view-admin-list-costsupport',
  templateUrl: './view-admin-list-costsupport.component.html',
  styleUrls: ['./view-admin-list-costsupport.component.scss']
})
export class ViewAdminListCostsupportComponent {

  costSupports: CostSupport[] = [];
  costSuportId : number = 0;
  paymentMessage : string = " ";
  rejectmessage : string = " ";

  constructor(
    private costSupportService : CostSupportServiceService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getCostSupports(); // Chama o método ao iniciar o componente
  }

  //GET: returns all costs supports saved in database.
  getCostSupports() : void {
    this.costSupportService.getPendingCostSupports().subscribe(costSupports => this.costSupports = costSupports);
  }

  acceptCostSupport(costSupportId: number) : void {
    this.costSupportService.addCostSupportPayment(costSupportId).subscribe({
      next:(paymentMessage) => 
      { this.paymentMessage = paymentMessage; 
        console.log(paymentMessage);
        this.getCostSupports();
      }
    });
  }

  rejectCostSupport(costSupportId: number) : void {
    this.costSupportService.rejectCostSupport(costSupportId).subscribe({
      next:(rejectmessage) => 
      { this.rejectmessage = rejectmessage; 
        console.log(rejectmessage);
        this.getCostSupports();
      }
    });
  }
}

