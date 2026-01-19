import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-projects-preview',
  standalone: true,
  imports: [],
  templateUrl: './projects-preview.component.html',
  styleUrl: './projects-preview.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectsPreviewComponent {

}
