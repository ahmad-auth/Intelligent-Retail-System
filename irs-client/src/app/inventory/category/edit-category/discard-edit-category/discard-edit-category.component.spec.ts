import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscardEditCategoryComponent } from './discard-edit-category.component';

describe('DiscardEditCategoryComponent', () => {
  let component: DiscardEditCategoryComponent;
  let fixture: ComponentFixture<DiscardEditCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiscardEditCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscardEditCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
