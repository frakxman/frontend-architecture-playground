import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MockDataService } from '../../services/mock-data.service';

@Component({
  selector: 'app-async-pipe',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './async-pipe.component.html',
  styleUrls: ['./async-pipe.component.css'],
})
export class AsyncPipeComponent {
  value$ = this.data.sharedStream$;

  constructor(private data: MockDataService) {}
}
