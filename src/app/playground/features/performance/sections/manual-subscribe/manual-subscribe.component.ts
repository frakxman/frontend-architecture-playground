import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MockDataService } from '../../services/mock-data.service';

@Component({
  selector: 'app-manual-subscribe',
  standalone: true,
  templateUrl: './manual-subscribe.component.html',
  styleUrls: ['./manual-subscribe.component.css'],
})
export class ManualSubscribeComponent implements OnDestroy {
  value = '';
  private sub = new Subscription();

  constructor(private data: MockDataService) {
    this.sub.add(
      this.data.coldStream$.subscribe(v => {
        this.value = v;
        console.log('manual subscribe executed');
      })
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
