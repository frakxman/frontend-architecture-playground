import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Skill } from '../../models/skill.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkillsComponent {
  @Input({ required: true }) skills!: Skill[];
}
