import { Component, HostListener, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../services/theme.service';

interface NavLink {
  label : string;
  target: string;
}

@Component({
  selector   : 'app-navbar',
  standalone : true,
  imports    : [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl   : './navbar.component.scss'
})
export class NavbarComponent implements OnInit {

  themeService  = inject(ThemeService);
  isScrolled    = signal(false);
  isMobileOpen  = signal(false);
  activeSection = signal('hero');

  navLinks: NavLink[] = [
    { label: 'About',      target: 'about'        },
    { label: 'Projects',   target: 'projects'     },
    { label: 'Research',   target: 'publications' },
    { label: 'Skills',     target: 'skills'       },
    { label: 'Experience', target: 'experience'   },
    { label: 'Contact',    target: 'contact'      },
  ];

  ngOnInit(): void {
    this.observeSections();
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this.isScrolled.set(window.scrollY > 20);
  }

  scrollTo(sectionId: string): void {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    this.isMobileOpen.set(false);
  }

  toggleMobile(): void {
    this.isMobileOpen.update(v => !v);
  }

  toggleTheme(): void {
    this.themeService.toggle();
  }

  get isDark(): boolean {
    return this.themeService.theme() === 'dark';
  }

  private observeSections(): void {
    const ids = ['hero', ...this.navLinks.map(l => l.target)];
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) this.activeSection.set(entry.target.id);
        });
      },
      { threshold: 0.3 }
    );
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
  }
}
