import { Component } from '@angular/core';

import { MockDataService } from '../../services/mock-data.service';

@Component({
  selector: 'app-async-pipe',
  templateUrl: './async-pipe.component.html',
  styleUrls: ['./async-pipe.component.css'],
})
export class AsyncPipeComponent {
  value$ = this.data.sharedStream$;

  constructor(private data: MockDataService) {}
}
