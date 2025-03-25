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
  // constructor w/ApiService as a parameter to use it
  constructor(private apiService: ApiService) { };
  // ! tells type checker that userForm is non-null and non-undefined
  userForm!: FormGroup;

  // Users list based off model
  users!: User[];

  // called after initialization
  ngOnInit() {
    // creates formgroup based on values in submit form
    this.userForm = new FormGroup({
      username: new FormControl('', Validators.required),
      email: new FormControl('', Validators.email),
      phonenumber: new FormControl(''),
    });
    // uses get message from api.service.ts to grab users list
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
  // prompts with a popup window to confirm deletion, then deletes user and refreshes list
  deleteClicked(user: User){
    if(window.confirm("Are you sure you want to delete this user: " + user.username + " ?")){
      // uses Delete function from api.Service.ts
      this.apiService.delete(user._id).subscribe(
        data => {
          // recalls function to get List of Users
          this.ngOnInit();
        },
        error => {
          console.error("error: ", error);

        }
      )
    }
  }

  // 
  onSubmit() {
    if (this.userForm.valid) {
      // calls postUser function from api.service.ts
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
