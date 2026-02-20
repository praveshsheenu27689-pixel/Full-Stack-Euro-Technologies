import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth-modal',
  templateUrl: './auth-modal.component.html',
  styleUrls: ['./auth-modal.component.css']
})
export class AuthModalComponent implements OnInit {
  showModal = false;
  isLogin = true;

  ngOnInit() {
    const hasVisited = sessionStorage.getItem('hasVisited');
    if (!hasVisited) {
      setTimeout(() => {
        this.showModal = true;
      }, 2000);
    }
  }

  toggleForm() {
    this.isLogin = !this.isLogin;
  }

  closeModal() {
    this.showModal = false;
    sessionStorage.setItem('hasVisited', 'true');
  }

  skipModal() {
    this.showModal = false;
    sessionStorage.setItem('hasVisited', 'true');
  }

  onLogin(form: any) {
    if (form.valid) {
      console.log('Login:', form.value);
      this.closeModal();
      const event = new CustomEvent('showToast', { 
        detail: { message: 'Login successful! Welcome back.', type: 'success' } 
      });
      window.dispatchEvent(event);
    }
  }

  onRegister(form: any) {
    if (form.valid) {
      console.log('Register:', form.value);
      this.closeModal();
      const event = new CustomEvent('showToast', { 
        detail: { message: 'Registration successful! Welcome to DevBootcamp.', type: 'success' } 
      });
      window.dispatchEvent(event);
    }
  }
}
