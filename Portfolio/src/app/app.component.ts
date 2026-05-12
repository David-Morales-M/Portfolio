import { Component } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeroComponent } from './components/hero/hero.component';
import { AboutComponent } from './components/about/about.component';

@Component({
  selector  : 'app-root',
  standalone: true,
  imports   : [NavbarComponent, HeroComponent, AboutComponent],
  template  : `
    <app-navbar/>
    <main>
      <app-hero/>
      <app-about/>
    </main>
  `,
  styleUrl  : './app.component.scss'
})

export class AppComponent {
  title = 'Portfolio';
}
