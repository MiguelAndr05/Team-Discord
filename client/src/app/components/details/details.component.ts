import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../api.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-details',
  standalone: false,
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit{

  // injection to use objects 
  private activatedRouter = inject(ActivatedRoute);
  private ApiService = inject(ApiService);
  
  // ! tells type checker that variables are non-null and non-undefined
  user!: User;
  userId!: string;
  
  // called after initialization
  ngOnInit(){
    // Grabs user ID from url
    this.userId = this.activatedRouter.snapshot.params["id"];
    if(this.userId){
      // Gets the user info using its ID
      this.ApiService.getById(this.userId).subscribe(
        data => {
          this.user = data;

        },
        error => {
          console.error("error: ", error);
          
        }
      )
    }
    console.log("userId: ", this.userId);
  }
}
