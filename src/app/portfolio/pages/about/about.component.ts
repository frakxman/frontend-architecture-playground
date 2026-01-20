import { Component, inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { HeroComponent } from '../../ui/hero/hero.component';
import { SkillsComponent } from '../../ui/skills/skills.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [HeroComponent, SkillsComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  private title = inject(Title);
  private meta = inject(Meta);

  constructor() {
    this.title.setTitle('About — Fabián | Frontend Engineer');
    this.meta.updateTag({
      name: 'description',
      content: 'Frontend engineer focused on scalable Angular architecture.'
    });
  }

}
