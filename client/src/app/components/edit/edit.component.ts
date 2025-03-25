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

  // injections for uses of the objects
  private activatedRouter = inject(ActivatedRoute);
  router = inject(Router);

  constructor(private apiService: ApiService) { };

    // ! tells type checker that variables are non-null and non-undefined
    userForm!: FormGroup;
    user!: User;
    userId!: string;

    // called after initialization
    ngOnInit(){
      // Grabs user ID from url
      this.userId = this.activatedRouter.snapshot.params["id"];
      // initializes the form
      this.userForm = new FormGroup({
        username: new FormControl('', Validators.required),
        email: new FormControl('', Validators.email),
        phonenumber: new FormControl(''),
      });

    if(this.userId){
      // Gets the user info using its ID, uses getById from api.service.ts
      this.apiService.getById(this.userId).subscribe(
        data => {
          // user = data, then patches data into userForm
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

  // called when submit is clicked, Updates info with inputted data
  onSubmit() {
    if (this.userForm.valid) {
      // calls put function from api.service.ts
      this.apiService.put(this.userId, this.userForm.value).subscribe(
        response => {
        console.log("User submitted:", response);
        // navigates to Home page
        this.router.navigate(["/"]);        
      });

    } else {
      console.log("Form is invalid!");
    }
  }

}


