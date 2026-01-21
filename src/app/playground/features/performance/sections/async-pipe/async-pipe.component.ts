import { Component } from '@angular/core';
import { MockDataService } from '../../services/mock-data.service';

@Component({
  selector: 'app-async-pipe',
  templateUrl: './async-pipe.component.html',
  styleUrls: ['./async-pipe.component.css']
})
export class AsyncPipeComponent {
  value$ = this.mockData.sharedStream$;
  isActive = false;

  constructor(private mockData: MockDataService) {}

  activate() {
    this.isActive = true;
    console.log('✅ Async pipe activated - no manual cleanup needed!');
  }

  deactivate() {
    this.isActive = false;
    console.log('✅ Async pipe automatically unsubscribed!');
  }
}
