import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Value {
  icon : string;
  title: string;
  desc : string;
}

@Component({
  selector   : 'app-about',
  standalone : true,
  imports    : [CommonModule],
  templateUrl: './about.component.html',
  styleUrl   : './about.component.scss'
})
export class AboutComponent {

  values: Value[] = [
    {
      icon : 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
      title: 'Quality-driven',
      desc : 'I don\'t just ship features — I verify they work, make sense, and hold up under real use.'
    },
    {
      icon : 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z',
      title: 'User-centered',
      desc : 'Every decision starts with the person using the product — not the technology behind it.'
    },
    {
      icon : 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
      title: 'Research-backed',
      desc : 'Academic rigor shapes how I approach problems — with evidence, iteration and measurable outcomes.'
    }
  ];
}
