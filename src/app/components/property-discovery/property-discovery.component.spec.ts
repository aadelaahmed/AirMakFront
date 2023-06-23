import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyDiscoveryComponent } from './property-discovery.component';

describe('PropertyDiscoveryComponent', () => {
  let component: PropertyDiscoveryComponent;
  let fixture: ComponentFixture<PropertyDiscoveryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PropertyDiscoveryComponent]
    });
    fixture = TestBed.createComponent(PropertyDiscoveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
