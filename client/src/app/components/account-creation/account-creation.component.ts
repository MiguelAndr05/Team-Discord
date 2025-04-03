
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-create-account',
  standalone: false,
  templateUrl: './account-creation.component.html',
  styleUrl: './account-creation.component.css'
})
export class AccountCreationComponent implements OnInit {

  
  constructor(private http: HttpClient, private router: Router) {}

  userForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    email: new FormControl(''),
  });
  

  };

<<<<<<< HEAD

  register() {
    const { username, password, email } = this.userForm.value; // Include email
    this.http.post('http://localhost:3000/register', { username, password, email })
      .subscribe({
        next: () => alert('Registration successful!'),
        error: (err) => alert('Registration failed: ' + err.message)
      });
  }


  login() {
    const {username,  email, password } = this.userForm.value; // Use email instead of username
    this.http.post('http://localhost:3000/login', { username, email, password })
      .subscribe({
        next: () => alert('Login successful!'),
        error: (err) => alert('Login failed: ' + err.message)
      });
  }

=======
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

>>>>>>> 195735727c9c031afdc8bc73d3bb6f53173f117b
}
