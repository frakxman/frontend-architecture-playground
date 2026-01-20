import { Component } from '@angular/core';
import { ExperienceTimelineComponent } from '../../ui/experience-timeline/experience-timeline.component';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [ExperienceTimelineComponent],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.css'
})
export class ExperienceComponent {

}
