import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriqueMedicalComponent } from './historique-medical.component';

describe('HistoriqueMedicalComponent', () => {
  let component: HistoriqueMedicalComponent;
  let fixture: ComponentFixture<HistoriqueMedicalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoriqueMedicalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HistoriqueMedicalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
