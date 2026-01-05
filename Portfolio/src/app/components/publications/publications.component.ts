import {Component, Input} from '@angular/core';

interface Publication {
  id: number;
  title: string;
  resume: string;
  doi: string;
  keywords: string;
  year: number;
}

@Component({
  selector: 'app-publications',
  imports: [],
  templateUrl: './publications.component.html',
  styleUrl: './publications.component.scss'
})

export class PublicationsComponent {
  @Input() publication!: Publication;
}
