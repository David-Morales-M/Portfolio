import { Injectable, signal, effect } from '@angular/core';

export type Theme = 'dark' | 'light';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private readonly STORAGE_KEY = 'portfolio-theme';

  theme = signal<Theme>(this.getInitialTheme());

  constructor() {
    // Aplica el tema cada vez que cambia
    effect(() => {
      this.applyTheme(this.theme());
    });
  }

  toggle(): void {
    this.theme.update(t => t === 'dark' ? 'light' : 'dark');
  }

  setTheme(theme: Theme): void {
    this.theme.set(theme);
  }

  private getInitialTheme(): Theme {
    // 1. Preferencia guardada en localStorage
    const saved = localStorage.getItem(this.STORAGE_KEY) as Theme;
    if (saved === 'dark' || saved === 'light') return saved;

    // 2. Preferencia del sistema operativo
    if (window.matchMedia('(prefers-color-scheme: light)').matches) {
      return 'light';
    }

    // 3. Default: dark
    return 'dark';
  }

  private applyTheme(theme: Theme): void {
    const root = document.documentElement;

    if (theme === 'light') {
      root.setAttribute('data-theme', 'light');
    } else {
      root.removeAttribute('data-theme');
    }

    localStorage.setItem(this.STORAGE_KEY, theme);
  }
}
