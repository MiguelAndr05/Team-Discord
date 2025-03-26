import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-account-creation',
  standalone: false,
  templateUrl: './account-creation.component.html',
  styleUrls: ['./account-creation.component.css']

})
export class AccountCreationComponent implements OnInit {
  userForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    email: new FormControl(''), // Add the email field
  });
  

  constructor(private http: HttpClient) {}

  ngOnInit() {}

  register() {
    const { username, password, email } = this.userForm.value; // Include email
    this.http.post('http://localhost:3000/register', { username, password, email })
      .subscribe({
        next: () => alert('Registration successful!'),
        error: (err) => alert('Registration failed: ' + err.message)
      });
  }

  login() {
    const { username, password } = this.userForm.value;
    this.http.post('http://localhost:3000/login', { username, password })
      .subscribe({
        next: () => alert('Login successful!'),
        error: (err) => alert('Login failed: ' + err.message)
      });
  }
}
