import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualSubscribeComponent } from './manual-subscribe.component';

describe('ManualSubscribeComponent', () => {
  let component: ManualSubscribeComponent;
  let fixture: ComponentFixture<ManualSubscribeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManualSubscribeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManualSubscribeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
