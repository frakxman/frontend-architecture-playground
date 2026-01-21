import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MockDataService } from '../../services/mock-data.service';

@Component({
  selector: 'app-manual-subscribe',
  templateUrl: './manual-subscribe.component.html',
  styleUrls: ['./manual-subscribe.component.css']
})
export class ManualSubscribeComponent implements OnInit, OnDestroy {
  currentValue: string = 'Not started';
  isSubscribed = false;
  subscription?: Subscription;
  subscriptionCount = 0;

  constructor(private mockData: MockDataService) {}

  ngOnInit() {
    console.log('❌ ManualSubscribeComponent initialized');
  }

  startSubscription() {
    if (this.subscription) {
      return; // Already subscribed
    }

    this.subscription = this.mockData.sharedStream$.subscribe(value => {
      this.currentValue = value;
      this.subscriptionCount++;
    });

    this.isSubscribed = true;
    console.log('❌ Manual subscription started');
  }

  stopSubscription() {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = undefined;
      this.isSubscribed = false;
      this.currentValue = 'Stopped';
      console.log('✅ Manual subscription cleaned up');
    }
  }

  ngOnDestroy() {
    // IMPORTANT: Must manually unsubscribe to prevent memory leaks
    if (this.subscription) {
      this.subscription.unsubscribe();
      console.log('🧹 Cleanup in ngOnDestroy');
    }
  }
}
