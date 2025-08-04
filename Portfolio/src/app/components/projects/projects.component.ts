import {Component, Input} from '@angular/core';

interface Project {
  id: number;
  title: string;
  client: string;
  description: string;
}

@Component({
  selector: 'app-projects',
  imports: [],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})

export class ProjectsComponent {
  @Input() project!: Project;

}
