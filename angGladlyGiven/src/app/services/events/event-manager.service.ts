// Author: Tiago Barracha ti.barracha@gmail.com

import { Injectable, EventEmitter } from '@angular/core';
import { AuthDetails } from 'src/app/classes/AuthDetails';

@Injectable({
  providedIn: 'root'
})

export class EventManagerService {

  // static events
  static OnAuthEvent: EventEmitter<AuthDetails> = new EventEmitter<AuthDetails>();

  constructor() { }
}
