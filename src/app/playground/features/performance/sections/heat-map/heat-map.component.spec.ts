import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeatMapComponentComponent } from './heat-map.component';

describe('HeatMapComponentComponent', () => {
  let component: HeatMapComponentComponent;
  let fixture: ComponentFixture<HeatMapComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeatMapComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeatMapComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
