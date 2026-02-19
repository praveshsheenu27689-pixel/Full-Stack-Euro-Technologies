import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DarkModeService {
  private darkModeSubject = new BehaviorSubject<boolean>(false);
  public darkMode$ = this.darkModeSubject.asObservable();

  constructor() {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode === 'true') {
      this.enableDarkMode();
    }
  }

  toggleDarkMode() {
    const isDark = this.darkModeSubject.value;
    if (isDark) {
      this.disableDarkMode();
    } else {
      this.enableDarkMode();
    }
  }

  enableDarkMode() {
    document.body.classList.add('dark-mode');
    this.darkModeSubject.next(true);
    localStorage.setItem('darkMode', 'true');
  }

  disableDarkMode() {
    document.body.classList.remove('dark-mode');
    this.darkModeSubject.next(false);
    localStorage.setItem('darkMode', 'false');
  }

  isDarkMode(): boolean {
    return this.darkModeSubject.value;
  }
}
