import { Component, HostListener, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

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

  isScrolled    = signal(false);
  isMobileOpen  = signal(false);
  activeSection = signal('hero');

  navLinks: NavLink[] = [
    { label: 'About',        target: 'about'        },
    { label: 'Projects',     target: 'projects'     },
    { label: 'Research',     target: 'publications' },
    { label: 'Skills',       target: 'skills'       },
    { label: 'Experience',   target: 'experience'   },
    { label: 'Contact',      target: 'contact'      },
  ];

  ngOnInit(): void {
    this.observeSections();
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this.isScrolled.set(window.scrollY > 20);
  }

  scrollTo(sectionId: string): void {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    this.isMobileOpen.set(false);
  }

  toggleMobile(): void {
    this.isMobileOpen.update(v => !v);
  }

  // Detector de Sección
  private observeSections(): void {
    const ids = ['hero', ...this.navLinks.map(l => l.target)];
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.activeSection.set(entry.target.id);
          }
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
