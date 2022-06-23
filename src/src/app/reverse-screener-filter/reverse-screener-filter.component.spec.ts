import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReverseScreenerFilterComponent } from './reverse-screener-filter.component';

describe('ReverseScreenerFilterComponent', () => {
  let component: ReverseScreenerFilterComponent;
  let fixture: ComponentFixture<ReverseScreenerFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReverseScreenerFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReverseScreenerFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
