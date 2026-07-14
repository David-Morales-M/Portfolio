import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';
import { Experience, Education } from '../../shared/models';

@Component({
  selector   : 'app-experience',
  standalone : true,
  imports    : [CommonModule],
  templateUrl: './experience.component.html',
  styleUrl   : './experience.component.scss'
})
export class ExperienceComponent implements OnInit {

  experience = signal<Experience[]>([]);
  education  = signal<Education[]>([]);

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getExperience().subscribe(data => {
      this.experience.set(data);
    });
    this.dataService.getEducation().subscribe(data => {
      this.education.set(data);
    });
  }

  formatDate(dateStr?: string): string {
    if (!dateStr) return 'Present';
    const [year, month] = dateStr.split('-');
    const months = ['Jan','Feb','Mar','Apr','May','Jun',
      'Jul','Aug','Sep','Oct','Nov','Dec'];
    return `${months[parseInt(month) - 1]} ${year}`;
  }

  getTypeLabel(type: string): string {
    const labels: Record<string, string> = {
      'full-time' : 'Full-time',
      'freelance' : 'Freelance',
      'research'  : 'Research',
      'volunteer' : 'Volunteer'
    };
    return labels[type] ?? type;
  }

  getTypeClass(type: string): string {
    const classes: Record<string, string> = {
      'full-time' : 'type--fulltime',
      'freelance' : 'type--freelance',
      'research'  : 'type--research',
      'volunteer' : 'type--volunteer'
    };
    return classes[type] ?? '';
  }
}
