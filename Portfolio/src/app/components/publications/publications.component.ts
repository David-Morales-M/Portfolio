import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';
import { Publication, PublicationTopic } from '../../shared/models';

interface FilterOption {
  label: string;
  value: string;
}


@Component({
  selector   : 'app-publications',
  standalone : true,
  imports    : [CommonModule],
  templateUrl: './publications.component.html',
  styleUrl   : './publications.component.scss'
})

export class PublicationsComponent implements OnInit {

  allPublications = signal<Publication[]>([]);
  activeFilter    = signal<string>('all');
  expandedId      = signal<number | null>(null);

  filters: FilterOption[] = [
    { label: 'All',               value: 'all'              },
    { label: 'Serious Games',     value: 'serious-games'    },
    { label: 'UX / Usability',    value: 'ux-ui'            },
    { label: 'Telerehabilitation',value: 'telerehabilitation'},
    { label: 'Accessibility',     value: 'accessibility'    },
    { label: 'Health',            value: 'health'           },
  ];

  filtered = computed(() => {
    const f = this.activeFilter();
    const all = this.allPublications();
    if (f === 'all') return all;
    return all.filter(p => p.topic === f);
  });

  totalCount   = computed(() => this.allPublications().length);
  filteredCount= computed(() => this.filtered().length);

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getPublications().subscribe(data => {
      this.allPublications.set(data);
    });
  }

  setFilter(value: string): void {
    this.activeFilter.set(value);
    this.expandedId.set(null);
  }

  toggleExpand(id: number): void {
    this.expandedId.update(current => current === id ? null : id);
  }

  isExpanded(id: number): boolean {
    return this.expandedId() === id;
  }

  getQuartileClass(quartile?: string): string {
    const map: Record<string, string> = {
      'Q1': 'quartile--q1',
      'Q2': 'quartile--q2',
      'Q3': 'quartile--q3',
      'Q4': 'quartile--q4',
    };
    return quartile ? (map[quartile] ?? '') : '';
  }
}
