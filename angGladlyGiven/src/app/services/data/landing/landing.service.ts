import { Injectable } from '@angular/core';
import { Observable, catchError, filter, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventManagerService } from '../../events/event-manager.service';

@Injectable({
  providedIn: 'root'
})

export class LandingService {

  private helloJavaURL = "http://localhost:8080//api/landing";
  private helloDotNetURL = "https://localhost:7280/api/landing";

  constructor(
      private http: HttpClient
  ) {
    EventManagerService.OnJavaHello.subscribe(() => this.getHelloFromJava().subscribe());
    EventManagerService.OnDotNetHello.subscribe(() => this.getHelloFromDotNet().subscribe());
  }


  // API Hello
  // -------------------------

  // if we get error: "expected header etc" it isn't returning a JSON from Server

  getHelloFromJava() : Observable<string> {
    const hello = this.http.get<string>(this.helloJavaURL); 
    return hello;
  }

  getHelloFromDotNet() : Observable<string> {
    const hello = this.http.get<string>(this.helloDotNetURL); 
    return hello;
  }
}
