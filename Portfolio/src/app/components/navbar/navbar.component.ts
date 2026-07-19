import { Component, HostListener, OnInit, signal, inject } from '@angular/core';
import { CommonModule }    from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ThemeService }    from '../../services/theme.service';
import { LanguageService } from '../../services/languaje.service';

interface NavLink {
  labelKey: string;
  target  : string;
}

@Component({
  selector   : 'app-navbar',
  standalone : true,
  imports    : [CommonModule, TranslateModule],
  templateUrl: './navbar.component.html',
  styleUrl   : './navbar.component.scss'
})
export class NavbarComponent implements OnInit {

  themeService    = inject(ThemeService);
  languageService = inject(LanguageService);

  isScrolled   = signal(false);
  isMobileOpen = signal(false);
  activeSection= signal('hero');

  navLinks: NavLink[] = [
    { labelKey: 'nav.about',      target: 'about'        },
    { labelKey: 'nav.projects',   target: 'projects'     },
    { labelKey: 'nav.research',   target: 'publications' },
    { labelKey: 'nav.skills',     target: 'skills'       },
    { labelKey: 'nav.experience', target: 'experience'   },
    { labelKey: 'nav.contact',    target: 'contact'      },
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

  toggleMobile() : void { this.isMobileOpen.update(v => !v); }
  toggleTheme()  : void { this.themeService.toggle(); }
  toggleLanguage(): void { this.languageService.toggle(); }

  get isDark()   : boolean { return this.themeService.theme() === 'dark'; }
  get currentLang(): string { return this.languageService.currentLang(); }

  private observeSections(): void {
    const ids = ['hero', ...this.navLinks.map(l => l.target)];
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => { if (e.isIntersecting) this.activeSection.set(e.target.id); });
      },
      { threshold: 0.3 }
    );
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
  }
}
