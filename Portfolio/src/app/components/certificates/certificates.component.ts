import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { DataService } from '../../services/data.service';
import { SkillCategory, Certificate } from '../../shared/models';

interface Conference {
  id       : number;
  paper    : string;
  event    : string;
  organizer: string;
  year     : string;
  fileUrl  : string;
}

@Component({
  selector   : 'app-certificates',
  standalone : true,
  imports    : [CommonModule],
  templateUrl: './certificates.component.html',
  styleUrl   : './certificates.component.scss'
})
export class CertificatesComponent implements OnInit {

  skills      = signal<SkillCategory[]>([]);
  tier1Certs  = signal<Certificate[]>([]);
  tier2Certs  = signal<Certificate[]>([]);
  conferences = signal<Conference[]>([]);
  showTier2   = signal(false);

  constructor(
    private dataService: DataService,
    private http       : HttpClient
  ) {}

  ngOnInit(): void {
    this.dataService.getSkills().subscribe(data => {
      this.skills.set(data);
    });

    this.dataService.getCertificates().subscribe((data: any[]) => {
      this.tier1Certs.set(data.filter((c: any) => c.tier === 1));
      this.tier2Certs.set(data.filter((c: any) => c.tier === 2));
    });

    this.http.get<Conference[]>('assets/data/conferences.json').subscribe(data => {
      this.conferences.set(data);
    });
  }

  toggleTier2(): void {
    this.showTier2.update(v => !v);
  }

  getLevelWidth(level: string): string {
    const widths: Record<string, string> = {
      'expert'    : '90%',
      'proficient': '65%',
      'familiar'  : '35%'
    };
    return widths[level] ?? '0%';
  }

  getLevelLabel(level: string): string {
    const labels: Record<string, string> = {
      'expert'    : 'Expert',
      'proficient': 'Proficient',
      'familiar'  : 'Learning'
    };
    return labels[level] ?? level;
  }
}
