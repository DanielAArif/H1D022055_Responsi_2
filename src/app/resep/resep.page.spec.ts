import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResepPage } from './resep.page';

describe('ResepPage', () => {
  let component: ResepPage;
  let fixture: ComponentFixture<ResepPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ResepPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
