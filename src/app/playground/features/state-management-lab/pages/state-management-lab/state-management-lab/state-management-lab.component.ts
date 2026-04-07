import { Component, signal, computed, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription, combineLatest, map } from 'rxjs';

@Component({
  selector: 'app-state-management-lab',
  templateUrl: './state-management-lab.component.html',
  styleUrl: './state-management-lab.component.css'
})
export class StateManagementLabComponent implements OnDestroy {

  // ── SIGNALS STATE ────────────────────────────────────────────────────────
  sigCounter = signal(0);
  sigName = signal('Angular');
  sigEmail = signal('hello@angular.dev');

  sigDouble = computed(() => this.sigCounter() * 2);
  sigMessage = computed(() => `Hello, ${this.sigName()}!`);
  sigProfile = computed(() => ({
    name: this.sigName(),
    email: this.sigEmail(),
    count: this.sigCounter()
  }));

  sigRenders = signal(0);

  // ── RXJS / SERVICE STATE ─────────────────────────────────────────────────
  private counter$ = new BehaviorSubject(0);
  private name$ = new BehaviorSubject('Angular');
  private email$ = new BehaviorSubject('hello@angular.dev');

  counterObs$ = this.counter$.asObservable();
  nameObs$ = this.name$.asObservable();
  emailObs$ = this.email$.asObservable();

  doubleObs$ = this.counter$.pipe(map(n => n * 2));
  messageObs$ = this.name$.pipe(map(n => `Hello, ${n}!`));
  profileObs$ = combineLatest([this.counter$, this.name$, this.email$]).pipe(
    map(([count, name, email]) => ({ count, name, email }))
  );

  obsRenders = 0;
  private sub = new Subscription();

  // ── ACTIVE TAB ───────────────────────────────────────────────────────────
  activeTab: 'basic' | 'multiple' | 'selectors' = 'basic';

  constructor() {
    // Track signal re-renders (will increment on any signal access)
    this.sub.add(
      combineLatest([this.counter$, this.name$, this.email$]).subscribe(() => {
        this.obsRenders++;
      })
    );
  }

  // ── SIGNAL ACTIONS ───────────────────────────────────────────────────────
  sigCounterInc() { this.sigCounter.update(n => n + 1); this.updateSigRenders(); }
  sigCounterDec() { this.sigCounter.update(n => n - 1); this.updateSigRenders(); }
  sigCounterReset() { this.sigCounter.set(0); this.updateSigRenders(); }
  sigSetName(val: string) { this.sigName.set(val); this.updateSigRenders(); }
  sigSetEmail(val: string) { this.sigEmail.set(val); this.updateSigRenders(); }

  private updateSigRenders() { this.sigRenders.update(n => n + 1); }

  // ── RXJS ACTIONS ─────────────────────────────────────────────────────────
  obsCounterInc() { this.counter$.next(this.counter$.value + 1); }
  obsCounterDec() { this.counter$.next(this.counter$.value - 1); }
  obsCounterReset() { this.counter$.next(0); }
  obsSetName(val: string) { this.name$.next(val); }
  obsSetEmail(val: string) { this.email$.next(val); }

  // ── LIFECYCLE ────────────────────────────────────────────────────────────
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
