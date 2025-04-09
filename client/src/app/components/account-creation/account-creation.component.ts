import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-account',
  standalone: false,
  templateUrl: './account-creation.component.html',
  styleUrl: './account-creation.component.css'
})
export class AccountCreationComponent implements OnInit {
  //Display success message when user successfully creates an account
  successMessage: string = " ";

  //Initialize user form
  createAccountForm!: FormGroup;
  //APi constructor
  constructor(private apiService: ApiService, private router: Router) { 

  };

  ngOnInit(): void {

    //Initialize this instance of createAccount form
    this.createAccountForm = new FormGroup({
      username: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      phonenumber: new FormControl(''),
      password: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    if (this.createAccountForm.valid) {
      this.apiService.createAccountPost(this.createAccountForm.value).subscribe({
        next: (res) => {
          console.log('Created Account: ', res);
          //Reset fields
          this.createAccountForm.reset();
          //Assign success variable to this instance
          this.successMessage = "Account creation successful, Redirecting to Log in page in 3 seconds";
          //Set timer
          setTimeout(() =>{
          //If successful route to login page
          this.router.navigate(['/login']);
          }, 3000);
        },
        error: (error) => {
          console.log("Error: ", error);
        }
      })
      
    } else {
      console.log("Form is invalid!");
    }
  }

  toHome(): void{
    this.router.navigate(['/home']);
  }

}