import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Component } from '@angular/core';

@Component({
  selector: 'app-account-creation',
  templateUrl: './account-creation.component.html',
  styleUrls: ['./account-creation.component.css']
})
export class AccountCreationComponent {
  // Component logic here
}

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
>>>>>>> 5160624370ee10cf43bc1d178ba469a72ac5f6db

describe('AccountCreationComponent', () => {
  let component: AccountCreationComponent;
  let fixture: ComponentFixture<AccountCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({

      declarations: [AccountCreationComponent]

      declarations: [AccountCreationComponent],
      imports:[
        ReactiveFormsModule,
      ],
      providers:[provideHttpClientTesting()]
5160624370ee10cf43bc1d178ba469a72ac5f6db
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
