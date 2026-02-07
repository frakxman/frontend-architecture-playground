import { Component, Output, EventEmitter, ViewEncapsulation, Input } from '@angular/core';

@Component({
  selector: 'app-playground-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PlaygroundSidebarComponent {
  @Input() isOpen = false;
  @Output() navClick = new EventEmitter<MouseEvent>();

  onLinkClick(event: MouseEvent) {
    this.navClick.emit(event);
  }
}
