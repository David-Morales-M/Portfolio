import { Injectable, signal } from '@angular/core';
import { TranslateService }   from '@ngx-translate/core';


export type Lang = 'en' | 'es';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  private readonly STORAGE_KEY = 'portfolio-lang';

  currentLang = signal<Lang>(this.getInitialLang());

  constructor(private translate: TranslateService) {
    this.applyLang(this.currentLang());
  }

  toggle(): void {
    const next: Lang = this.currentLang() === 'en' ? 'es' : 'en';
    this.setLang(next);
  }

  setLang(lang: Lang): void {
    this.currentLang.set(lang);
    this.applyLang(lang);
    localStorage.setItem(this.STORAGE_KEY, lang);
  }

  private getInitialLang(): Lang {
    const saved = localStorage.getItem(this.STORAGE_KEY) as Lang;
    if (saved === 'en' || saved === 'es') return saved;
    const browser = navigator.language.startsWith('es') ? 'es' : 'en';
    return browser;
  }

  private applyLang(lang: Lang): void {
    this.translate.use(lang);
  }
}
