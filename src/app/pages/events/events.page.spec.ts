import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Events } from './events.page';

describe('Events', () => {
  let component: Events;
  let fixture: ComponentFixture<Events>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(Events);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
