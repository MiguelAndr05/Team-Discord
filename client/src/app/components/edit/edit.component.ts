import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../api.service';
import { User } from '../../models/user';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit',
  standalone: false,
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent {

  private activatedRouter = inject(ActivatedRoute);
  router = inject(Router);

  constructor(private apiService: ApiService) { };

  userForm!: FormGroup;
  user!: User;
  userId!: string;
  ngOnInit(){
    // Grabs user ID from url
    this.userId = this.activatedRouter.snapshot.params["id"];
    // initializes the form
    this.userForm = new FormGroup({
      username: new FormControl('', Validators.required),
      email: new FormControl('', Validators.email),
      phonenumber: new FormControl('', Validators.required),
    });

    if(this.userId){
      // Gets the user info using its ID
      this.apiService.getById(this.userId).subscribe(
        data => {
          this.user = data;
          this.userForm.patchValue(data);
        },
        error => {
          console.error("error: ", error);
          
        }
      )
    }

    console.log("userId: ", this.userId);
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.apiService.put(this.userId, this.userForm.value).subscribe(
        response => {
        console.log("User submitted:", response);
        this.router.navigate(["/"]);        
      });

    } else {
      console.log("Form is invalid!");
    }
  }

}


