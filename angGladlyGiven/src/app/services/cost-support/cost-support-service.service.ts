import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { CostSupport } from 'src/app/classes/CostSupport';
import { SessionContext } from 'src/app/classes/authentication/SessionContext';
import { AuthService } from '../authentication/auth.service';

@Injectable({
  providedIn: 'root',
})
export class CostSupportServiceService {
  private dotNet = 'https://localhost:7280';

  userId: number | null = null;
  sessionContext: SessionContext | null = AuthService.SessionContext;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json',
    'Accept': 'application/json' }),
  };

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { 
  }


  /* GET all cost suports in database.  */
  getCostSupports(): Observable<CostSupport[]> {
    let page = 1;
    let size = 5;

    return this.http.get<CostSupport[]>(this.dotNet + "/costsupports?page="+page+"&pageSize="+size);
  }

  /* GET all cost suports by service provider id.  */
  getCostSupportsByUserId(userId : number): Observable<CostSupport[]> {
    let page = 1;
    let size = 5;

    return this.http.get<CostSupport[]>(this.dotNet + "/CostSupport/mycostsupports/"+userId+"?page="+page+"&pageSize="+ size);
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

    return this.http.post<any>(
      this.dotNet + "/costsupport", // https://localhost:7280/costsupport
      newCostSupport, this.httpOptions
    );
  }

  //Método para converter a data de Date para string.
  formatDate(date: Date): string {
    const dateOfAppointment: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    };
    return date.toLocaleDateString('en-US', dateOfAppointment);
  }

}
