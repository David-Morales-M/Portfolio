import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';
import { Project } from '../../shared/models';

@Component({
  selector   : 'app-projects',
  standalone : true,
  imports    : [CommonModule],
  templateUrl: './projects.component.html',
  styleUrl   : './projects.component.scss'
})
export class ProjectsComponent implements OnInit {

  allProjects  = signal<Project[]>([]);
  showAllTier3 = signal(false);

  tier1 = computed(() => this.allProjects().filter(p => p.tier === 1));
  tier2 = computed(() => this.allProjects().filter(p => p.tier === 2));
  tier3 = computed(() => this.allProjects().filter(p => p.tier === 3));

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getProjects().subscribe({
      next: data => {
        console.log('Proyectos cargados:', data);
        this.allProjects.set(data);
      },
      error: err => {
        console.error('Error cargando proyectos:', err);
      }
    });
  }

  toggleTier3(): void {
    this.showAllTier3.update(v => !v);
  }

  getStateLabel(state: string): string {
    const labels: Record<string, string> = {
      'deployed'      : 'Live',
      'demo-available': 'Demo',
      'repository'    : 'Repository',
      'in-progress'   : 'In Progress'
    };
    return labels[state] ?? state;
  }

  getStateClass(state: string): string {
    const classes: Record<string, string> = {
      'deployed'      : 'state--live',
      'demo-available': 'state--demo',
      'repository'    : 'state--repo',
      'in-progress'   : 'state--wip'
    };
    return classes[state] ?? '';
  }
}
