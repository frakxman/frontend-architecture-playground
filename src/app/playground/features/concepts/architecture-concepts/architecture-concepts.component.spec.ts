import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchitectureConceptsComponent } from './architecture-concepts.component';

describe('ArchitectureConceptsComponent', () => {
  let component: ArchitectureConceptsComponent;
  let fixture: ComponentFixture<ArchitectureConceptsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArchitectureConceptsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArchitectureConceptsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
