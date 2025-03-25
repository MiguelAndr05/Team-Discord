import { Component, inject, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../../models/user';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: 'home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  message: any;

  constructor(private apiService: ApiService) { };

  userForm!: FormGroup;

  // Users list based off model
  users!: User[];

  
  ngOnInit() {
    this.userForm = new FormGroup({
      username: new FormControl('', Validators.required),
      email: new FormControl('', Validators.email),
      phonenumber: new FormControl('', Validators.required),
    });
    this.apiService.getMessage().subscribe(
      data => {
        console.log("Users", data);
        this.users = data;
      },
      error => {
        console.error("error: ", error);
      }
    );
  }

  deleteClicked(user: User){
    if(window.confirm("Are you sure you want to delete this user: " + user.username + " ?")){
      this.apiService.delete(user._id).subscribe(
        data => {
          this.ngOnInit();

        },
        error => {
          console.error("error: ", error);

        }
      )
    }
  }


  onSubmit() {
    console.log("Submit clicked");
    if (this.userForm.valid) {
    this.apiService.postUser(this.userForm.value).subscribe(
      response => {
        console.log("User submitted:", response);
        // updates user list on page
        this.ngOnInit()
      });
      
    } else {
      console.log("Form is invalid!");
    }
  }

}
