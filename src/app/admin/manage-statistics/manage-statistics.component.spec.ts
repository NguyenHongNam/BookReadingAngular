import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageStatisticsComponent } from './manage-statistics.component';

describe('ManageStatisticsComponent', () => {
  let component: ManageStatisticsComponent;
  let fixture: ComponentFixture<ManageStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageStatisticsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
