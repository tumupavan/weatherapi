import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerioddataComponent } from './perioddata.component';

describe('PerioddataComponent', () => {
  let component: PerioddataComponent;
  let fixture: ComponentFixture<PerioddataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerioddataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerioddataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
