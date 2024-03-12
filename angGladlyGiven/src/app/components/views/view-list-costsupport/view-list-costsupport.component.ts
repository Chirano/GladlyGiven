//Author: Lia Araruna

import { Component } from '@angular/core';
import { CostSupport } from 'src/app/classes/CostSupport';
import { CostSupportServiceService } from 'src/app/services/cost-support/cost-support-service.service';

@Component({
  selector: 'app-view-list-costsupport',
  templateUrl: './view-list-costsupport.component.html',
  styleUrls: ['./view-list-costsupport.component.scss']
})
export class ViewListCostsupportComponent {

  costSupports: CostSupport[] = [];

  constructor(
    private costSupportService : CostSupportServiceService
  ) { }

  /*ngOnInit(): void {
    this.getCostSupports(userId : number); // Chama o método ao iniciar o componente
  }

  getCostSupports() : void {
    this.costSupportService.getCostSupports(userId : number).subscribe(costSupports => this.costSupports = costSupports);
  }*/

}
