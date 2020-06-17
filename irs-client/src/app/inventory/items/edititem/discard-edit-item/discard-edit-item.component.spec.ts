import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscardEditItemComponent } from './discard-edit-item.component';

describe('DiscardEditItemComponent', () => {
  let component: DiscardEditItemComponent;
  let fixture: ComponentFixture<DiscardEditItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiscardEditItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscardEditItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
