import { Component, signal, computed, effect, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription, combineLatest, map } from 'rxjs';

@Component({
  selector: 'app-signals-lab',
  templateUrl: './signals-lab.component.html',
  styleUrls: ['./signals-lab.component.css']
})
export class SignalsLabComponent implements OnDestroy {

  // ── SIGNALS ──────────────────────────────────────────────────────────────
  sigCount = signal(0);
  sigName  = signal('Angular');

  sigDouble  = computed(() => this.sigCount() * 2);
  sigMessage = computed(() => `Hello, ${this.sigName()}! Count: ${this.sigCount()}`);

  sigRenders = signal(0);

  // ── OBSERVABLES ──────────────────────────────────────────────────────────
  readonly count$ = new BehaviorSubject(0);
  readonly name$  = new BehaviorSubject('Angular');

  obsCount$   = this.count$.asObservable();
  obsDouble$  = this.count$.pipe(map(n => n * 2));
  obsMessage$ = combineLatest([this.count$, this.name$]).pipe(
    map(([count, name]) => `Hello, ${name}! Count: ${count}`)
  );

  obsRenders = 0;
  private sub = new Subscription();

  // ── ACTIVE TAB ───────────────────────────────────────────────────────────
  activeTab: 'counter' | 'derived' | 'cleanup' = 'counter';

  constructor() {
    effect(() => {
      // Re-runs whenever any accessed signal changes
      this.sigCount();
      this.sigName();
      this.sigRenders.update(n => n + 1);
    });

    this.sub.add(
      combineLatest([this.count$, this.name$]).subscribe(() => {
        this.obsRenders++;
      })
    );
  }

  // ── SIGNAL ACTIONS ───────────────────────────────────────────────────────
  sigIncrement() { this.sigCount.update(n => n + 1); }
  sigDecrement() { this.sigCount.update(n => n - 1); }
  sigReset()     { this.sigCount.set(0); this.sigName.set('Angular'); this.sigRenders.set(0); }
  sigSetName(name: string) { this.sigName.set(name); }

  // ── OBSERVABLE ACTIONS ───────────────────────────────────────────────────
  obsIncrement() { this.count$.next(this.count$.value + 1); }
  obsDecrement() { this.count$.next(this.count$.value - 1); }
  obsReset()     { this.count$.next(0); this.name$.next('Angular'); this.obsRenders = 0; }
  obsSetName(name: string) { this.name$.next(name); }

  // ── LIFECYCLE ────────────────────────────────────────────────────────────
  ngOnDestroy(): void {
    this.sub.unsubscribe(); // Must be done manually
  }
}
