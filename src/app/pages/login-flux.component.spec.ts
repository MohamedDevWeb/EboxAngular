import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginFluxComponent } from './login-flux.component';

describe('LoginFluxComponent', () => {
  let component: LoginFluxComponent;
  let fixture: ComponentFixture<LoginFluxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginFluxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoginFluxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
