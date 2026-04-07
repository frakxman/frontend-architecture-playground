import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit, OnDestroy {
  private fpsInterval?: ReturnType<typeof setInterval>;

  fpsBars = [
    { height: 100, critical: false },
    { height: 95, critical: false },
    { height: 92, critical: false },
    { height: 60, critical: true },
    { height: 45, critical: true },
    { height: 85, critical: false },
    { height: 100, critical: false }
  ];

  constructor() { }

  ngOnInit(): void {
    this.simulateLiveData();
  }

  ngOnDestroy(): void {
    clearInterval(this.fpsInterval);
  }

  private simulateLiveData(): void {
    this.fpsInterval = setInterval(() => {
      this.fpsBars = this.fpsBars.map(bar => ({
        height: Math.max(30, Math.min(100, bar.height + (Math.random() * 10 - 5))),
        critical: bar.height < 50
      }));
    }, 2000);
  }
}
