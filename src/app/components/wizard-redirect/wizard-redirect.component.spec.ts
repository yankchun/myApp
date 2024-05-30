import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WizardRedirectComponent } from './wizard-redirect.component';

describe('WizardRedirectComponent', () => {
  let component: WizardRedirectComponent;
  let fixture: ComponentFixture<WizardRedirectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WizardRedirectComponent]
    });
    fixture = TestBed.createComponent(WizardRedirectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
