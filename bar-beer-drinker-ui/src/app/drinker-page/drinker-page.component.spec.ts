import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrinkerPageComponent } from './drinker-page.component';

describe('DrinkerPageComponent', () => {
  let component: DrinkerPageComponent;
  let fixture: ComponentFixture<DrinkerPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrinkerPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrinkerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
