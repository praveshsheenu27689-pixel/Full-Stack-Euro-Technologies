import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contactForm!: FormGroup;
  faqs = [
    {
      question: 'What are the prerequisites for joining?',
      answer: 'No prior coding experience required for beginner courses. Basic computer knowledge and passion to learn are enough.',
      isOpen: false
    },
    {
      question: 'What is the duration of the course?',
      answer: 'Course duration varies from 3 to 6 months depending on the program.',
      isOpen: false
    },
    {
      question: 'Do you provide placement assistance?',
      answer: 'Yes, we provide 100% placement assistance including resume building and mock interviews.',
      isOpen: false
    },
    {
      question: 'What is the fee structure?',
      answer: 'Course fees range from ₹29,999 to ₹49,999 depending on the program.',
      isOpen: false
    },
    {
      question: 'Can I pay in installments?',
      answer: 'Yes, we offer flexible EMI options with zero interest on selected payment methods.',
      isOpen: false
    }
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      course: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      console.log(this.contactForm.value);
      // Simulate API call
      setTimeout(() => {
        this.contactForm.reset();
        // Show success message
        if (typeof window !== 'undefined') {
          const event = new CustomEvent('showToast', { 
            detail: { message: 'Thank you! We will get back to you soon.', type: 'success' } 
          });
          window.dispatchEvent(event);
        }
      }, 500);
    } else {
      // Show error message
      if (typeof window !== 'undefined') {
        const event = new CustomEvent('showToast', { 
          detail: { message: 'Please fill in all required fields correctly.', type: 'error' } 
        });
        window.dispatchEvent(event);
      }
    }
  }

  toggleFaq(index: number) {
    this.faqs[index].isOpen = !this.faqs[index].isOpen;
  }
}
