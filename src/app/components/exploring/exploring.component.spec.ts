import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploringComponent } from './exploring.component';

describe('ExploringComponent', () => {
  let component: ExploringComponent;
  let fixture: ComponentFixture<ExploringComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExploringComponent]
    });
    fixture = TestBed.createComponent(ExploringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
