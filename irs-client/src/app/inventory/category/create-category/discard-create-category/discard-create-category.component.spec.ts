import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscardCreateCategoryComponent } from './discard-create-category.component';

describe('DiscardCreateCategoryComponent', () => {
  let component: DiscardCreateCategoryComponent;
  let fixture: ComponentFixture<DiscardCreateCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiscardCreateCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscardCreateCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
