import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StateManagementLabComponent } from './state-management-lab.component';

describe('StateManagementLabComponent', () => {
  let component: StateManagementLabComponent;
  let fixture: ComponentFixture<StateManagementLabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StateManagementLabComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StateManagementLabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
