
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';

import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-account-creation',
  standalone: false,
  templateUrl: './account-creation.component.html',
  styleUrls: ['./account-creation.component.css']

})
export class AccountCreationComponent implements OnInit {

  
  constructor(private http: HttpClient, private router: Router) {}

  userForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    email: new FormControl(''),
  });
  


  constructor(private http: HttpClient) {}

  ngOnInit() {}



  toLogin(){
    this.router.navigate(["/login"])
    .then(nav => {
      console.log(nav);
    }, err => {
      console.log("Navigation to /login error: ", err) // when there's an error
    });
  }



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

}
