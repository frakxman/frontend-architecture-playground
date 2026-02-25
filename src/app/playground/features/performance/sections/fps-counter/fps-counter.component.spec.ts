import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FpsCounterComponent } from './fps-counter.component';

describe('FpsCounterComponent', () => {
  let component: FpsCounterComponent;
  let fixture: ComponentFixture<FpsCounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FpsCounterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FpsCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
