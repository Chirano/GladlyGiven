//Author: Lia Araruna

import { Component } from '@angular/core';
import { CostSupport } from 'src/app/classes/CostSupport';
import { CostSupportServiceService } from 'src/app/services/cost-support/cost-support-service.service';
import { AuthService } from 'src/app/services/authentication/auth.service';

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

  ngOnInit(): void {
    this.getCostSupportsByUserId(); // Chama o método ao iniciar o componente
  }

  getCostSupportsByUserId() : void {
    console.log(AuthService.SessionContext.userId);
    this.costSupportService.getCostSupportsByUserId(
      AuthService.SessionContext.userId).subscribe(
        costSupports => this.costSupports = costSupports);
  }

}
