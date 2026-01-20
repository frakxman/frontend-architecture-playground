import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceLabComponent } from './performance-lab.component';

describe('PerformanceLabComponent', () => {
  let component: PerformanceLabComponent;
  let fixture: ComponentFixture<PerformanceLabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerformanceLabComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PerformanceLabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
