import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditStoreDiscardComponent } from './edit-store-discard.component';

describe('EditStoreDiscardComponent', () => {
  let component: EditStoreDiscardComponent;
  let fixture: ComponentFixture<EditStoreDiscardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditStoreDiscardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditStoreDiscardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
