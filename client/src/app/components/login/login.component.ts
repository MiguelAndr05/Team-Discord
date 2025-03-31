import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  
  //Initialize user form
  createAccountForm!: FormGroup;
  //Initialize login form
  loginForm!: FormGroup;
  //APi constructor
  constructor(private apiService: ApiService, private router: Router) { 

  };
      
  ngOnInit(): void {

    // //Initialize this instance of createAccount form
    // this.createAccountForm = new FormGroup({
    //   username: new FormControl('', Validators.required),
    //   email: new FormControl('', Validators.required),
    //   phonenumber: new FormControl(''),
    //   password: new FormControl('', Validators.required)
    // });

    //Initialize this instance of login form
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });
  }

  onLogin(){
    if(this.loginForm.valid){
      this.apiService.loginAccountPost(this.loginForm.value).subscribe({
        next: (res) => {
          console.log("Login Successful", res);
          this.router.navigate(['/profile']);
        },
        error: (error) => {
          console.log("Login failed: ", error);
        }
      })
    }
  }

  createAccountRouter(){
    this.router.navigate(['/account-creation'])
  }

}
