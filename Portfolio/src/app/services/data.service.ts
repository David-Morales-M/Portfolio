import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private http = inject(HttpClient);

  getProjects() {
    return this.http.get('assets/data/projects.json');
  }

  getCertificates() {
    return this.http.get('assets/data/certificates.json');
  }

  getPublications() {
    return this.http.get('assets/data/publications.json');
  }

  getSkills() {
    return this.http.get('assets/data/skills.json');
  }
}
