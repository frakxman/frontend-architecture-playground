import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-future-feature-placeholder',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './future-feature-placeholder.component.html',
  styleUrls: ['./future-feature-placeholder.component.css']
})
export class FutureFeaturePlaceholderComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);

  title = '';
  subtitle = '';

  ngOnInit(): void {
    const data = this.route.snapshot.data;
    this.title = (data['title'] as string) ?? 'Feature';
    this.subtitle = (data['subtitle'] as string) ?? '';
  }
}
