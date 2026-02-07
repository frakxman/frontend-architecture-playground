import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignalsLabComponent } from './signals-lab.component';

describe('SignalsLabComponent', () => {
  let component: SignalsLabComponent;
  let fixture: ComponentFixture<SignalsLabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignalsLabComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SignalsLabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
