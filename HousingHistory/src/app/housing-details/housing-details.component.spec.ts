import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HousingDetailsComponent } from './housing-details.component';

describe('HousingDetailsComponent', () => {
  let component: HousingDetailsComponent;
  let fixture: ComponentFixture<HousingDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HousingDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HousingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});