import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { CompleteComponent } from './complete.component';

describe('CompleteComponent', () => {
  let component: CompleteComponent;
  let fixture: ComponentFixture<CompleteComponent>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    router = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [CompleteComponent],
      providers: [
        { provide: Router, useValue: router },
      ]
    });

    fixture = TestBed.createComponent(CompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to "/general-details" when home is called', () => {
    component.home();
    expect(router.navigate).toHaveBeenCalledWith(['/general-details']);
  });
});
