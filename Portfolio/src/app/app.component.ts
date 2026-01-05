import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {CardComponent} from './components/card/card.component';
import {CertificatesComponent} from './components/certificates/certificates.component';
import {ProjectsComponent} from './components/projects/projects.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {ApplicationConfig} from '@angular/core';
import {provideHttpClient} from '@angular/common/http';
import {DataService} from './services/data.service';
import {PublicationsComponent} from './components/publications/publications.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ProjectsComponent, CardComponent, CertificatesComponent, NavbarComponent, PublicationsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Portfolio';

  projects: any[] = [];

  certificates: any[] = [];

  publications: any[] = [];

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    this.dataService.getProjects().subscribe((data: any) => {
      this.projects = data;
    });
    this.dataService.getCertificates().subscribe((data: any) => {
      this.certificates = data;
    });
    this.dataService.getPublications().subscribe((data: any) => {
      this.publications = data;
    });

  }
}
