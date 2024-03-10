import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { CostSupport } from 'src/app/classes/CostSupport';

@Injectable({
  providedIn: 'root'
})
export class CostSupportServiceService {
  //Preencher!!!
  //private dotNet = '';

  /*
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient ) { }*/

  /*POST: add a new costSupport request to the database 
  addCostSupport(costSupport: CostSupport): Observable<CostSupport> {

    const newCostSupport: CostSupport = {
      dateOfAppointment: costSupport.dateOfAppointment,
      refugeeFirstName: costSupport.refugeeFirstName,
      refugeeLastName: costSupport.refugeeLastName,
      type: costSupport.type,
      amount: costSupport.amount,
      description: costSupport.description,
      dateRequest: this.formatDate(new Date()), //Data atual.
      serviceProviderId: costSupport.serviceProviderId
    };

    return this.http.post<CostSupport>(this.dotNet, newCostSupport, this.httpOptions)
  }

  //Método para formatar a data de Date para String.
  formatDate(date: Date): string {
    const dateOfAppointment : Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return date.toLocaleDateString('pt-PT', dateOfAppointment);
  }*/


}
