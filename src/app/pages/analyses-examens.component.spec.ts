import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysesExamensComponent } from './analyses-examens.component';

describe('AnalysesExamensComponent', () => {
  let component: AnalysesExamensComponent;
  let fixture: ComponentFixture<AnalysesExamensComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalysesExamensComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnalysesExamensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
