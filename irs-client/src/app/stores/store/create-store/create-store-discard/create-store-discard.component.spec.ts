import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateStoreDiscardComponent } from './create-store-discard.component';

describe('CreateStoreDiscardComponent', () => {
  let component: CreateStoreDiscardComponent;
  let fixture: ComponentFixture<CreateStoreDiscardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateStoreDiscardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateStoreDiscardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
