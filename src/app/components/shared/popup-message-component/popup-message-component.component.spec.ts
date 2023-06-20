import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupMessageComponentComponent } from './popup-message-component.component';

describe('PopupMessageComponentComponent', () => {
  let component: PopupMessageComponentComponent;
  let fixture: ComponentFixture<PopupMessageComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PopupMessageComponentComponent]
    });
    fixture = TestBed.createComponent(PopupMessageComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
