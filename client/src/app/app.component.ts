import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import { FormControl, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrls: ['./app.component.css'],
})

export class AppComponent implements OnInit {
  



    title = 'client';
    message: any;
    constructor(private apiService: ApiService) { };
      userForm = new FormGroup({
      username: new FormControl(''),
      email: new FormControl(''),
      phonenumber: new FormControl(''),
    });
    

    ngOnInit() {
      this.apiService.getMessage().subscribe(data => {
        this.message = data;
        console.log(data);
      });
    }




    onSubmit() {
      if (this.userForm.valid) {
        this.apiService.postUser(this.userForm.value).subscribe(response => {
          console.log("User submitted:", response);
        });
      } else {
        console.log("Form is invalid!");
      }
    }


}

