import {Injectable, inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, forkJoin, map} from 'rxjs';

import {
  Project,
  Publication,
  SkillCategory,
  Experience,
  Education,
  Certificate,
  Language
} from '../shared/models';

export interface PortfolioData {
  projects: Project[];
  publications: Publication[];
  skills: SkillCategory[];
  experience: Experience[];
  education: Education[];
  certificates: Certificate[];
  languages: Language[];
}

@Injectable({
  providedIn: 'root'
})

export class DataService {
  private base = 'assets/data';

  constructor(private http: HttpClient) {
  }

  // Carga individual
  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.base}/projects.json`);
  }

  getPublications(): Observable<Publication[]> {
    return this.http.get<Publication[]>(`${this.base}/publications.json`);
  }

  getSkills(): Observable<SkillCategory[]> {
    return this.http.get<SkillCategory[]>(`${this.base}/skills.json`);
  }

  getExperience(): Observable<Experience[]> {
    return this.http.get<Experience[]>(`${this.base}/experience.json`);
  }

  getEducation(): Observable<Education[]> {
    return this.http.get<Education[]>(`${this.base}/education.json`);
  }

  getCertificates(): Observable<Certificate[]> {
    return this.http.get<Certificate[]>(`${this.base}/certificates.json`);
  }

  getLanguages(): Observable<Language[]> {
    return this.http.get<Language[]>(`${this.base}/languages.json`);
  }

  // Carga completa (Pre-load)

  getAllData()
    :
    Observable<PortfolioData> {
    return forkJoin({
      projects: this.getProjects(),
      publications: this.getPublications(),
      skills: this.getSkills(),
      experience: this.getExperience(),
      education: this.getEducation(),
      certificates: this.getCertificates(),
      languages: this.getLanguages()
    });
  }

  // Búsqueda

  getFeaturedProjects()
    :
    Observable<Project[]> {
    return this.getProjects().pipe(
      map(projects => projects.filter(p => p.featured))
    );
  }

  getTierProjects(tier
                  :
                    1 | 2 | 3
  ):
    Observable<Project[]> {
    return this.getProjects().pipe(
      map(projects => projects.filter(p => p.tier === tier))
    );
  }

  getPublicationsByYear(year
                        :
                        string
  ):
    Observable<Publication[]> {
    return this.getPublications().pipe(
      map(pubs => pubs.filter(p => p.year === year))
    );
  }

  getPublicationsByTopic(topic
                         :
                         string
  ):
    Observable<Publication[]> {
    return this.getPublications().pipe(
      map(pubs => pubs.filter(p => p.topic === topic))
    );
  }
}
