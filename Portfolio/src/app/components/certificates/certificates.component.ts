import {Component, Input} from '@angular/core';

export interface Certificate {
  id: number;
  name: string;
  issuer: string;
  year: number;
  description: string;
  verificationLink: string;
  pdfLink: string;
  icon?: string;
}

@Component({
  selector: 'app-certificates',
  imports: [],
  templateUrl: './certificates.component.html',
  styleUrl: './certificates.component.scss'
})
export class CertificatesComponent {
  @Input() certificate!: Certificate;
}
