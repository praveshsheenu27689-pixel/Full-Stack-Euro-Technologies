import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ServicesComponent } from './components/services/services.component';
import { TrainingComponent } from './components/training/training.component';
import { PlacementComponent } from './components/placement/placement.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';
import { ContactComponent } from './components/contact/contact.component';

const routes: Routes = [
  { path: '', component: HomeComponent, data: { animation: 'HomePage' } },
  { path: 'about', component: AboutComponent, data: { animation: 'AboutPage' } },
  { path: 'services', component: ServicesComponent, data: { animation: 'ServicesPage' } },
  { path: 'training', component: TrainingComponent, data: { animation: 'TrainingPage' } },
  { path: 'placement', component: PlacementComponent, data: { animation: 'PlacementPage' } },
  { path: 'portfolio', component: PortfolioComponent, data: { animation: 'PortfolioPage' } },
  { path: 'testimonials', component: TestimonialsComponent, data: { animation: 'TestimonialsPage' } },
  { path: 'contact', component: ContactComponent, data: { animation: 'ContactPage' } },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
