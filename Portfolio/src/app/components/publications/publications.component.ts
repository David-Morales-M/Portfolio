import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';
import { Publication } from '../../shared/models';

interface FilterOption {
  label: string;
  value: string;
}

// IDs de los 5 artículos destacados
const FEATURED_IDS = [10, 12, 14, 5, 6];

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
  showAll         = signal(false);

  filters: FilterOption[] = [
    { label: 'All',                value: 'all'               },
    { label: 'Serious Games',      value: 'serious-games'     },
    { label: 'UX / Usability',     value: 'ux-ui'             },
    { label: 'Telerehabilitation', value: 'telerehabilitation' },
    { label: 'Accessibility',      value: 'accessibility'     },
    { label: 'Health',             value: 'health'            },
  ];

  // Publicaciones filtradas por topic
  filtered = computed(() => {
    const f   = this.activeFilter();
    const all = this.allPublications();
    return f === 'all' ? all : all.filter(p => p.topic === f);
  });

  // Destacadas — solo las 5 con FEATURED_IDS, respetando filtro activo
  featured = computed(() =>
    this.filtered().filter(p => FEATURED_IDS.includes(p.id))
  );

  // El resto — las no destacadas
  remaining = computed(() =>
    this.filtered().filter(p => !FEATURED_IDS.includes(p.id))
  );

  // Lo que se muestra: siempre las featured + remaining si showAll
  visible = computed(() =>
    this.showAll()
      ? this.filtered()
      : this.featured()
  );

  totalCount    = computed(() => this.allPublications().length);
  filteredCount = computed(() => this.filtered().length);
  remainingCount= computed(() => this.remaining().length);

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getPublications().subscribe(data => {
      this.allPublications.set(data);
    });
  }

  setFilter(value: string): void {
    this.activeFilter.set(value);
    this.expandedId.set(null);
    this.showAll.set(false);
  }

  toggleExpand(id: number): void {
    this.expandedId.update(current => current === id ? null : id);
  }

  isExpanded(id: number): boolean {
    return this.expandedId() === id;
  }

  isFeatured(id: number): boolean {
    return FEATURED_IDS.includes(id);
  }

  toggleShowAll(): void {
    this.showAll.update(v => !v);
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
