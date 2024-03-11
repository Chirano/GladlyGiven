import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { CostSupport } from 'src/app/classes/CostSupport';

@Injectable({
  providedIn: 'root',
})
export class CostSupportServiceService {
  private dotNet = 'https://localhost:7280';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json',
    'Accept': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  /* GET : */
  getCostSupports(): Observable<CostSupport[]> {
    // let v = this.http.get<CostSupport[]>(this.dotNet).subscribe((costSupports: CostSupport[]) => {
    //   console.log('Lista de Cost Supports:', costSupports);
    // });
    // console.log(v);
    return this.http.get<CostSupport[]>(this.dotNet + "/costsupports");
  }

  /* POST: add a new costSupport request to the database */
  addCostSupport(costSupport: CostSupport): Observable<CostSupport> {
    const newCostSupport: CostSupport = {
      id : costSupport.id,
      amount: costSupport.amount,
      description: costSupport.description,
      appointmentId: costSupport.appointmentId,
      serviceProviderId: costSupport.serviceProviderId,
      type: costSupport.type,
      dateRequest: this.formatDate(new Date()), //Data atual.
    };
console.log(newCostSupport);
    return this.http.post<any>(
      this.dotNet + "/costsupport", // https://localhost:7280/costsupport
      newCostSupport, this.httpOptions
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
