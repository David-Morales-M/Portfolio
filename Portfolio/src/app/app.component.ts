import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {CardComponent} from './card/card.component';
import {CertificatesComponent} from './certificates/certificates.component';
import {ProjectsComponent} from './projects/projects.component';
import {NavbarComponent} from './navbar/navbar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ProjectsComponent, CardComponent,CertificatesComponent, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Portfolio';
}
