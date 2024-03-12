import { Component } from '@angular/core';
import { CostSupport } from 'src/app/classes/CostSupport';
import { CostSupportServiceService } from 'src/app/services/cost-support/cost-support-service.service';


@Component({
  selector: 'app-view-admin-list-costsupport',
  templateUrl: './view-admin-list-costsupport.component.html',
  styleUrls: ['./view-admin-list-costsupport.component.scss']
})
export class ViewAdminListCostsupportComponent {

  costSupports: CostSupport[] = [];

  constructor(
    private costSupportService : CostSupportServiceService
  ) { }

  ngOnInit(): void {
    this.getCostSupports(); // Chama o método ao iniciar o componente
  }

  //GET: returns all costs supports saved in database.
  getCostSupports() : void {
    this.costSupportService.getCostSupports().subscribe(costSupports => this.costSupports = costSupports);
  }

}
