import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionCalculatorComponent } from './production-calculator.component';

describe('ProductionCalculatorComponent', () => {
  let component: ProductionCalculatorComponent;
  let fixture: ComponentFixture<ProductionCalculatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductionCalculatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductionCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
