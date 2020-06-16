import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscardFormComponent } from './discard-form.component';

describe('DiscardFormComponent', () => {
  let component: DiscardFormComponent;
  let fixture: ComponentFixture<DiscardFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiscardFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscardFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
