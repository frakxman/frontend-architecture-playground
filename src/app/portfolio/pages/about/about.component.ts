import { Component, inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
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
