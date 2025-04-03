import { ComponentFixture, TestBed } from '@angular/core/testing';
<<<<<<< HEAD

import { Component } from '@angular/core';

@Component({
  selector: 'app-account-creation',
  templateUrl: './account-creation.component.html',
  styleUrls: ['./account-creation.component.css']
})
export class AccountCreationComponent {
  // Component logic here
}

=======
>>>>>>> 195735727c9c031afdc8bc73d3bb6f53173f117b
//import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AccountCreationComponent } from './account-creation.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
// @Component({
//   selector: 'app-account-creation',
//   templateUrl: './account-creation.component.html',
//   styleUrls: ['./account-creation.component.css']
// })
// export class AccountCreationComponent {
//   // Component logic here
// }
<<<<<<< HEAD
>>>>>>> 5160624370ee10cf43bc1d178ba469a72ac5f6db
=======
>>>>>>> 195735727c9c031afdc8bc73d3bb6f53173f117b

describe('AccountCreationComponent', () => {
  let component: AccountCreationComponent;
  let fixture: ComponentFixture<AccountCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
<<<<<<< HEAD

      declarations: [AccountCreationComponent]

=======
>>>>>>> 195735727c9c031afdc8bc73d3bb6f53173f117b
      declarations: [AccountCreationComponent],
      imports:[
        ReactiveFormsModule,
      ],
      providers:[provideHttpClientTesting()]
<<<<<<< HEAD
5160624370ee10cf43bc1d178ba469a72ac5f6db
=======
>>>>>>> 195735727c9c031afdc8bc73d3bb6f53173f117b
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
