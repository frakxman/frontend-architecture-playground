import { Component } from '@angular/core';

interface ExpandedSections {
  whatIsPlayground: boolean;
  learningObjectives: boolean;
  howToUse: boolean;
}

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent {
  // Define the interface for better type safety
  expandedSections: ExpandedSections = {
    whatIsPlayground: true,
    learningObjectives: true,
    howToUse: true
  };

  toggleSection(section: keyof ExpandedSections): void {
    this.expandedSections[section] = !this.expandedSections[section];
  }
}
