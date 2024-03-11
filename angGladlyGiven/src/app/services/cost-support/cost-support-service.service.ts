import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { CostSupport } from 'src/app/classes/CostSupport';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CostSupportServiceService {
  //Preencher!!!
  private dotNet = '';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  getCostSupports(): Observable<CostSupport[]> {
    // let v = this.http.get<CostSupport[]>(this.dotNet).subscribe((costSupports: CostSupport[]) => {
    //   console.log('Lista de Cost Supports:', costSupports);
    // });
    // console.log(v);
    return this.http.get<CostSupport[]>(this.dotNet);
  }

  /*POST: add a new costSupport request to the database*/
  addCostSupport(costSupport: CostSupport): Observable<CostSupport> {
    const newCostSupport: CostSupport = {
      appointmentId: costSupport.appointmentId,
      type: costSupport.type,
      amount: costSupport.amount,
      description: costSupport.description,
      dateRequest: this.formatDate(new Date()), //Data atual.
      serviceProviderId: costSupport.serviceProviderId,
    };

    return this.http.post<CostSupport>(
      this.dotNet,
      newCostSupport,
      this.httpOptions
    );
  }

  //Método para converter a data de Date para string.
  formatDate(date: Date): string {
    const dateOfAppointment: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    };
    return date.toLocaleDateString('pt-PT', dateOfAppointment);
  }
}
