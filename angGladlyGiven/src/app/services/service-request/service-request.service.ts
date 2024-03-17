import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceRequest } from 'src/app/classes/ServiceRequest';
import { SessionContext } from 'src/app/classes/authentication/SessionContext';
import { AuthService } from '../authentication/auth.service';
import { ServiceRequestJava } from 'src/app/classes/ServiceRequestJava';

@Injectable({
  providedIn: 'root'
})
export class ServiceRequestService {

  
  private dotNet = 'https://localhost:7280';
  private java = "http://localhost:8080/api/";

  
  userId: number | null = null;
  sessionContext: SessionContext | null = AuthService.SessionContext;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json',
    'Accept': 'application/json' }),
  };

  getIdCategoryString(idCategory: number): string {
    const categoryMap: Record<number, string> = {
      1: 'Medicine',
      2: 'Nurse',
      3: 'Dentist',
      4: 'Psychology'
    };
    return categoryMap[idCategory] || 'unknown';
  }
  

 constructor(private http: HttpClient) {
    
  }
  /* POST: add a new Service request to the database */
  registerNewServiceRequest(serviceRequest: ServiceRequest): Observable<ServiceRequest> {
    const newServiceRequest: ServiceRequest = {
      id : serviceRequest.id,
      dateRequest : serviceRequest.dateRequest,
      idCategory : serviceRequest.idCategory,
      description : serviceRequest.description,
      status : serviceRequest.status
    };
    console.log(newServiceRequest);
    
    return this.http.post<any>(
      this.dotNet + "/servicerequest",
      newServiceRequest, this.httpOptions
    );
  }
  /* GET : */
  getServiceRequest(): Observable<ServiceRequest[]> {
    return this.http.get<ServiceRequest[]>(this.dotNet + "/servicerequests");
    }

   /* GET all pending service request status 0  */
  getServiceRequestByStatus(status : number): Observable<ServiceRequest[]> {
    return this.http.get<ServiceRequest[]>(this.dotNet + "/servicerequest/status/"+0);
  }



  message: string = '';
    /* PUT: add a new Service request to the database */
  statusUpdateServiceRequest(serviceRequest: ServiceRequest): Observable<ServiceRequest> {
    const updateServiceRequest: ServiceRequest = {
      
      id : serviceRequest.id,
      dateRequest : serviceRequest.dateRequest,
      idCategory : serviceRequest.idCategory,
      description : serviceRequest.description,
      status : serviceRequest.status
      };
      
      console.log(updateServiceRequest);
      
    return this.http.put<any>(
      this.dotNet + "/servicerequest/"+serviceRequest.id,
      updateServiceRequest, this.httpOptions
      );

  }

    /* POST: add a new Service request to the database */
    registerNewServiceRequestJava(serviceRequestJava: ServiceRequestJava): Observable<ServiceRequestJava> {
      const newServiceRequestJava: ServiceRequestJava = {
        description : serviceRequestJava.description,
        idCategory : serviceRequestJava.idCategory,
      };
      console.log(this.getIdCategoryString(serviceRequestJava.idCategory));
      
      const categoryStr = this.getIdCategoryString(serviceRequestJava.idCategory);
      console.log(`A categoria correspondente ao ID é: ${serviceRequestJava.idCategory}`);
      return this.http.post<any>(
        this.java + "healthservice?description="+serviceRequestJava.description+"&category="+this.getIdCategoryString(serviceRequestJava.idCategory),
        newServiceRequestJava, this.httpOptions
      );

      
      //http://localhost:8080/api/healthservice?description=teste113&category=Medicine
    }

    
    
}
