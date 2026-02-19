import { Component } from '@angular/core';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { LoadingService } from './services/loading.service';
import { DarkModeService } from './services/dark-mode.service';
import { ErrorHandlerService, ErrorMessage } from './services/error-handler.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'DevBootcamp';
  isLoading = false;
  isDarkMode = false;
  errorMessage: ErrorMessage | null = null;

  constructor(
    private router: Router,
    public loadingService: LoadingService,
    public darkModeService: DarkModeService,
    public errorHandlerService: ErrorHandlerService
  ) {
    this.loadingService.loading$.subscribe(loading => {
      this.isLoading = loading;
    });

    this.darkModeService.darkMode$.subscribe(isDark => {
      this.isDarkMode = isDark;
    });

    this.errorHandlerService.error$.subscribe(error => {
      this.errorMessage = error;
    });

    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.loadingService.show();
      }
      if (event instanceof NavigationEnd) {
        setTimeout(() => {
          this.loadingService.hide();
        }, 500);
        window.scrollTo(0, 0);
      }
    });

    // Listen for custom toast events
    if (typeof window !== 'undefined') {
      window.addEventListener('showToast', (event: any) => {
        const { message, type } = event.detail;
        if (type === 'success') {
          this.errorHandlerService.showSuccess(message);
        } else if (type === 'error') {
          this.errorHandlerService.showError(message);
        } else if (type === 'warning') {
          this.errorHandlerService.showWarning(message);
        } else {
          this.errorHandlerService.showInfo(message);
        }
      });
    }
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  toggleDarkMode() {
    this.darkModeService.toggleDarkMode();
  }

  closeToast() {
    this.errorHandlerService.hide();
  }
}
