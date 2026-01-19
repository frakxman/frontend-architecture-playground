import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeroComponent } from '../../components/hero/hero.component';
import { ExperienceComponent } from '../experience/experience.component';
import { SkillsComponent } from '../../components/skills/skills.component';
import { ProjectsPreviewComponent } from '../../components/projects-preview/projects-preview.component';
import { ContactCtaComponent } from '../../components/contact-cta/contact-cta.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ContactCtaComponent,
    ExperienceComponent,
    HeroComponent,
    ProjectsPreviewComponent,
    SkillsComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {

}
