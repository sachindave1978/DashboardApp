import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PfvalueComponent } from './pfvalue.component';

describe('PfvalueComponent', () => {
  let component: PfvalueComponent;
  let fixture: ComponentFixture<PfvalueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PfvalueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PfvalueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
