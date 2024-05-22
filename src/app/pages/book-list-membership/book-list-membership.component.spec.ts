import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookListMembershipComponent } from './book-list-membership.component';

describe('BookListMembershipComponent', () => {
  let component: BookListMembershipComponent;
  let fixture: ComponentFixture<BookListMembershipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookListMembershipComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookListMembershipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
