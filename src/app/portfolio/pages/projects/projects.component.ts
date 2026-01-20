import { Component } from '@angular/core';
import { ProjectsGridComponent } from '../../ui/projects-grid/projects-grid.component';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [ProjectsGridComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {

}
