import { Injectable } from '@angular/core';
import { SessionContext } from 'src/app/classes/authentication/SessionContext';
import { AuthService } from '../authentication/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Availability } from 'src/app/classes/Availability';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AvailabilityService {

  private java = 'http://localhost:8080';

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


  addAvailability(availability: Availability): Observable<Availability> {
    const newAvailability: Availability = {
      id : availability.id,
      serviceProviderId: availability.serviceProviderId,
      startDate: availability.startDate,
      endDate : availability.endDate,
      startTime: availability.startTime,
      endTime : availability.endTime,
    };

    return this.http.post<any>(
      this.java + "/api/serviceProvider/availability", // http://localhost:8080/api/serviceProvider/availability
      newAvailability, this.httpOptions
    );
  }
}
