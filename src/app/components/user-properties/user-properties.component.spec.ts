import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPropertiesComponent } from './user-properties.component';

describe('UserPropertiesComponent', () => {
  let component: UserPropertiesComponent;
  let fixture: ComponentFixture<UserPropertiesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserPropertiesComponent]
    });
    fixture = TestBed.createComponent(UserPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
