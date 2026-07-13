import {Component} from '@angular/core';
import {NavbarComponent} from './components/navbar/navbar.component';
import {HeroComponent} from './components/hero/hero.component';
import {AboutComponent} from './components/about/about.component';
import {ProjectsComponent} from './components/projects/projects.component';
import {PublicationsComponent} from './components/publications/publications.component';
import {CertificatesComponent} from './components/certificates/certificates.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavbarComponent, HeroComponent, AboutComponent, ProjectsComponent, PublicationsComponent, CertificatesComponent],
  template: `
    <app-navbar/>
    <main>
      <app-hero/>
      <app-about/>
      <app-projects/>
      <app-publications/>
      <app-certificates/>
    </main>
  `,
  styleUrl: './app.component.scss'
})

export class AppComponent {
  title = 'Portfolio';
}
