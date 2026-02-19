import { Directive, ElementRef, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[appLazyLoad]'
})
export class LazyLoadDirective implements AfterViewInit {
  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    const options = {
      root: null,
      rootMargin: '50px',
      threshold: 0.01
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target as HTMLElement;
          
          if (element.tagName === 'IMG') {
            const img = element as HTMLImageElement;
            const src = img.getAttribute('data-src');
            if (src) {
              img.src = src;
              img.classList.add('loaded');
            }
          } else {
            element.classList.add('loaded');
          }
          
          observer.unobserve(element);
        }
      });
    }, options);

    observer.observe(this.el.nativeElement);
  }
}
