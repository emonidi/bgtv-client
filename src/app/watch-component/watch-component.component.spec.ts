import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchComponentComponent } from './watch-component.component';

describe('WatchComponentComponent', () => {
  let component: WatchComponentComponent;
  let fixture: ComponentFixture<WatchComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WatchComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WatchComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
