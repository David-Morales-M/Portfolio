import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {CardComponent} from './card/card.component';
import {CertificatesComponent} from './certificates/certificates.component';
import {ProjectsComponent} from './projects/projects.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ProjectsComponent, CardComponent,CertificatesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Portfolio';
}
