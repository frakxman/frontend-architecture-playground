import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { StatsComponent } from '../stats/stats.component';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [RouterLink, StatsComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent {

}
