import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperienceTimelineComponent } from './experience-timeline.component';

describe('ExperienceTimelineComponent', () => {
  let component: ExperienceTimelineComponent;
  let fixture: ComponentFixture<ExperienceTimelineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExperienceTimelineComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExperienceTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
