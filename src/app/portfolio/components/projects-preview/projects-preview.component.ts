import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ProjectPreview } from '../../models/project-preview.model';

@Component({
  selector: 'app-projects-preview',
  standalone: true,
  imports: [],
  templateUrl: './projects-preview.component.html',
  styleUrl: './projects-preview.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectsPreviewComponent {
  @Input({ required: true }) projects!: ProjectPreview[];
}
