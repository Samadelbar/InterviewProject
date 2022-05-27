import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescCompanyComponent } from './desc-company.component';

describe('DescCompanyComponent', () => {
  let component: DescCompanyComponent;
  let fixture: ComponentFixture<DescCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DescCompanyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DescCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
