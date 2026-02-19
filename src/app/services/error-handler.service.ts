import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ErrorMessage {
  message: string;
  type: 'error' | 'success' | 'warning' | 'info';
}

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  private errorSubject = new BehaviorSubject<ErrorMessage | null>(null);
  public error$ = this.errorSubject.asObservable();

  showError(message: string) {
    this.errorSubject.next({ message, type: 'error' });
    this.autoHide();
  }

  showSuccess(message: string) {
    this.errorSubject.next({ message, type: 'success' });
    this.autoHide();
  }

  showWarning(message: string) {
    this.errorSubject.next({ message, type: 'warning' });
    this.autoHide();
  }

  showInfo(message: string) {
    this.errorSubject.next({ message, type: 'info' });
    this.autoHide();
  }

  hide() {
    this.errorSubject.next(null);
  }

  private autoHide() {
    setTimeout(() => {
      this.hide();
    }, 5000);
  }
}
