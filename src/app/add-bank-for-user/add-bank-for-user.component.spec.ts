import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBankForUserComponent } from './add-bank-for-user.component';

describe('AddBankForUserComponent', () => {
  let component: AddBankForUserComponent;
  let fixture: ComponentFixture<AddBankForUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddBankForUserComponent]
    });
    fixture = TestBed.createComponent(AddBankForUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
