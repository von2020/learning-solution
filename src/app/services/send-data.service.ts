import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SendDataService {

  message : String;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  setMessage(data) {
    this.message = data
  }

  getMessage() {
    return this.message
  }

  removeMessage() {
    this.message = null
  }
}
