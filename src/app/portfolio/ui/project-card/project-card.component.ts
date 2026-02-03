import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
  standalone: true,
  selector: 'app-project-card',
  imports: [CommonModule, RouterModule],
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss']
})
export class ProjectCardComponent {
  @Input() title!: string;
  @Input() description!: string;
  @Input() stack!: string[];
  @Input() highlight!: string;
  @Input() link!: string;
  @Input() isInternal?: boolean;
}
