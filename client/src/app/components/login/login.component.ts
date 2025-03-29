import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  userForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    email: new FormControl(''),
  });
  
  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {}

  toRegister(){
    this.router.navigate(["/account-creation"])
    .then(nav => {
      console.log(nav);
    }, err => {
      console.log("Navigation to /account-creation error: ", err) // when there's an error
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

}
